
const mqtt = require('mqtt');
const converter = require('utf8-string-bytes')
// import { utf8ByteArrayToString, stringToUtf8ByteArray } from 'utf8-string-bytes';

// mqtt
var options = {
    port: 1883,
    host: 'mqtt://3.80.11.175',
    username: 'geomeo',
    password: '12345'
};

exports.getDeviceStatus = (req, res) => {
    let client = mqtt.connect("mqtt://3.80.11.175", options);
    client.on('connect', function () {
        client.subscribe(req.body.topic);
    })

    client.on('message', (topic, message) => {
        return res.json({ message: JSON.parse(converter.utf8ByteArrayToString(message)) });
    })
}

exports.getAllDevices = async (req, res) => {
    let client = mqtt.connect("mqtt://3.80.11.175", options);
    let devices = [];
    client.on('connect', function () {
        client.subscribe('#');
    })

    client.on('message', (topic, message) => {
        devices.push({ topic: topic, message: message });
    })

    setTimeout(() => {
        return res.json(devices);
    }, 3000);

}

exports.switchState = (req, res) => {
    let client = mqtt.connect("mqtt://3.80.11.175", options);
    client.on('connect', function () {
        client.publish(req.body.topic, JSON.stringify(req.body), (topic, message) => {
            return res.json({ topic: topic, message: message });
        })
    })
}