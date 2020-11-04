let mysql = require('mysql');
const config = require('../config/config');

// let connection = mysql.createConnection(config);
let pool = mysql.createPool(config);

exports.list = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql = `call iot.rooms_activelist(${req.decoded.id})`;
            connection.query(sql, true, (error, results, fields) => {
                if (error) {
                    return res.status(400).send(error.message);
                }
                return res.status(200).send(results[0]);
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

exports.add = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql = `call iot.room_create('${req.body.name}', '${req.body.boxId}', '${req.decoded.id}')`;
            connection.query(sql, true, (error, results, fields) => {
                if (error) {
                    return res.status(400).send(error.message);
                }
                return res.status(200).send({ message: 'Room added successfully!' });
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
            let sql = `call iot.room_update('${req.params.id}', '${req.body.name}', '${req.body.boxId}', '${req.decoded.id}')`;
            connection.query(sql, true, (error, results, fields) => {
                if (error) {
                    return res.status(400).send(error.message);
                }
                return res.status(200).send({ message: 'Room updated successfully!' });
            });
        })
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}


exports.delete = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql = `call iot.room_delete('${req.params.id}', '${req.decoded.id}')`;
            connection.query(sql, true, (error, results, fields) => {
                if (error) {
                    return res.status(400).send(error.message);
                }
                return res.status(200).send({ message: 'Room deleted successfully!' });
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}