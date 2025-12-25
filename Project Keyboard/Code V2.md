
```cpp
/*
  ESP32 Bluetooth Macro Pad with Web Config + 1.14" ST7789 (135x240)
  - BLE keyboard macros
  - WiFi AP + Web management
  - Display status using Adafruit_GFX + Adafruit_ST7789
  - Hold MIDDLE (GPIO19) 5s -> BT pairing screen (indicator only)
  - Hold LEFT (GPIO18) + RIGHT (GPIO21) 5s -> Toggle WiFi config mode
  - Show: Connected Status --------- Battery Status
          Password position 1 (title)
          Password position 2 (title)
          Password position 3 (title)

  Fixes for compile errors:
  - Removed overloaded displayStatus() wrapper. Now only displayStatus(bool force=false).
  - Replaced ST77XX_DARKGREY with a defined color (custom DARKGREY).
*/

#include <BleKeyboard.h>
#include <WiFi.h>
#include <WebServer.h>
#include <Preferences.h>
#include <ArduinoJson.h>
#include <vector>

#include <Adafruit_GFX.h>
#include <Adafruit_ST7789.h>
#include <SPI.h>

// ---------------- BLE Keyboard ----------------
BleKeyboard bleKeyboard("MacroPad", "ESP32", 100);

// ---------------- WiFi AP ---------------------
const char* ap_ssid = "MacroPad_Config";
const char* ap_password = "12345678";
WebServer server(80);
Preferences preferences;

// ---------------- Buttons ---------------------
const int BUTTON_LEFT   = 18; // Prev macro
const int BUTTON_MIDDLE = 19; // Run / Pairing hold
const int BUTTON_RIGHT  = 21; // Next macro

// ---------------- ST7789 Pins (LILYGO 1.14") -
#define TFT_MOSI 19
#define TFT_SCLK 18
#define TFT_CS   5
#define TFT_DC   16
#define TFT_RST  23
#define TFT_BL   4

// 1.14" panel geometry
#define TFT_WIDTH   135
#define TFT_HEIGHT  240
#define TFT_COL_OFFSET 52
#define TFT_ROW_OFFSET 40

Adafruit_ST7789 tft = Adafruit_ST7789(TFT_CS, TFT_DC, TFT_RST);

// Define missing color (Adafruit ST77XX doesn't provide DARKGREY)
#define DARKGREY 0x7BEF  // RGB565 approx #7BDE

// ---------------- Battery ADC -----------------
const int BAT_ADC_PIN = 34;  // adjust if different
const int ADC_MIN = 1900;    // raw ~ empty (calibrate)
const int ADC_MAX = 4095;    // raw ~ full (calibrate)

// ---------------- Macros ----------------------
std::vector<String> macros;
std::vector<String> macroNames;
int currentMacro = 0;
int maxMacros = 1000;

// ---------------- States ----------------------
unsigned long lastDebounce = 0;
bool midHeld = false;
unsigned long midPressStart = 0;

bool comboHeld = false;
unsigned long comboPressStart = 0;

bool wifiConfigMode = false;
unsigned long lastDisplayUpdate = 0;

// ---------------- Forward Decls ---------------
void displayStatus(bool force=false);
void setupWebServer();
void loadAllMacros();
void saveAllMacros();
void nextMacro();
void previousMacro();
void runCurrentMacro();
void enterPairingMode();
void toggleWiFiConfig();
String getHTML();
void drawTopStatus();
void drawMacroTitles();
int batteryPercent();

// ---------------- Setup -----------------------
void setup() {
  Serial.begin(115200);

  pinMode(BUTTON_LEFT, INPUT_PULLUP);
  pinMode(BUTTON_MIDDLE, INPUT_PULLUP);
  pinMode(BUTTON_RIGHT, INPUT_PULLUP);

  pinMode(TFT_BL, OUTPUT);
  digitalWrite(TFT_BL, HIGH); // backlight on

  // SPI + ST7789
  SPI.begin(TFT_SCLK, -1, TFT_MOSI, TFT_CS);
  tft.init(TFT_WIDTH, TFT_HEIGHT);                 // Initialize 135x240
  tft.setRotation(1);                              // Landscape: 240x135
  tft.setAddrWindow(TFT_COL_OFFSET, TFT_ROW_OFFSET, TFT_WIDTH, TFT_HEIGHT);
  tft.fillScreen(ST77XX_BLACK);
  tft.setTextWrap(false);

  preferences.begin("macropad", false);
  loadAllMacros();

  Serial.println("Starting BLE Keyboard...");
  bleKeyboard.begin();

  setupWebServer();

  displayStatus(true);
  Serial.println("MacroPad Ready!");
}

// ---------------- Loop ------------------------
void loop() {
  server.handleClient();

  // LEFT + RIGHT combo for 5s: toggle WiFi config mode
  if (digitalRead(BUTTON_LEFT) == LOW && digitalRead(BUTTON_RIGHT) == LOW) {
    if (!comboHeld) {
      comboHeld = true;
      comboPressStart = millis();
    }
    if (millis() - comboPressStart > 5000) {
      toggleWiFiConfig();
      comboHeld = false;
    }
  } else {
    comboHeld = false;
  }

  // Middle press: short -> run macro, long 5s -> pairing mode view
  if (digitalRead(BUTTON_MIDDLE) == LOW) {
    if (!midHeld) {
      midHeld = true;
      midPressStart = millis();
    }
    if (millis() - midPressStart > 5000) {
      enterPairingMode();
      midHeld = false;
    }
  } else if (midHeld) {
    // released before 5s -> short action
    if (millis() - midPressStart < 5000) runCurrentMacro();
    midHeld = false;
  }

  // Right -> next macro (debounced)
  if (digitalRead(BUTTON_RIGHT) == LOW && millis() - lastDebounce > 250) {
    lastDebounce = millis();
    nextMacro();
  }

  // Left -> previous macro (debounced)
  if (digitalRead(BUTTON_LEFT) == LOW && millis() - lastDebounce > 250) {
    lastDebounce = millis();
    previousMacro();
  }

  // Periodic display refresh
  if (millis() - lastDisplayUpdate > 250) {
    displayStatus();
    lastDisplayUpdate = millis();
  }
}

// ---------------- Macro Navigation ------------
void nextMacro() {
  if (macros.empty()) return;
  currentMacro = (currentMacro + 1) % macros.size();
  preferences.putInt("currentMacro", currentMacro);
  displayStatus(true);
}

void previousMacro() {
  if (macros.empty()) return;
  currentMacro = (currentMacro - 1 + macros.size()) % macros.size();
  preferences.putInt("currentMacro", currentMacro);
  displayStatus(true);
}

void runCurrentMacro() {
  if (!macros.empty() && bleKeyboard.isConnected()) {
    Serial.printf("Running macro: %s\n", macroNames[currentMacro].c_str());
    bleKeyboard.print(macros[currentMacro]);
  } else if (macros.empty()) {
    Serial.println("No macros available");
  } else {
    Serial.println("Bluetooth not connected");
  }
}

// ---------------- Pairing Mode ----------------
void enterPairingMode() {
  // Indicator screen only (BLE pairing handled by library)
  tft.fillScreen(ST77XX_BLACK);
  tft.setTextColor(ST77XX_YELLOW);
  tft.setCursor(TFT_COL_OFFSET + 10, TFT_ROW_OFFSET + 30);
  tft.setTextSize(2);
  tft.print("PAIRING MODE");
  tft.setTextSize(1);
  tft.setCursor(TFT_COL_OFFSET + 10, TFT_ROW_OFFSET + 60);
  tft.print("Open BT settings and");
  tft.setCursor(TFT_COL_OFFSET + 10, TFT_ROW_OFFSET + 75);
  tft.print("connect to: MacroPad");
  delay(1500);
  displayStatus(true);
}

// ---------------- WiFi Config Mode ------------
void toggleWiFiConfig() {
  wifiConfigMode = !wifiConfigMode;
  if (wifiConfigMode) {
    WiFi.softAP(ap_ssid, ap_password);
    IPAddress ip = WiFi.softAPIP();
    Serial.printf("WiFi AP ON  SSID: %s  PASS: %s  IP: %s\n",
                  ap_ssid, ap_password, ip.toString().c_str());
  } else {
    WiFi.softAPdisconnect(true);
    Serial.println("WiFi AP OFF");
  }
  displayStatus(true);
}

// ---------------- Display ---------------------
int batteryPercent() {
  int raw = analogRead(BAT_ADC_PIN);
  if (raw < ADC_MIN) raw = ADC_MIN;
  if (raw > ADC_MAX) raw = ADC_MAX;
  return map(raw, ADC_MIN, ADC_MAX, 0, 100);
}

void drawTopStatus() {
  // "Connected Status --------- Battery Status"
  const int w = 240;

  tft.fillRect(TFT_COL_OFFSET, TFT_ROW_OFFSET, w, 18, ST77XX_BLACK);
  tft.setTextSize(1);
  tft.setTextColor(ST77XX_GREEN);
  tft.setCursor(TFT_COL_OFFSET + 4, TFT_ROW_OFFSET + 4);
  if (bleKeyboard.isConnected()) tft.print("BT: Connected");
  else tft.print("BT: Disconnected");

  // Divider and battery right aligned
  tft.setTextColor(ST77XX_WHITE);
  tft.setCursor(TFT_COL_OFFSET + 120, TFT_ROW_OFFSET + 4);
  tft.print("----------------");

  int batt = batteryPercent();
  tft.setTextColor(ST77XX_CYAN);
  String btxt = String("Battery: ") + String(batt) + "%";
  int16_t bx, by;
  uint16_t bw, bh;
  tft.getTextBounds(btxt, 0, 0, &bx, &by, &bw, &bh);
  tft.setCursor(TFT_COL_OFFSET + w - bw - 6, TFT_ROW_OFFSET + 4);
  tft.print(btxt);
}

void drawMacroTitles() {
  // Show three titles: Password position 1..3 (use macroNames)
  // Highlight current at position line 1
  const int startY = TFT_ROW_OFFSET + 26;
  const int lineH = 26;

  for (int i = 0; i < 3; i++) {
    int idx = 0;
    if (!macros.empty()) idx = (currentMacro + i) % macroNames.size();
    String title;
    if (!macroNames.empty()) {
      title = macroNames[idx];
    } else {
      title = String("Password position ") + String(i + 1);
    }

    // Background row
    uint16_t bg = (i == 0) ? DARKGREY : ST77XX_BLACK;
    tft.fillRect(TFT_COL_OFFSET + 2, startY + i * lineH - 2, 236, lineH, bg);

    // Title text
    tft.setTextSize(2);
    tft.setTextColor((i == 0) ? ST77XX_YELLOW : ST77XX_WHITE, bg);
    tft.setCursor(TFT_COL_OFFSET + 8, startY + i * lineH + 2);

    // Trim to fit width
    String shown = title;
    int16_t bx, by;
    uint16_t bw, bh;
    while (true) {
      tft.getTextBounds(shown, 0, 0, &bx, &by, &bw, &bh);
      if (bw <= 220 || shown.length() <= 3) break;
      shown.remove(shown.length() - 1);
    }
    tft.print(shown);
  }

  // If WiFi config mode, overlay SSID/PASS/IP box at bottom
  if (wifiConfigMode) {
    IPAddress ip = WiFi.softAPIP();
    int boxY = TFT_ROW_OFFSET + 26 + 3 * lineH + 6;
    tft.fillRect(TFT_COL_OFFSET + 2, boxY, 236, 58, ST77XX_BLACK);
    tft.drawRect(TFT_COL_OFFSET + 2, boxY, 236, 58, ST77XX_CYAN);
    tft.setTextSize(1);
    tft.setTextColor(ST77XX_CYAN);
    tft.setCursor(TFT_COL_OFFSET + 8, boxY + 6);
    tft.print("WiFi Config Mode");
    tft.setCursor(TFT_COL_OFFSET + 8, boxY + 20);
    tft.print("SSID: "); tft.print(ap_ssid);
    tft.setCursor(TFT_COL_OFFSET + 8, boxY + 32);
    tft.print("PASS: "); tft.print(ap_password);
    tft.setCursor(TFT_COL_OFFSET + 8, boxY + 44);
    tft.print("IP: "); tft.print(ip.toString());
  }
}

void displayStatus(bool force) {
  static bool lastBT = false;
  static int lastBatt = -1;
  static int lastCur = -1;
  static bool lastWiFiCfg = false;

  bool btNow = bleKeyboard.isConnected();
  int battNow = batteryPercent();

  bool changed = force || (btNow != lastBT) || (battNow != lastBatt) || (lastCur != currentMacro) || (lastWiFiCfg != wifiConfigMode);

  if (!changed) return;

  // Clear full window we use
  tft.fillRect(TFT_COL_OFFSET, TFT_ROW_OFFSET, TFT_WIDTH, TFT_HEIGHT, ST77XX_BLACK);

  drawTopStatus();
  drawMacroTitles();

  lastBT = btNow;
  lastBatt = battNow;
  lastCur = currentMacro;
  lastWiFiCfg = wifiConfigMode;
}

// ---------------- Storage ---------------------
void loadAllMacros() {
  macros.clear();
  macroNames.clear();

  int totalMacros = preferences.getInt("totalMacros", 0);
  currentMacro = preferences.getInt("currentMacro", 0);

  for (int i = 0; i < totalMacros; i++) {
    String textKey = "text_" + String(i);
    String nameKey = "name_" + String(i);
    String macroText = preferences.getString(textKey.c_str(), "");
    String macroName = preferences.getString(nameKey.c_str(), "Password position " + String(i + 1));
    if (macroText.length() > 0) {
      macros.push_back(macroText);
      macroNames.push_back(macroName);
    }
  }

  if (macros.empty()) {
    // Provide three demo entries to match requested UI labels
    macros.push_back("demo1");
    macroNames.push_back("Password position 1");
    macros.push_back("demo2");
    macroNames.push_back("Password position 2");
    macros.push_back("demo3");
    macroNames.push_back("Password position 3");
  }

  if (currentMacro >= (int)macros.size()) currentMacro = 0;
}

void saveAllMacros() {
  preferences.putInt("totalMacros", macros.size());
  preferences.putInt("currentMacro", currentMacro);
  for (int i = 0; i < (int)macros.size(); i++) {
    preferences.putString(("text_" + String(i)).c_str(), macros[i]);
    preferences.putString(("name_" + String(i)).c_str(), macroNames[i]);
  }
}

// ---------------- Web Server ------------------
void setupWebServer() {
  // Start AP immediately so config page is reachable; can be toggled by combo
  WiFi.softAP(ap_ssid, ap_password);
  IPAddress IP = WiFi.softAPIP();
  Serial.printf("Web Config @ http://%s\n", IP.toString().c_str());

  server.on("/", HTTP_GET, []() {
    server.send(200, "text/html", getHTML());
  });

  server.on("/add", HTTP_POST, []() {
    if (server.hasArg("name") && server.hasArg("text")) {
      if ((int)macros.size() >= maxMacros) {
        server.send(400, "text/plain", "Limit reached");
        return;
      }
      String name = server.arg("name");
      String text = server.arg("text");
      macros.push_back(text);
      macroNames.push_back(name);
      saveAllMacros();
      server.send(200, "text/plain", "Added. Total: " + String(macros.size()));
    } else {
      server.send(400, "text/plain", "Missing params");
    }
  });

  server.on("/delete", HTTP_POST, []() {
    if (!server.hasArg("index")) {
      server.send(400, "text/plain", "Missing index");
      return;
    }
    int idx = server.arg("index").toInt() - 1;
    if (idx < 0 || idx >= (int)macros.size()) {
      server.send(400, "text/plain", "Invalid index");
      return;
    }
    macros.erase(macros.begin() + idx);
    macroNames.erase(macroNames.begin() + idx);
    if (macros.empty()) currentMacro = 0;
    else if (currentMacro >= (int)macros.size()) currentMacro = macros.size() - 1;
    saveAllMacros();
    server.send(200, "text/plain", "Deleted. Total: " + String(macros.size()));
  });

  server.on("/list", HTTP_GET, []() {
    DynamicJsonDocument doc(8192);
    doc["current"] = macros.empty() ? 0 : currentMacro + 1;
    doc["total"] = (int)macros.size();
    doc["maxMacros"] = maxMacros;

    JsonArray macroArray = doc.createNestedArray("macros");
    for (int i = 0; i < (int)macros.size(); i++) {
      JsonObject macro = macroArray.createNestedObject();
      macro["index"] = i + 1;
      macro["name"] = macroNames[i];
      macro["text"] = macros[i];
      macro["length"] = macros[i].length();
    }

    String json;
    serializeJson(doc, json);
    server.send(200, "application/json", json);
  });

  server.on("/current", HTTP_GET, []() {
    DynamicJsonDocument doc(1024);
    if (!macros.empty()) {
      doc["current"] = currentMacro + 1;
      doc["total"] = (int)macros.size();
      doc["name"] = macroNames[currentMacro];
      doc["text"] = macros[currentMacro];
    } else {
      doc["current"] = 0;
      doc["total"] = 0;
      doc["name"] = "No macros";
      doc["text"] = "";
    }
    String json;
    serializeJson(doc, json);
    server.send(200, "application/json", json);
  });

  server.on("/memory", HTTP_GET, []() {
    DynamicJsonDocument doc(512);
    size_t totalSize = 0;
    for (const String& s : macros) totalSize += s.length();
    doc["totalMacros"] = (int)macros.size();
    doc["maxMacros"] = maxMacros;
    doc["totalTextSize"] = (int)totalSize;
    doc["averageSize"] = macros.empty() ? 0 : (int)(totalSize / macros.size());
    doc["freeHeap"] = (uint32_t)ESP.getFreeHeap();
    doc["totalHeap"] = (uint32_t)ESP.getHeapSize();

    String json;
    serializeJson(doc, json);
    server.send(200, "application/json", json);
  });

  server.begin();
}

// ---------------- HTML ------------------------
String getHTML() {
  return R"rawliteral(
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MacroPad Config</title>
<style>
body{font-family:Arial, sans-serif; margin:20px; background:#f0f2f5}
.container{max-width:800px; margin:0 auto; background:#fff; padding:24px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,.08)}
h1{margin:0 0 16px}
.stat{display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:12px; margin:16px 0}
.box{background:#f8f9fa; border-left:4px solid #4CAF50; padding:12px; border-radius:6px}
.num{font-weight:700; color:#2e7d32}
label{font-weight:700}
input,textarea{width:100%; padding:10px; border:1px solid #ddd; border-radius:6px}
textarea{min-height:100px; font-family:monospace}
button{background:#4CAF50; color:#fff; padding:10px 18px; border:none; border-radius:6px; cursor:pointer; margin:4px}
button.delete{background:#dc3545}
.status{display:none; margin:12px 0; padding:10px; border-radius:6px}
.success{display:block; background:#d4edda; color:#155724}
.error{display:block; background:#f8d7da; color:#721c24}
.item{display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding:10px 0}
.name{font-weight:700}
.text{color:#666; max-width:360px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
</style>
</head>
<body>
<div class="container">
  <h1>MacroPad - Web Config</h1>
  <div class="stat">
    <div class="box">Total Macros: <span class="num" id="total">-</span></div>
    <div class="box">Current: <span class="num" id="current">-</span></div>
    <div class="box">Memory Used: <span class="num" id="mem">-</span></div>
    <div class="box">Free Heap: <span class="num" id="heap">-</span></div>
  </div>

  <form onsubmit="addMacro(event)">
    <label>Name</label>
    <input id="name" required placeholder="Password position N">
    <label>Text</label>
    <textarea id="text" required placeholder="Secret text"></textarea>
    <div>
      <button type="submit">Add Macro</button>
      <button type="button" onclick="loadAll()">Refresh</button>
    </div>
  </form>

  <div id="status" class="status"></div>
  <div id="list"></div>
</div>
<script>
function fmt(b){if(b===0)return'0 B';const k=1024,s=['B','KB','MB'];let i=Math.floor(Math.log(b)/Math.log(k));return (b/Math.pow(k,i)).toFixed(1)+' '+s[i];}
function statusMsg(msg,ok){const el=document.getElementById('status');el.textContent=msg;el.className='status '+(ok?'success':'error');}
function loadAll(){
  fetch('/list').then(r=>r.json()).then(d=>{
    document.getElementById('total').textContent=d.total;
    document.getElementById('current').textContent=d.current+'/'+d.total;
    const list=document.getElementById('list'); list.innerHTML='';
    d.macros.forEach(m=>{
      const div=document.createElement('div'); div.className='item';
      div.innerHTML=`<div><div class="name">#${m.index}: ${m.name}</div><div class="text">${m.text}</div></div>
                     <button class="delete" onclick="del(${m.index})">Delete</button>`;
      list.appendChild(div);
    });
  });
  fetch('/memory').then(r=>r.json()).then(d=>{
    document.getElementById('mem').textContent=fmt(d.totalTextSize);
    document.getElementById('heap').textContent=fmt(d.freeHeap);
  });
}
function addMacro(e){
  e.preventDefault();
  const fd=new FormData();
  fd.append('name',document.getElementById('name').value);
  fd.append('text',document.getElementById('text').value);
  fetch('/add',{method:'POST',body:fd}).then(r=>r.text()).then(t=>{
    statusMsg(t,true); document.getElementById('name').value=''; document.getElementById('text').value='';
    loadAll();
  }).catch(er=>statusMsg('Error: '+er,false));
}
function del(i){
  if(!confirm('Delete this macro?'))return;
  const fd=new FormData(); fd.append('index',i);
  fetch('/delete',{method:'POST',body:fd}).then(r=>r.text()).then(t=>{statusMsg(t,true); loadAll();})
  .catch(er=>statusMsg('Error: '+er,false));
}
loadAll(); setInterval(loadAll,30000);
</script>
</body>
</html>
)rawliteral";
}


```