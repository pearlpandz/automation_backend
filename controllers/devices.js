let mysql = require('mysql');
const moment = require('moment');
const mqtt = require('mqtt');
const { config, mqtt_options } = require('./../config/config');

// mqtt
var options = mqtt_options;

// let connection = mysql.createConnection(config);
let pool = mysql.createPool(config);

exports.list = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql = `call iot.room_devices_list(${req.params.id})`;
            connection.query(sql, true, (error, results, fields) => {
                connection.release();
                if (error) {
                    return res.status(400).send({ message: error.message });
                }
                return res.status(200).send({ data: results[0] });
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

exports.basedeviceslist = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql = `call iot.devices_activelist()`;
            connection.query(sql, true, (error, results, fields) => {
                connection.release();
                if (error) {
                    return res.status(400).send({ message: error.message });
                }
                return res.status(200).send({ data: results[0] });
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

exports.add = function (req, res) {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                success: false,
                message: 'Device Name is required',
            });
        } else if (!req.body.baseDeviceId) {
            return res.status(400).send({
                success: false,
                message: 'Base Device Id is required',
            });
        } else if (!req.body.roomId) {
            return res.status(400).send({
                success: false,
                message: 'Room Id is required',
            });
        } else if (!req.body.switchNo) {
            return res.status(400).send({
                success: false,
                message: 'Switch No is required',
            });
        } else {

            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let sql = `call iot.room_device_create('${req.body.name}', '0', '${req.body.baseDeviceId}', '${req.body.roomId}', '${req.body.switchNo}');`;
                connection.query(sql, true, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send({ message: error.message });
                    }
                    return res.status(200).send({ message: 'Device added successflly!' });
                });
            });
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

exports.bulkAdd = function (req, res) {
    try {
        let arr = req.body;
        let values = '';
        for (let i = 0; i < arr.length; i++) {
            values += `('0','${arr[i].surname}','0','${arr[i].refId}','${arr[i].roomId}', '${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')}','1','0')`;
            if (i != arr.length - 1) {
                values += ','
            }
        }
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql = `insert into iot.rooms_devices values${values}`;
            connection.query(sql, true, (error, results, fields) => {
                connection.release();
                if (error) {
                    return res.status(400).send(error.message);
                }
                return res.status(200).send({ message: 'Devices successfully added' });
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

exports.update = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql = `call iot.room_device_update('${req.params.id}','${req.body.name}','${req.body.baseDeviceId}')`;
            connection.query(sql, true, (error, results, fields) => {
                connection.release();
                if (error) {
                    return res.status(400).send({ message: error.message });
                }
                return res.status(200).send({ message: 'Device information updated!' });
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

exports.statusUpdate = function (req, res) {
    try {
        let client = mqtt.connect(options.host, options);
        let body = {
            type: "Gang_box",  // box type,
            id: req.body.boxId, // box id
            topic: `rpi/sw${req.body.switchNo}`, // `rpi/sw${switchNo}` - Switch No
            value: req.body.status // status of the appliance
        }

        client.on('error', err => {
            client.end();
            return res.status(500).send(err);
        });

        client.on('connect', function () {
            console.log('in connection')
            client.publish(body.topic, JSON.stringify(body), (err, result) => {
                console.log('in publish')
                if (err) {
                    console.log('in error')
                    return res.json({ err, result, message: "error", error: err, result: result });
                } else {
                    console.log('in success')
                    console.log({ err, result, message: "error", error: err, result: result });

                    pool.getConnection(function (err, connection) {
                        if (err) {
                            console.log('in pool error')
                            return res.status(500).send(err); // not connected!
                        }

                        // Use the connection
                        let sql = `call iot.room_device_statusUpdate('${req.body.status}','${req.body.speed}','${req.params.id}')`;
                        connection.query(sql, true, (error, results, fields) => {
                            connection.release();
                            if (error) {
                                console.log('error');
                                return res.status(400).send({ message: 'test ' + error.message });
                            }
                            console.log('success');
                            return res.status(200).send({ message: 'Device information updated!', data: results });
                        });
                    });
                }
            })
        })



        // }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

exports.delete = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql = `call iot.room_device_delete('${req.params.id}')`;
            connection.query(sql, true, (error, results, fields) => {
                connection.release();
                if (error) {
                    return res.status(400).send({ message: error.message });
                }
                return res.status(200).send({ message: 'Device successfully deleted!' });
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}