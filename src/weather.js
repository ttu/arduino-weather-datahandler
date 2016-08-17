// https://github.com/ThingLabsIo/IoTLabs/tree/master/Arduino/Weather
'use strict';

// Define the objects you will be working with
var five = require("johnny-five");
var Shield = require("j5-sparkfun-weather-shield")(five);

// location is simply a string that you can filter on later
var location = 'Home';
var deviceId = "Arduino I";
console.log("Device ID: " + deviceId);

// Create a Johnny-Five board instance to represent your Particle Photon
// Board is simply an abstraction of the physical hardware, whether is is a 
// Photon, Arduino, Raspberry Pi or other boards. 
var board = new five.Board();

/*
// You may optionally specify the port by providing it as a property
// of the options object parameter. * Denotes system specific 
// enumeration value (ie. a number)
// OSX
new five.Board({ port: "/dev/tty.usbmodem****" });
// Linux
new five.Board({ port: "/dev/ttyUSB*" });
// Windows
new five.Board({ port: "COM*" });
*/

module.exports = function (dataHandler) {
    // The board.on() executes the anonymous function when the 
    // board reports back that it is initialized and ready.
    board.on("ready", function () {
        console.log("Board connected...");

        // The SparkFun Weather Shield has two sensors on the I2C bus - 
        // a humidity sensor (HTU21D) which can provide both humidity and temperature, and a 
        // barometer (MPL3115A2) which can provide both barometric pressure and humidity.
        // Controllers for these are wrapped in a convenient plugin class:
        var weather = new Shield({
            variant: "ARDUINO", // or PHOTON
            freq: 1000,         // Set the callback frequency to 1-second
            elevation: 40      // Go to http://www.WhatIsMyElevation.com to get your current elevation
        });

        // The weather.on("data", callback) function invokes the anonymous callback function 
        // whenever the data from the sensor changes (no faster than every 25ms). The anonymous 
        // function is scoped to the object (e.g. this == the instance of Weather class object). 
        weather.on("data", function () {
            var payload = JSON.stringify({
                deviceId: deviceId,
                location: location,
                // celsius & fahrenheit are averages taken from both sensors on the shield
                celsius: this.celsius,
                fahrenheit: this.fahrenheit,
                relativeHumidity: this.relativeHumidity,
                pressure: this.pressure,
                feet: this.feet,
                meters: this.meters,
                light: this.lightLevel
            });

            dataHandler.handleData(payload);
        });
    });
};
