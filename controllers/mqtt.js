
const mqtt = require('mqtt');

// mqtt
var options = {
    port: 1883,
    host: 'mqtt://3.80.11.175',
    username: 'geomeo',
    password: '12345'
};


exports.getDeviceStatus = (req, res) => {
    var client = mqtt.connect("mqtt://3.80.11.175", options);
    client.on('connect', function () {
        client.subscribe(req.body.topic);
    })

    client.on('message', (topic, message) => {
        return res.json({topic: topic, message: message});
    })
}