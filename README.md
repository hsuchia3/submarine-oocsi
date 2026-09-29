"submarine-oocsi" contains an interactive interface with the mouse pressed and a toggle switch from the OOCSI for Design Connected Experience course at TU/e (DBSU10).

- The interface is created by p5.js, the user can press the mouse button on the window and light it up,  releasing the mouse to turn off the light.
- It can also be connected to different electronic devices and operate together as long as the user succefully connect to the correct channel on OOCSI.
- The physical device is an ESP32, connected with a button or any two-position switch.

The version of:
- p5.js: 1.9.0
- Arduino IDE: 2.3.10
- OOCSI Library: 1.6.0

REMINDER


Please replace the words in these two files:
- interface/sketch.js:
  1. clientName (eg: submarine_interface)
  2. OOCSI-things/yourchannel (eg: OOCSI-things/team20)
- esp/submarine_toggle.ino:
  1. your_wifiname
  2. your_wifipassword 
  3. your_client_name (eg: esp32_toggle)
  4. OOCSI-things/yourchannel (eg: OOCSI-things/team20)


There are two folders containing two devices:

esp: connect to an ESP device with a switch or a button, and this file can be driven in the Arduino IDE (Please ensure that your Arduino IDE has imported OOCSI library already)
- submarine_toggle.ino: main code to trigger the toggle switch from ESP.


interface: connect to electronic devices(laptop, phone...)
- sketch: main sketch for subscribe oosci channel and sunmarine pattern.
- oosci-web.min.js: oosci library was been import.
- p5.js: the library which was been import.
- index.html
- style.css

Last updated:
29/09/2026
DCE | Team 12
