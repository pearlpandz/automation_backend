let mysql = require('mysql');
const config = require('../config/config');
let connection = mysql.createConnection(config);

exports.list = function (req, res) {
    try {
        let sql = `call iot.room_devices_list(${req.params.id})`;
        connection.query(sql, true, (error, results, fields) => {
            if (error) {
                res.status(400).send({ message: error.message });
            }
            res.status(200).send({ data: results[0] });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

exports.add = function (req, res) {
    try {
        let arr = req.body;
        let values = '';
        for (let i = 0; i < arr.length; i++) {
            values += `('0','${arr[i].surname}','${arr[i].speed}','${arr[i].refId}','${arr[i].roomId}','${Date.now()}','1','0')`;
            if (i != arr.length - 1) {
                values += ','
            }
        }

        let sql = `insert into iot.rooms_devices values${values}`;
        connection.query(sql, true, (error, results, fields) => {
            if (error) {
                res.status(400).send(error.message);
            }
            res.status(200).send({ message: 'Successfully added' });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

exports.update = function (req, res) {
    try {
        let sql = `call iot.room_device_update('${req.body.status}','${req.body.speed}','${req.params.id}')`;
        connection.query(sql, true, (error, results, fields) => {
            if (error) {
                res.status(400).send({ message: error.message });
            }
            res.status(200).send({ message: 'Device Information Updated!' });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}
