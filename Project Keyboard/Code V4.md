
```cpp

/*
  ESP32 Bluetooth Macro Pad with Web Config + 1.14" ST7789 (135x240)
  - CORRECTION v1.2:
  - Removed all display offsets for drawing relative to (0,0).
  - Mapped Pairing Mode to a 5s hold on built-in GPIO 0 button.
  - Mapped WiFi Config Mode to a 5s hold on built-in GPIO 35 button.
  - External buttons are now used exclusively for macro navigation and execution.
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
// --- External buttons for macro control ---
const int BUTTON_LEFT = 25;    // Prev macro
const int BUTTON_MIDDLE = 26;  // Run macro
const int BUTTON_RIGHT = 27;   // Next macro

// --- Built-in TTGO T-Display buttons for special functions ---
const int BTN_BUILTIN_PAIR = 0;   // Hold 5s for Pairing Mode
const int BTN_BUILTIN_WIFI = 35;  // Hold 5s for WiFi Config Mode

// ---------------- ST7789 Pins (LILYGO 1.14") -
#define TFT_MOSI 19
#define TFT_SCLK 18
#define TFT_CS 5
#define TFT_DC 16
#define TFT_RST 23
#define TFT_BL 4

// 1.14" panel geometry (now without offsets)
#define TFT_WIDTH 240
#define TFT_HEIGHT 135

Adafruit_ST7789 tft = Adafruit_ST7789(TFT_CS, TFT_DC, TFT_RST);

// Define missing color
#define DARKGREY 0x7BEF

// ---------------- Battery ADC -----------------
const int BAT_ADC_PIN = 34;
const int ADC_MIN = 1900;
const int ADC_MAX = 4095;

// ---------------- Macros ----------------------
std::vector<String> macros;
std::vector<String> macroNames;
int currentMacro = 0;
int maxMacros = 1000;

// ---------------- States ----------------------
unsigned long lastDebounce = 0;
bool wifiConfigMode = false;
unsigned long lastDisplayUpdate = 0;

// Button hold states
bool pairBtnHeld = false;
unsigned long pairPressStart = 0;
bool wifiBtnHeld = false;
unsigned long wifiPressStart = 0;

// ---------------- Forward Decls ---------------
void displayStatus(bool force = false);
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

  // External buttons
  pinMode(BUTTON_LEFT, INPUT_PULLUP);
  pinMode(BUTTON_MIDDLE, INPUT_PULLUP);
  pinMode(BUTTON_RIGHT, INPUT_PULLUP);

  // Built-in buttons
  pinMode(BTN_BUILTIN_PAIR, INPUT_PULLUP);
  pinMode(BTN_BUILTIN_WIFI, INPUT_PULLUP);

  pinMode(TFT_BL, OUTPUT);
  digitalWrite(TFT_BL, HIGH);

  // SPI + ST7789
  SPI.begin(TFT_SCLK, -1, TFT_MOSI, TFT_CS);
  tft.init(135, 240);  // Initialize 135x240
  tft.setRotation(1);  // Landscape: 240x135
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
  if (wifiConfigMode) {
    server.handleClient();
  }

  // --- Check for special function holds on built-in buttons ---

  // Hold GPIO 0 for 5s: Enter Pairing Mode
  if (digitalRead(BTN_BUILTIN_PAIR) == LOW) {
    if (!pairBtnHeld) {
      pairBtnHeld = true;
      pairPressStart = millis();
    }
    if (millis() - pairPressStart > 5000) {
      enterPairingMode();
      pairBtnHeld = false;  // Prevent re-triggering
    }
  } else {
    pairBtnHeld = false;
  }

  // Hold GPIO 35 for 5s: Toggle WiFi Config Mode
  if (digitalRead(BTN_BUILTIN_WIFI) == LOW) {
    if (!wifiBtnHeld) {
      wifiBtnHeld = true;
      wifiPressStart = millis();
    }
    if (millis() - wifiPressStart > 5000) {
      toggleWiFiConfig();
      wifiBtnHeld = false;  // Prevent re-triggering
    }
  } else {
    wifiBtnHeld = false;
  }

  // --- Check for standard macro actions on external buttons ---

  // Middle button -> Run macro
  if (digitalRead(BUTTON_MIDDLE) == LOW && millis() - lastDebounce > 250) {
    lastDebounce = millis();
    runCurrentMacro();
  }

  // Right button -> Next macro
  if (digitalRead(BUTTON_RIGHT) == LOW && millis() - lastDebounce > 250) {
    lastDebounce = millis();
    nextMacro();
  }

  // Left button -> Previous macro
  if (digitalRead(BUTTON_LEFT) == LOW && millis() - lastDebounce > 250) {
    lastDebounce = millis();
    previousMacro();
  }

  // Periodic display refresh
  if (millis() - lastDisplayUpdate > 500) {
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

// ---------------- Special Modes ----------------
void enterPairingMode() {
  tft.fillScreen(ST77XX_BLACK);
  tft.setTextColor(ST77XX_YELLOW);
  tft.setTextSize(2);
  tft.setCursor(50, 35);
  tft.print("PAIRING MODE");
  tft.setTextSize(1);
  tft.setCursor(45, 65);
  tft.print("Open BT settings and");
  tft.setCursor(50, 80);
  tft.print("connect to: MacroPad");
  delay(2500);
  displayStatus(true);
}

void toggleWiFiConfig() {
  wifiConfigMode = !wifiConfigMode;
  if (wifiConfigMode) {
    WiFi.softAP(ap_ssid, ap_password);
    IPAddress ip = WiFi.softAPIP();
    server.begin();
    Serial.printf("WiFi AP ON: %s, IP: %s\n", ap_ssid, ip.toString().c_str());
  } else {
    server.stop();
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
  tft.fillRect(0, 0, TFT_WIDTH, 18, ST77XX_BLACK);
  tft.setTextSize(2);
  tft.setCursor(4, 4);

  if (bleKeyboard.isConnected()) {
    tft.setTextColor(ST77XX_GREEN);
    tft.print("BT Connected");
  } else {
    tft.setTextColor(ST77XX_RED);
    tft.print("BT Disconnected");
  }

  int batt = batteryPercent();
  if (batt < 20) tft.setTextColor(ST77XX_RED);
  else if (batt < 50) tft.setTextColor(ST77XX_YELLOW);
  else tft.setTextColor(ST77XX_GREEN);

  String btxt = String(batt) + "%";
  int16_t bx, by;
  uint16_t bw, bh;
  tft.getTextBounds(btxt, 0, 0, &bx, &by, &bw, &bh);
  tft.setCursor(TFT_WIDTH - bw - 4, 4);
  tft.print(btxt);
}

void drawMacroTitles() {
  const int startY = 22;
  const int lineH = 35;

  for (int i = 0; i < 3; i++) {
    int idx = 0;
    if (!macros.empty()) {
      idx = (currentMacro + i) % macroNames.size();
    }
    String title = macroNames.empty() ? "No Macros" : macroNames[idx];

    uint16_t bg = (i == 0) ? DARKGREY : ST77XX_BLACK;
    uint16_t fg = (i == 0) ? ST77XX_YELLOW : ST77XX_WHITE;

    tft.fillRect(0, startY + i * lineH, TFT_WIDTH, lineH, bg);
    tft.setTextColor(fg);
    tft.setTextSize(2);
    tft.setCursor(8, startY + i * lineH + 10);

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

  if (wifiConfigMode) {
    IPAddress ip = WiFi.softAPIP();
    int boxY = TFT_HEIGHT - 62;
    tft.fillRect(0, boxY, TFT_WIDTH, 62, ST77XX_BLUE);
    tft.drawRect(0, boxY, TFT_WIDTH, 62, ST77XX_CYAN);
    tft.setTextSize(1);
    tft.setTextColor(ST77XX_WHITE);
    tft.setCursor(8, boxY + 6);
    tft.print("WiFi Config Mode ON");
    tft.setCursor(8, boxY + 20);
    tft.print("SSID: " + String(ap_ssid));
    tft.setCursor(8, boxY + 32);
    tft.print("PASS: " + String(ap_password));
    tft.setCursor(8, boxY + 44);
    tft.print("IP:   " + ip.toString());
  }
}

void displayStatus(bool force) {
  static bool lastBT = !bleKeyboard.isConnected();
  static int lastBatt = -1;
  static int lastCur = -1;
  static bool lastWiFiCfg = !wifiConfigMode;

  bool btNow = bleKeyboard.isConnected();
  int battNow = batteryPercent();

  bool changed = force || (btNow != lastBT) || (abs(battNow - lastBatt) > 2) || (lastCur != currentMacro) || (lastWiFiCfg != wifiConfigMode);

  if (!changed) return;

  drawTopStatus();
  drawMacroTitles();

  lastBT = btNow;
  lastBatt = battNow;
  lastCur = currentMacro;
  lastWiFiCfg = wifiConfigMode;
}

// ---------------- Storage & Web Server ---------------------
// (No changes were made to the storage or web server functions)

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
    macros.push_back("Hello from ESP32 MacroPad!");
    macroNames.push_back("Demo Macro");
  }
  if (currentMacro >= (int)macros.size()) currentMacro = 0;
}

void saveAllMacros() {
  preferences.begin("macropad", false);
  preferences.clear();
  preferences.putInt("totalMacros", macros.size());
  preferences.putInt("currentMacro", currentMacro);
  for (int i = 0; i < (int)macros.size(); i++) {
    preferences.putString(("text_" + String(i)).c_str(), macros[i]);
    preferences.putString(("name_" + String(i)).c_str(), macroNames[i]);
  }
  preferences.end();
}

void setupWebServer() {
  server.on("/", HTTP_GET, []() {
    server.send(200, "text/html", getHTML());
  });
  server.on("/add", HTTP_POST, []() {
    if (server.hasArg("name") && server.hasArg("text")) {
      macros.push_back(server.arg("text"));
      macroNames.push_back(server.arg("name"));
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
    int idx = server.arg("index").toInt() - 1;
    if (idx < 0 || idx >= (int)macros.size()) {
      server.send(400, "text/plain", "Invalid index");
      return;
    }
    macros.erase(macros.begin() + idx);
    macroNames.erase(macroNames.begin() + idx);
    if (currentMacro >= (int)macros.size()) { currentMacro = macros.empty() ? 0 : macros.size() - 1; }
    saveAllMacros();
    server.send(200, "text/plain", "Deleted. Total: " + String(macros.size()));
    displayStatus(true);
  });
  server.on("/list", HTTP_GET, []() {
    DynamicJsonDocument doc(8192);
    JsonArray macroArray = doc.createNestedArray("macros");
    for (int i = 0; i < (int)macros.size(); i++) {
      JsonObject macro = macroArray.createNestedObject();
      macro["index"] = i + 1;
      macro["name"] = macroNames[i];
      macro["text"] = macros[i];
    }
    String json;
    serializeJson(doc, json);
    server.send(200, "application/json", json);
  });
}

String getHTML() {
  return R"rawliteral(
<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>MacroPad Config</title><style>body{font-family:Arial,sans-serif;margin:20px;background:#f0f2f5}.container{max-width:800px;margin:0 auto;background:#fff;padding:24px;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,.08)}h1,h2{margin:0 0 16px}label{font-weight:700}input,textarea{width:100%;padding:10px;margin-bottom:12px;border:1px solid #ddd;border-radius:6px;box-sizing:border-box}button{background:#4CAF50;color:#fff;padding:10px 18px;border:none;border-radius:6px;cursor:pointer;margin-right:8px}button.delete{background:#dc3545}.status{display:none;margin:12px 0;padding:10px;border-radius:6px}.success{display:block;background:#d4edda;color:#155724}.error{display:block;background:#f8d7da;color:#721c24}.item{border-bottom:1px solid #eee;padding:10px 0;display:flex;justify-content:space-between;align-items:center}.name{font-weight:700}.text{color:#666;white-space:pre-wrap;word-break:break-all}</style></head><body><div class="container"><h1>MacroPad Config</h1><div id="status" class="status"></div><form onsubmit="addMacro(event)"><h2>Add New Macro</h2><label>Name</label><input id="name" required placeholder="My Secret Password"><label>Text</label><textarea id="text" required placeholder="The text to type..."></textarea><button type="submit">Add Macro</button></form><h2>Saved Macros</h2><div id="list"></div></div><script>function statusMsg(msg,ok){const el=document.getElementById('status');el.textContent=msg;el.className='status '+(ok?'success':'error');setTimeout(()=>el.className='status',3000)}
function loadAll(){fetch('/list').then(r=>r.json()).then(d=>{const list=document.getElementById('list');list.innerHTML='';d.macros.forEach(m=>{const div=document.createElement('div');div.className='item';div.innerHTML=`<div><div class="name">#${m.index}: ${m.name}</div><div class="text">${m.text}</div></div><button class="delete" onclick="del(${m.index})">Delete</button>`;list.appendChild(div)})})}
function addMacro(e){e.preventDefault();const fd=new FormData();fd.append('name',document.getElementById('name').value);fd.append('text',document.getElementById('text').value);fetch('/add',{method:'POST',body:fd}).then(async r=>{const t=await r.text();if(!r.ok)throw new Error(t);statusMsg(t,!0);document.getElementById('name').value='';document.getElementById('text').value='';loadAll()}).catch(er=>statusMsg('Error: '+er,!1))}
function del(i){if(!confirm('Delete this macro?'))return;const fd=new FormData();fd.append('index',i);fetch('/delete',{method:'POST',body:fd}).then(async r=>{const t=await r.text();if(!r.ok)throw new Error(t);statusMsg(t,!0);loadAll()}).catch(er=>statusMsg('Error: '+er,!1))}
loadAll();</script></body></html>)rawliteral";
}

```