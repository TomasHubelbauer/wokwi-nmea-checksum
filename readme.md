# Wokwi NMEA Checksum

Testing out the Wokwi Arduino simulator by running my NMEA checksum sketch on
it.

## To-Do

### Use this in my repository `arduino-nmean-checksum` instead of SimAVR

### Use a `git diff` in the GitHub Actions workflow to assert expected match

`nmea-checksum.uart` is the generated serial and `git diff` should give a zero
exit code of it and a control file match and error if they don't, which will be
ideal for the CI log output.

### Try to use Arduino Builder to compile the sketch to HEX in the CI

It would be great to have a fallback in case `https://hexi.wokwi.com/build` is
down or ceases to exist, Arduino Builder GitHub Actions should be able to fill
this current gap.
