#include <WiFi.h>
#include "OOCSI.h"

// 1. Local Wi-Fi credentials
const char* ssid = "your_wifi_name";//please insert your wifi name(ssid)
const char* password = "your_wifi_password";//please insert your wifi password

// 2. OOCSI Network Handles
const char* oocsiServer = "oocsi.id.tue.nl"; 
const char* clientName = "your_client_name"; //please replace to your client name   
const char* channelName = "OOCSI-things/yourchannel"; //please replace to your channel

OOCSI oocsi = OOCSI();

// The metal plate is wired to this pin, and the needle is wired to GND
const int needlePin = 4; //please change the pin code if you didn't wire ar 4  
bool lastState = false;

void setup() {
  Serial.begin(115200);
  
  // Activates the internal pull-up resistor to keep the plate HIGH by default
  pinMode(needlePin, INPUT_PULLUP);
  
  Serial.println("\nConnecting to Wi-Fi...");
  
  // Automatically handles both the Wi-Fi and OOCSI server connections
  oocsi.connect(clientName, oocsiServer, ssid, password);
  Serial.println("OOCSI connection completed!");
}

void loop() {
  // Reads LOW when the needle touches the plate (completing the ground circuit)
  bool isTouching = (digitalRead(needlePin) == LOW);

  if (isTouching != lastState) {
    
    // Initialize a new standard message on your team channel
    oocsi.newMessage(channelName);
    
    // Package the true/false state under the "lampo_toggle" key
    oocsi.addBool("lampo_toggle", isTouching);
    
    // Broadcast the raw data payload
    oocsi.sendMessage();

    // Print to the Serial Monitor for local debugging
    Serial.println(isTouching ? "Needle Touching: true -> Lamp ON" : "Needle Released: false -> Lamp OFF");
    
    lastState = isTouching;
    delay(50); // Increased debounce delay for bare metal contact
  }

  // Required to maintain the network connection
  oocsi.check();
}
