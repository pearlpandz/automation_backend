
const mqtt = require('mqtt');
const converter = require('utf8-string-bytes');
const { mqtt_options } = require('./../config/config');
// import { utf8ByteArrayToString, stringToUtf8ByteArray } from 'utf8-string-bytes';

// mqtt
var options = mqtt_options;

exports.getDeviceStatus = (req, res) => {
    let client = mqtt.connect(options.host, options);
    client.on('connect', function () {
        client.subscribe(req.body.topic);
    })

    client.on('message', (topic, message) => {
        return res.json({ message: JSON.parse(converter.utf8ByteArrayToString(message)) });
    })
}

exports.getAllDevices = async (req, res) => {
    let client = mqtt.connect(options.host, options);
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

    let client = mqtt.connect(options.host, options);
    let body = {
        type: "Gang_box",  // box type,
        id: req.body.boxId, // box id
        topic: `rpi/sw${req.body.switchId}`, // `rpi/sw${switchId}` - switch id
        value: req.body.value // status of the appliance
    }

    console.log(body);

    client.on('connect', function () {
        client.publish(body.topic, JSON.stringify(body), (err, result) => {
            if (err) {
                return res.json({ err, result, message: "error", error: err, result: result });
            } else {
                return res.json({ err, result, message: "success", error: err, result: result });
            }
        })
    })
    // client.subscribe(req.body.topic, (topic, message) => {
    //     return res.json({ topic: topic, message: message });
    // })
}