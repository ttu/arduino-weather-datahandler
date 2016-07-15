# Arduino WeatherShield Data Handler

NOTE: Doesn't work with Node 6.x, but works at least with 5.3.

Get data from Arduino Weather Shield using Johnny Five

Handlers:
* handlerLocalHttp is for serving data with local http server (used for [Home Assistant](https://home-assistant.io/))
* handlerPrint for debugging
* handlerAzure is for sending data to Azure IoT Hub

Set correct handler to app.js and start:
```
node app.js
```

### Links
http://thinglabs.vjrantal.net/workshop/js/weather/

https://github.com/ThingLabsIo/IoTLabs/tree/master/Arduino/