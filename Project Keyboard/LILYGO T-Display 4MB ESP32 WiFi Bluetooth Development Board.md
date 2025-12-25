# LILYGO T-Display 4MB ESP32 WiFi Bluetooth Development Board

LILYGO ESP32 WiFi and Bluetooth Development Board with 1.14″ LCD Display
ESP32-D0WDQ6 Wifi Module
Based on ESP32 240MHz Xtensa dual-core 32-bit microprocessor
Operating Voltage: 2.7V – 4.2V
Working Current: 60mA
Battery Charging Current: 500mA


```
// ---- User pins (adjust to match your LILYGO variant) ----
#define TFT_MOSI 19
#define TFT_SCLK 18
#define TFT_CS   5
#define TFT_DC   16
#define TFT_RST  23
#define TFT_BL   4

// Panel geometry
#define TFT_WIDTH   135
#define TFT_HEIGHT  240

// Common offsets for 1.14" 135x240 ST7789:
// Try (52,40), (53,40), or (0,0)
#define TFT_COL_OFFSET 52
#define TFT_ROW_OFFSET 40
```

Hold middle button for 5 sec to turn BT to paring mode
Hold left and right button for 5 sec to toggle wifi config mode.
Display SSID name and password and ip for wifi config mode.

Add Display support to show this
`
Conected Status --------- Battery Status
Password position 1 (show title)
Password position 2 (show title)
Password position 2 (show title)
`