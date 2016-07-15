'use strict';

var device = require('azure-iot-device');

var connectionString = 'HostName=HOST.azure-devices.net;DeviceId=DEVID;SharedAccessKey=KEY';

// Define the protocol that will be used to send messages to Azure IoT Hub
// For this lab we will use AMQP over Web Sockets.
// If you want to use a different protocol, comment out the protocol you want to replace, 
// and uncomment one of the other transports.
var Protocol = require('azure-iot-device-amqp-ws').AmqpWs;
// var Protocol = require('azure-iot-device-amqp').Amqp;
// var Protocol = require('azure-iot-device-http').Http;
// var Protocol = require('azure-iot-device-mqtt').Mqtt;

// Define the client object that communicates with Azure IoT Hubs
var Client = require('azure-iot-device').Client;
// Define the message object that will define the message format going into Azure IoT Hubs
var Message = require('azure-iot-device').Message;
// Create the client instanxe that will manage the connection to your IoT Hub
// The client is created in the context of an Azure IoT device.
var client = Client.fromConnectionString(connectionString, Protocol);
// Extract the Azure IoT Hub device ID from the connection string 
// (this may not be the same as the Photon device ID)
var deviceId = device.ConnectionString.parse(connectionString).DeviceId;

client.open(function (err) {
    console.log("Azure IoT connection open...");

    if (err) {
        // If there is a connection error, show it
        throw new Error("Could not connect: " + err.message)
    } else {
        // If the client gets an error, handle it
        client.on('error', function (err) {
            throw new Error(err.message)
        });
    }
});

module.exports = {
    handleData: function (payload) {
        // Create the message based on the payload JSON
        var message = new Message(payload);
        // For debugging purposes, write out the message payload to the console
        console.log("Sending message: " + message.getData());
        // Send the message to Azure IoT Hub
        client.sendEvent(message, printResultFor('send'));
    }
};

// Helper function to print results in the console
function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
    };
}