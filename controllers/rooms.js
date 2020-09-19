let mysql = require('mysql');
const config = require('../config/config');
let connection = mysql.createConnection(config);

exports.list = function (req, res) {
    try {
        let sql = `call iot.rooms_activelist(${req.decoded.id})`;
        connection.query(sql, true, (error, results, fields) => {
            if (error) {
                res.status(400).send(error.message);
            }
            res.status(200).send(results[0]);
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

exports.add = function (req, res) {
    try {
        let sql = `call iot.room_createupdate('${req.body.name}', '${req.body.boxId}', '${req.decoded.id}')`;
        connection.query(sql, true, (error, results, fields) => {
            if (error) {
                res.status(400).send(error.message);
            }
            res.status(200).send({message: 'Room added successfully!'});
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}