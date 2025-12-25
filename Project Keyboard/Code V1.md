```cpp

#include <BleKeyboard.h>
#include <WiFi.h>
#include <WebServer.h>
#include <Preferences.h>
#include <ArduinoJson.h>
#include <vector>

BleKeyboard bleKeyboard("MacroPad", "ESP32", 100);

// WiFi Access Point
const char* ap_ssid = "MacroPad_Config";
const char* ap_password = "12345678";
WebServer server(80);
Preferences preferences;

// Button pins
const int BUTTON_1 = 18; // Next macro
const int BUTTON_2 = 19; // Previous macro  
const int BUTTON_3 = 21; // Run macro

// Dynamic macro storage
std::vector<String> macros;
std::vector<String> macroNames;
int currentMacro = 0;
int maxMacros = 1000; // Soft limit to prevent memory issues

// Button states
unsigned long lastButtonPress = 0;
bool button3Held = false;
unsigned long button3PressStart = 0;

void setup() {
  Serial.begin(115200);
  
  // Initialize buttons
  pinMode(BUTTON_1, INPUT_PULLUP);
  pinMode(BUTTON_2, INPUT_PULLUP);
  pinMode(BUTTON_3, INPUT_PULLUP);
  
  // Initialize preferences and load macros
  preferences.begin("macropad", false);
  loadAllMacros();
  
  // Start Bluetooth keyboard
  Serial.println("Starting BLE Keyboard...");
  bleKeyboard.begin();
  
  // Start WiFi AP and web server
  setupWebServer();
  
  Serial.println("MacroPad Ready!");
  Serial.printf("Loaded %d macros\n", macros.size());
  if (macros.size() > 0) {
    Serial.printf("Current macro: %s\n", macros[currentMacro].c_str());
  }
}

void loop() {
  server.handleClient();
  handleButtons();
  delay(50);
}

void handleButtons() {
  // Button 1: Next macro
  if (digitalRead(BUTTON_1) == LOW && millis() - lastButtonPress > 300) {
    lastButtonPress = millis();
    nextMacro();
  }
  
  // Button 2: Previous macro
  if (digitalRead(BUTTON_2) == LOW && millis() - lastButtonPress > 300) {
    lastButtonPress = millis();
    previousMacro();
  }
  
  // Button 3: Run macro or hold for pairing
  if (digitalRead(BUTTON_3) == LOW) {
    if (!button3Held) {
      button3PressStart = millis();
      button3Held = true;
    }
    
    if (millis() - button3PressStart > 3000) {
      enterPairingMode();
      button3Held = false;
    }
  } else if (button3Held) {
    if (millis() - button3PressStart < 3000) {
      runCurrentMacro();
    }
    button3Held = false;
  }
}

void nextMacro() {
  if (macros.size() > 0) {
    currentMacro = (currentMacro + 1) % macros.size();
    Serial.printf("Next macro (%d/%d): %s\n", currentMacro + 1, macros.size(), 
                  macroNames[currentMacro].c_str());
    preferences.putInt("currentMacro", currentMacro);
  }
}

void previousMacro() {
  if (macros.size() > 0) {
    currentMacro = (currentMacro - 1 + macros.size()) % macros.size();
    Serial.printf("Previous macro (%d/%d): %s\n", currentMacro + 1, macros.size(), 
                  macroNames[currentMacro].c_str());
    preferences.putInt("currentMacro", currentMacro);
  }
}

void runCurrentMacro() {
  if (bleKeyboard.isConnected() && macros.size() > 0 && macros[currentMacro].length() > 0) {
    Serial.printf("Running macro: %s\n", macroNames[currentMacro].c_str());
    bleKeyboard.print(macros[currentMacro]);
    Serial.println("Macro executed!");
  } else if (!bleKeyboard.isConnected()) {
    Serial.println("Bluetooth not connected!");
  } else {
    Serial.println("No macros available!");
  }
}

void enterPairingMode() {
  Serial.println("Entering Bluetooth pairing mode...");
}

void loadAllMacros() {
  // Clear existing macros
  macros.clear();
  macroNames.clear();
  
  // Load total count
  int totalMacros = preferences.getInt("totalMacros", 0);
  currentMacro = preferences.getInt("currentMacro", 0);
  
  Serial.printf("Loading %d macros from storage...\n", totalMacros);
  
  // Load each macro
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
  
  // Ensure currentMacro is valid
  if (currentMacro >= macros.size() && macros.size() > 0) {
    currentMacro = 0;
  }
  
  Serial.printf("Successfully loaded %d macros\n", macros.size());
}

void saveAllMacros() {
  Serial.printf("Saving %d macros to storage...\n", macros.size());
  
  // Save total count
  preferences.putInt("totalMacros", macros.size());
  preferences.putInt("currentMacro", currentMacro);
  
  // Save each macro
  for (int i = 0; i < macros.size(); i++) {
    String textKey = "text_" + String(i);
    String nameKey = "name_" + String(i);
    
    preferences.putString(textKey.c_str(), macros[i]);
    preferences.putString(nameKey.c_str(), macroNames[i]);
  }
  
  Serial.println("All macros saved successfully!");
}

int addMacro(String name, String text) {
  if (macros.size() >= maxMacros) {
    Serial.println("Maximum macro limit reached!");
    return -1;
  }
  
  macros.push_back(text);
  macroNames.push_back(name);
  
  saveAllMacros();
  
  Serial.printf("Added macro #%d: %s\n", macros.size(), name.c_str());
  return macros.size() - 1;
}

bool deleteMacro(int index) {
  if (index >= 0 && index < macros.size()) {
    Serial.printf("Deleting macro #%d: %s\n", index + 1, macroNames[index].c_str());
    
    macros.erase(macros.begin() + index);
    macroNames.erase(macroNames.begin() + index);
    
    // Adjust current macro index
    if (currentMacro >= macros.size() && macros.size() > 0) {
      currentMacro = macros.size() - 1;
    } else if (macros.size() == 0) {
      currentMacro = 0;
    }
    
    saveAllMacros();
    return true;
  }
  return false;
}

void setupWebServer() {
  WiFi.softAP(ap_ssid, ap_password);
  IPAddress IP = WiFi.softAPIP();
  
  Serial.printf("WiFi AP: %s\n", ap_ssid);
  Serial.printf("Visit: http://%s\n", IP.toString().c_str());
  
  // Main page
  server.on("/", HTTP_GET, []() {
    server.send(200, "text/html", getHTML());
  });
  
  // Add macro API
  server.on("/add", HTTP_POST, []() {
    if (server.hasArg("name") && server.hasArg("text")) {
      String name = server.arg("name");
      String text = server.arg("text");
      
      int index = addMacro(name, text);
      if (index >= 0) {
        server.send(200, "text/plain", "Macro added successfully! Total: " + String(macros.size()));
      } else {
        server.send(400, "text/plain", "Failed to add macro (memory limit reached)");
      }
    } else {
      server.send(400, "text/plain", "Missing parameters");
    }
  });
  
  // Delete macro API
  server.on("/delete", HTTP_POST, []() {
    if (server.hasArg("index")) {
      int index = server.arg("index").toInt() - 1; // Convert to 0-based
      
      if (deleteMacro(index)) {
        server.send(200, "text/plain", "Macro deleted successfully! Total: " + String(macros.size()));
      } else {
        server.send(400, "text/plain", "Invalid macro index");
      }
    } else {
      server.send(400, "text/plain", "Missing index parameter");
    }
  });
  
  // List all macros API
  server.on("/list", HTTP_GET, []() {
    DynamicJsonDocument doc(8192); // Larger buffer for more macros
    
    doc["current"] = currentMacro + 1;
    doc["total"] = macros.size();
    doc["maxMacros"] = maxMacros;
    
    JsonArray macroArray = doc.createNestedArray("macros");
    for (int i = 0; i < macros.size(); i++) {
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
  
  // Get current macro API
  server.on("/current", HTTP_GET, []() {
    DynamicJsonDocument doc(1024);
    
    if (macros.size() > 0) {
      doc["current"] = currentMacro + 1;
      doc["total"] = macros.size();
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
  
  // Memory status API
  server.on("/memory", HTTP_GET, []() {
    DynamicJsonDocument doc(512);
    
    size_t totalSize = 0;
    for (const String& macro : macros) {
      totalSize += macro.length();
    }
    
    doc["totalMacros"] = macros.size();
    doc["maxMacros"] = maxMacros;
    doc["totalTextSize"] = totalSize;
    doc["averageSize"] = macros.size() > 0 ? totalSize / macros.size() : 0;
    doc["freeHeap"] = ESP.getFreeHeap();
    doc["totalHeap"] = ESP.getHeapSize();
    
    String json;
    serializeJson(doc, json);
    server.send(200, "application/json", json);
  });
  
  server.begin();
}

String getHTML() {
  return R"rawliteral(
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MacroPad - Unlimited Storage</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f0f2f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; margin-bottom: 30px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .stat-box { background: #f8f9fa; padding: 15px; border-radius: 6px; text-align: center; border-left: 4px solid #4CAF50; }
        .stat-number { font-size: 24px; font-weight: bold; color: #4CAF50; }
        .stat-label { font-size: 14px; color: #666; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; font-weight: bold; color: #555; }
        input, textarea { width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; box-sizing: border-box; }
        textarea { min-height: 100px; resize: vertical; font-family: monospace; }
        button { background: #4CAF50; color: white; padding: 12px 30px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin: 5px; }
        button:hover { background: #45a049; }
        .delete-btn { background: #dc3545; }
        .delete-btn:hover { background: #c82333; }
        .macro-list { max-height: 400px; overflow-y: auto; border: 1px solid #ddd; border-radius: 6px; margin-top: 20px; }
        .macro-item { padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .macro-item:last-child { border-bottom: none; }
        .macro-info { flex: 1; }
        .macro-name { font-weight: bold; margin-bottom: 5px; }
        .macro-text { font-size: 14px; color: #666; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .status { padding: 10px; margin: 10px 0; border-radius: 4px; display: none; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>
    <div class="container">
        <h1>MacroPad - Unlimited Storage</h1>
        
        <div class="stats" id="stats">
            <div class="stat-box">
                <div class="stat-number" id="totalMacros">-</div>
                <div class="stat-label">Total Macros</div>
            </div>
            <div class="stat-box">
                <div class="stat-number" id="currentIndex">-</div>
                <div class="stat-label">Current Macro</div>
            </div>
            <div class="stat-box">
                <div class="stat-number" id="memoryUsed">-</div>
                <div class="stat-label">Memory Used</div>
            </div>
            <div class="stat-box">
                <div class="stat-number" id="freeHeap">-</div>
                <div class="stat-label">Free Memory</div>
            </div>
        </div>
        
        <form onsubmit="addMacro(event)">
            <div class="form-group">
                <label for="name">Macro Name:</label>
                <input type="text" id="name" placeholder="Enter macro name..." required>
            </div>
            
            <div class="form-group">
                <label for="text">Text to Type:</label>
                <textarea id="text" placeholder="Enter the text you want the macro pad to type..." required></textarea>
            </div>
            
            <button type="submit">Add Macro</button>
            <button type="button" onclick="loadMacros()">Refresh List</button>
        </form>
        
        <div id="status" class="status"></div>
        
        <div id="macroList" class="macro-list"></div>
    </div>

    <script>
        function loadMacros() {
            fetch('/list')
                .then(response => response.json())
                .then(data => {
                    updateStats(data);
                    displayMacros(data.macros);
                })
                .catch(error => console.error('Error:', error));
            
            fetch('/memory')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('memoryUsed').textContent = formatBytes(data.totalTextSize);
                    document.getElementById('freeHeap').textContent = formatBytes(data.freeHeap);
                })
                .catch(error => console.error('Error:', error));
        }
        
        function updateStats(data) {
            document.getElementById('totalMacros').textContent = data.total;
            document.getElementById('currentIndex').textContent = data.current + '/' + data.total;
        }
        
        function displayMacros(macros) {
            const list = document.getElementById('macroList');
            list.innerHTML = '';
            
            macros.forEach(macro => {
                const div = document.createElement('div');
                div.className = 'macro-item';
                div.innerHTML = `
                    <div class="macro-info">
                        <div class="macro-name">#${macro.index}: ${macro.name}</div>
                        <div class="macro-text">${macro.text} (${macro.length} chars)</div>
                    </div>
                    <button class="delete-btn" onclick="deleteMacro(${macro.index})">🗑️ Delete</button>
                `;
                list.appendChild(div);
            });
        }
        
        function addMacro(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const text = document.getElementById('text').value;
            
            const formData = new FormData();
            formData.append('name', name);
            formData.append('text', text);
            
            fetch('/add', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                showStatus(data, 'success');
                document.getElementById('name').value = '';
                document.getElementById('text').value = '';
                loadMacros();
            })
            .catch(error => {
                showStatus('Error adding macro: ' + error, 'error');
            });
        }
        
        function deleteMacro(index) {
            if (confirm('Delete this macro?')) {
                const formData = new FormData();
                formData.append('index', index);
                
                fetch('/delete', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    showStatus(data, 'success');
                    loadMacros();
                })
                .catch(error => {
                    showStatus('Error deleting macro: ' + error, 'error');
                });
            }
        }
        
        function showStatus(message, type) {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = 'status ' + type;
            status.style.display = 'block';
            setTimeout(() => status.style.display = 'none', 5000);
        }
        
        function formatBytes(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        }
        
        // Load macros on page load
        loadMacros();
        
        // Auto-refresh every 30 seconds
        setInterval(loadMacros, 30000);
    </script>
</body>
</html>
)rawliteral";
}


```

