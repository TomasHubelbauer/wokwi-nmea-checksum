# Wokwi NMEA Checksum

Testing out the Wokwi Arduino simulator by running my NMEA checksum sketch on
it.

`nmea-checksum.ino` is the Arduino source code. The two HEX files were obtained
by going to the Arduino IDE, pasting the sketch code in and pressing Sketch >
Export Compiled Binary and then Sketch > Show Sketch Folder. After the compile,
the two HEX files appear there.

## To-Do

### Figure out why the USART is not being called at all

The program output is empty with either of the files.

https://stackblitz.com/edit/avr8js-serial and
https://blog.wokwi.com/avr8js-simulate-arduino-in-javascript should help.
