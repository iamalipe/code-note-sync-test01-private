
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

  CORRECTION v1.1:
  - Moved button pins to avoid conflict with TFT SPI bus (SCLK/MOSI).
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
// CRITICAL FIX: Moved buttons away from SPI pins 18 (SCLK) and 19 (MOSI)
const int BUTTON_LEFT   = 25; // Prev macro
const int BUTTON_MIDDLE = 26; // Run / Pairing hold
const int BUTTON_RIGHT  = 27; // Next macro

// ---------------- ST7789 Pins (LILYGO 1.14") -
#define TFT_MOSI 19
#define TFT_SCLK 18
#define TFT_CS   5
#define TFT_DC   16
#define TFT_RST  23
#define TFT_BL   4

// 1.14" panel geometry
#define TFT_WIDTH      135
#define TFT_HEIGHT     240
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
  if(wifiConfigMode) {
    server.handleClient();
  }

  // LEFT + RIGHT combo for 5s: toggle WiFi config mode
  if (digitalRead(BUTTON_LEFT) == LOW && digitalRead(BUTTON_RIGHT) == LOW) {
    if (!comboHeld) {
      comboHeld = true;
      comboPressStart = millis();
    }
    if (millis() - comboPressStart > 5000) {
      toggleWiFiConfig();
      comboHeld = false; // Prevent re-triggering
      delay(500); // Small delay to release buttons
    }
  } else {
    comboHeld = false;
  }

  // Only check other buttons if combo is not being held
  if (!comboHeld) {
    // Middle press: short -> run macro, long 5s -> pairing mode view
    if (digitalRead(BUTTON_MIDDLE) == LOW) {
      if (!midHeld) {
        midHeld = true;
        midPressStart = millis();
      }
      if (millis() - midPressStart > 5000) {
        enterPairingMode();
        midHeld = false; // Prevent re-triggering
        delay(500); // Small delay to release button
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
  tft.setCursor(10, 30); // Using 0,0 relative coords
  tft.setTextSize(2);
  tft.print("PAIRING MODE");
  tft.setTextSize(1);
  tft.setCursor(10, 60);
  tft.print("Open BT settings and");
  tft.setCursor(10, 75);
  tft.print("connect to: MacroPad");
  delay(2000);
  displayStatus(true);
}

// ---------------- WiFi Config Mode ------------
void toggleWiFiConfig() {
  wifiConfigMode = !wifiConfigMode;
  if (wifiConfigMode) {
    WiFi.softAP(ap_ssid, ap_password);
    IPAddress ip = WiFi.softAPIP();
    server.begin(); // Start server only when needed
    Serial.printf("WiFi AP ON  SSID: %s  PASS: %s  IP: %s\n",
                  ap_ssid, ap_password, ip.toString().c_str());
  } else {
    server.stop(); // Stop server to save resources
    WiFi.softAPdisconnect(true);
    Serial.println("WiFi AP OFF");
  }
  displayStatus(true);
}

// ---------------- Display ---------------------
int batteryPercent() {
  int raw = analogRead(BAT_ADC_PIN);
  return map(raw, ADC_MIN, ADC_MAX, 0, 100);
}

void drawTopStatus() {
  // "Connected Status --------- Battery Status"
  const int w = TFT_WIDTH; // Use defined width

  tft.fillRect(0, 0, w, 18, ST77XX_BLACK);
  tft.setTextSize(2);
  tft.setCursor(4, 4);

  if (bleKeyboard.isConnected()) {
    tft.setTextColor(ST77XX_GREEN);
    tft.print("BT: Connected");
  } else {
    tft.setTextColor(ST77XX_RED);
    tft.print("BT: Disconnected");
  }

  // Battery right aligned
  int batt = batteryPercent();
  if (batt < 20) tft.setTextColor(ST77XX_RED);
  else if (batt < 50) tft.setTextColor(ST77XX_YELLOW);
  else tft.setTextColor(ST77XX_GREEN);

  String btxt = String(batt) + "%";
  int16_t bx, by;
  uint16_t bw, bh;
  tft.getTextBounds(btxt, 0, 0, &bx, &by, &bw, &bh);
  tft.setCursor(w - bw - 4, 4);
  tft.print(btxt);
}

void drawMacroTitles() {
  // Show three titles: current, next, and next+1
  const int startY = 26;
  const int lineH = 35;

  for (int i = 0; i < 3; i++) {
    int idx = 0;
    if (!macros.empty()) {
        idx = (currentMacro + i) % macroNames.size();
    }
    
    String title = (macroNames.empty()) ? "Empty" : macroNames[idx];

    // Background row
    uint16_t bg = (i == 0) ? DARKGREY : ST77XX_BLACK;
    tft.fillRect(2, startY + i * lineH - 2, TFT_WIDTH - 4, lineH, bg);

    // Title text
    tft.setTextSize(2);
    tft.setTextColor((i == 0) ? ST77XX_YELLOW : ST77XX_WHITE);
    tft.setCursor(8, startY + i * lineH + 8);

    // Trim to fit width
    String shown = title;
    int16_t bx, by;
    uint16_t bw, bh;
    tft.getTextBounds(shown, 0, 0, &bx, &by, &bw, &bh);
    while (bw > (TFT_WIDTH - 16) && shown.length() > 3) {
      shown.remove(shown.length() - 1);
      tft.getTextBounds(shown, 0, 0, &bx, &by, &bw, &bh);
    }
    tft.print(shown);
  }

  // If WiFi config mode, overlay SSID/PASS/IP box at bottom
  if (wifiConfigMode) {
    IPAddress ip = WiFi.softAPIP();
    int boxY = TFT_HEIGHT - 62;
    tft.fillRect(2, boxY, TFT_WIDTH - 4, 60, ST77XX_BLACK);
    tft.drawRect(2, boxY, TFT_WIDTH - 4, 60, ST77XX_CYAN);
    tft.setTextSize(1);
    tft.setTextColor(ST77XX_WHITE);
    tft.setCursor(8, boxY + 6);
    tft.print("WiFi Config Mode");
    tft.setTextColor(ST77XX_CYAN);
    tft.setCursor(8, boxY + 20);
    tft.print("SSID: " + String(ap_ssid));
    tft.setCursor(8, boxY + 32);
    tft.print("PASS: " + String(ap_password));
    tft.setCursor(8, boxY + 44);
    tft.print("IP:   " + ip.toString());
  }
}


void displayStatus(bool force) {
  static bool lastBT = false;
  static int lastBatt = -1;
  static int lastCur = -1;
  static bool lastWiFiCfg = false;

  bool btNow = bleKeyboard.isConnected();
  int battNow = batteryPercent();

  bool changed = force || (btNow != lastBT) || (abs(battNow-lastBatt) > 2) || (lastCur != currentMacro) || (lastWiFiCfg != wifiConfigMode);

  if (!changed) return;

  // No need to clear full screen if we are redrawing everything
  // tft.fillScreen(ST77XX_BLACK);
  
  drawTopStatus();
  drawMacroTitles();

  lastBT = btNow;
  lastBatt = battNow;
  lastCur = currentMacro;
  lastWiFiCfg = lastWiFiCfg;
}

// ---------------- Storage ---------------------
void loadAllMacros() {
  macros.clear();
  macroNames.clear();

  preferences.begin("macropad", false);
  int totalMacros = preferences.getInt("totalMacros", 0);
  currentMacro = preferences.getInt("currentMacro", 0);

  for (int i = 0; i < totalMacros; i++) {
    String textKey = "text_" + String(i);
    String nameKey = "name_" + String(i);
    String macroText = preferences.getString(textKey.c_str(), "");
    String macroName = preferences.getString(nameKey.c_str(), "Macro " + String(i + 1));
    if (macroText.length() > 0) {
      macros.push_back(macroText);
      macroNames.push_back(macroName);
    }
  }
  preferences.end();

  if (macros.empty()) {
    // Provide one demo entry
    macros.push_back("Hello from ESP32 MacroPad!");
    macroNames.push_back("Demo Macro");
  }

  if (currentMacro >= (int)macros.size()) currentMacro = 0;
}

void saveAllMacros() {
  preferences.begin("macropad", false);
  preferences.clear(); // Clear old entries
  preferences.putInt("totalMacros", macros.size());
  preferences.putInt("currentMacro", currentMacro);
  for (int i = 0; i < (int)macros.size(); i++) {
    preferences.putString(("text_" + String(i)).c_str(), macros[i]);
    preferences.putString(("name_" + String(i)).c_str(), macroNames[i]);
  }
  preferences.end();
}

// ---------------- Web Server ------------------
void setupWebServer() {
  // Server is started in toggleWiFiConfig()
  
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
      displayStatus(true);
    } else {
      server.send(400, "text/plain", "Missing params");
    }
  });

  server.on("/delete", HTTP_POST, []() {
    if (!server.hasArg("index")) {
      server.send(400, "text/plain", "Missing index");
      return;
    }
    int idx = server.arg("index").toInt(); // Assuming 1-based index from web
    if (idx < 1 || idx > (int)macros.size()) {
      server.send(400, "text/plain", "Invalid index");
      return;
    }
    macros.erase(macros.begin() + idx - 1);
    macroNames.erase(macroNames.begin() + idx - 1);
    
    if (currentMacro >= (int)macros.size()) {
        currentMacro = macros.empty() ? 0 : macros.size() - 1;
    }

    saveAllMacros();
    loadAllMacros(); // Reload to ensure consistency
    server.send(200, "text/plain", "Deleted. Total: " + String(macros.size()));
    displayStatus(true);
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
  
  server.on("/memory", HTTP_GET, []() {
    DynamicJsonDocument doc(512);
    size_t totalSize = 0;
    for (const String& s : macros) totalSize += s.length();
    for (const String& s : macroNames) totalSize += s.length();

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
input,textarea{width:100%; padding:10px; border:1px solid #ddd; border-radius:6px; box-sizing: border-box;}
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
    <input id="name" required placeholder="My Secret Password">
    <label>Text</label>
    <textarea id="text" required placeholder="The text to type..."></textarea>
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
function statusMsg(msg,ok){const el=document.getElementById('status');el.textContent=msg;el.className='status '+(ok?'success':'error');setTimeout(()=>el.className='status',3000);}
function loadAll(){
  fetch('/list').then(r=>r.json()).then(d=>{
    document.getElementById('total').textContent=d.total;
    document.getElementById('current').textContent=d.current+'/'+d.total;
    const list=document.getElementById('list'); list.innerHTML='';
    d.macros.forEach(m=>{
      const div=document.createElement('div'); div.className='item';
      div.innerHTML=`<div><div class="name">#${m.index}: ${m.name}</div><div class="text" title="${m.text}">${m.text}</div></div>
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
  fetch('/add',{method:'POST',body:fd}).then(async r=>{
    const t = await r.text();
    if(!r.ok) throw new Error(t);
    statusMsg(t,true); document.getElementById('name').value=''; document.getElementById('text').value='';
    loadAll();
  }).catch(er=>statusMsg('Error: '+er,false));
}
function del(i){
  if(!confirm('Delete this macro?'))return;
  const fd=new FormData(); fd.append('index',i);
  fetch('/delete',{method:'POST',body:fd}).then(async r=>{
    const t = await r.text();
    if(!r.ok) throw new Error(t);
    statusMsg(t,true); loadAll();
  })
  .catch(er=>statusMsg('Error: '+er,false));
}
loadAll();
</script>
</body>
</html>
)rawliteral";
}

```