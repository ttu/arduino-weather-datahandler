# Arduino WeatherShield Data Handler

Get data from Arduino Weather Shield using Johnny Five

Handlers decide what to do when new data is receieved from the Weather Shield.
* handlerLocalHttp is for serving data with local http server 
    * Can be used with e.g. [Home Assistant](https://home-assistant.io/)
* handlerPrint is for debugging
* handlerAzure is for sending data to Azure IoT Hub

Set correct handler to `./src/app.js` and run:
```
npm start
```

### Links
http://thinglabs.vjrantal.net/workshop/js/weather/

https://github.com/ThingLabsIo/IoTLabs/tree/master/Arduino/