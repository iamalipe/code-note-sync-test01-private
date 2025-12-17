0.91" OLED → ESP32 38Pin CP2102

- GND → ESP32 GND pin
- VCC → ESP32 3V3 pin (try VIN if 3V3 doesn't work)
- SCK → ESP32 GPIO 22
- SDA → ESP32 GPIO 23

##  I2C Scanner to Verify Device
```cpp
#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>
#include <Wire.h>
// Display settings for 0.91" OLED (128x32)
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 32
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3D // Try 0x3C if this doesn't work
// NEW PIN DEFINITIONS - avoiding GPIO 22, 23
#define OLED_SDA 17 // Changed from GPIO 23
#define OLED_SCL 16 // Changed from GPIO 22
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
Serial.begin(115200);
Serial.println("Testing 0.91 OLED with GPIO 16,17");
// Initialize I2C with NEW pins
Wire.begin(OLED_SDA, OLED_SCL); // SDA=17, SCL=16
// Try to initialize display
if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
Serial.println("SSD1306 0x3D failed, trying 0x3C...");
if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
Serial.println("Both addresses failed - check wiring!");
for(;;);
} else {
Serial.println("Found display at 0x3C");
}
} else {
Serial.println("Found display at 0x3D");
}
// Test display
display.clearDisplay();
display.setTextSize(1);
display.setTextColor(SSD1306_WHITE);
display.setCursor(0, 0);
display.println("New Pins Test");
display.setCursor(0, 10);
display.println("SCL:16 SDA:17");
display.setCursor(0, 20);
display.println("MacroPad Ready!");
display.display();
Serial.println("OLED test completed successfully!");
}

void loop() {
// Animation test
for(int i = 0; i < 128; i++) {
display.drawPixel(i, 31, SSD1306_WHITE);
display.display();
delay(20);
}
delay(500);
display.drawLine(0, 31, 127, 31, SSD1306_BLACK);
display.display();
delay(500);
}

```


## Button Push Test
```cpp
// Define the GPIO pin for the push button
const int buttonPin = 4;

// Define the GPIO pin for the built-in LED
const int ledPin = 2;

// Debouncing variables
const long debounceDelay = 50; // The delay time in milliseconds; adjust as needed
long lastDebounceTime = 0;     // The last time the button state was toggled
int lastButtonState = HIGH;    // The previous state of the button
int buttonState = HIGH;        // The current, debounced button state

void setup() {
  Serial.begin(115200);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
  Serial.println("ESP32 Button and LED Ready with Debouncing!");
}

void loop() {
  // Read the state of the button (without debouncing)
  int reading = digitalRead(buttonPin);

  // If the reading changes from the last state, we've had a bounce or a press
  if (reading != lastButtonState) {
    // Reset the debounce timer
    lastDebounceTime = millis();
  }

  // Check if enough time has passed since the last change
  if ((millis() - lastDebounceTime) > debounceDelay) {
    // Now, if the button state has changed for more than the delay, we consider it a stable press
    if (reading != buttonState) {
      buttonState = reading;

      // If the button is now LOW, it's a confirmed press
      if (buttonState == LOW) {
        Serial.println("Button Pressed!"); // Print to Serial Monitor
        
        // Blink the built-in LED
        digitalWrite(ledPin, HIGH); // Turn LED ON
        delay(100);                 // Wait
        digitalWrite(ledPin, LOW);  // Turn LED OFF
      }
    }
  }

  // Save the current reading for the next loop iteration
  lastButtonState = reading;
}```


## Display Test
```cpp
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

Adafruit_SSD1306 display(128, 32, &Wire, -1);

void setup() {
  Wire.begin(21, 22);  // SDA=21, SCL=22 for ESP32
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.print("Test Display");
  display.display();
}

void loop() {}

```


## Display Scanner
```cpp
#include <Wire.h>

void setup() {
  Wire.begin(21, 22);  // Set your SDA and SCL pins
  Serial.begin(115200);
  Serial.println("\nI2C Scanner");
}

void loop() {
  byte error, address;
  int nDevices = 0;

  Serial.println("Scanning...");

  for(address = 1; address < 127; address++ ) {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();

    if (error == 0) {
      Serial.print("I2C device found at address 0x");
      if (address < 16)
        Serial.print("0");
      Serial.println(address, HEX);
      nDevices++;
    } else if (error == 4) {
      Serial.print("Unknown error at address 0x");
      if (address < 16)
        Serial.print("0");
      Serial.println(address, HEX);
    }
  }

  if (nDevices == 0)
    Serial.println("No I2C devices found\n");
  else
    Serial.println("done\n");

  delay(5000);
}```


WeAct Studio 1.54 Inch Epaper Display Screen Module SPI Black-White
Waveshare 1.54 inch e-Ink Paper Display Module with SPI Interface
2.4-inch SPI Interface 240×320 TFT Display Module
LCD1602 Parallel LCD Display with Blue Backlight


```cpp
// Working TEST with Arduino Uno R3
// 128x32 I2C SSD1306 (UNO: SDA=A4, SCL=A5)


#include <Wire.h>
#include <U8g2lib.h>

// 128x32 I2C SSD1306 (UNO: SDA=A4, SCL=A5)
U8G2_SSD1306_128X32_UNIVISION_F_HW_I2C u8g2(
  U8G2_R0, U8X8_PIN_NONE, A5, A4);

void setup() {
  Wire.begin();
  u8g2.setI2CAddress(0x3C * 2);  // U8g2 uses 8-bit address
  u8g2.begin();

  // Draw static header once
  u8g2.clearBuffer();
  u8g2.setFont(u8g2_font_6x10_mf);
  u8g2.drawStr(0, 10, "U8g2 Test @0x3C");
  u8g2.drawHLine(0, 12, 128);
  u8g2.drawStr(0, 22, "UNO R3 I2C OK");
  u8g2.sendBuffer();
}

void loop() {
  // Small, smooth animation at bottom area (no full-screen clear)
  static int x = 0, dir = 1;

  // Erase only a small region
  u8g2.setDrawColor(0);         // erase mode
  u8g2.drawBox(0, 24, 128, 8);  // clear bar area
  u8g2.setDrawColor(1);         // draw mode

  // Draw moving bar within y=24..31
  u8g2.drawBox(x, 26, 10, 4);
  u8g2.sendBuffer();

  x += dir;
  if (x > 117) dir = -1;
  if (x < 0) dir = 1;

  delay(16);  // ~60fps
}
```