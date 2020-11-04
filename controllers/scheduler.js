let mysql = require('mysql');
const config = require('../config/config');

// let connection = mysql.createConnection(config);
let pool = mysql.createPool(config);

exports.add = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql1 = `call iot.scheduler_create('${req.body.name}', '${req.decoded.id}', '${req.body.deviceIds}', '${req.body.starttime}', '${req.body.endtime}');`;
            connection.query(sql1, true, (error1, results, fields1) => {
                if (error1) {
                    return res.status(400).send(error1);
                }
                return res.status(200).send({ message: 'Scheduler added successfully!' });
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.list = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql1 = `call iot.scheduler_list('${req.decoded.id}');`;
            connection.query(sql1, true, (error1, results, fields1) => {
                if (error1) {
                    return res.status(400).send(error1);
                }
                return res.status(200).send(results[0]);
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.singleGet = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql1 = `call iot.scheduler_single_info('${req.decoded.id}', '${req.params.id}');`;
            connection.query(sql1, true, (error1, results, fields1) => {
                if (error1) {
                    return res.status(400).send(error1);
                }
                return res.status(200).send(results[0]);
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.roomsAndDevices = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql1 = `call iot.scheduler_create_room_devices_list();`;
            connection.query(sql1, true, (error1, results, fields1) => {
                if (error1) {
                    return res.status(400).send(error1);
                }
                return res.status(200).send(results[0]);
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.activate = function (req, res) {
    try {
        if (!req.body.schedulerId) {
            return res.status(400).send({
                success: false,
                message: "Scheduler Id is required",
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let sql1 = `call iot.scheduler_activate(${req.body.schedulerId});`;
                connection.query(sql1, true, (error1, results, fields1) => {
                    if (error1) {
                        return res.status(400).send(error1);
                    }
                    return res.status(200).send({ message: 'Successfully scheduler activated!' });
                });
            });
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.deactivate = function (req, res) {
    try {
        if (!req.body.schedulerId) {
            return res.status(400).send({
                success: false,
                message: "Scheduler Id is required",
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let sql1 = `call iot.scheduler_deactivate(${req.body.schedulerId});`;
                connection.query(sql1, true, (error1, results, fields1) => {
                    if (error1) {
                        return res.status(400).send(error1);
                    }
                    return res.status(200).send({ message: 'Successfully scheduler deactivated!' });
                });
            });
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.delete = function (req, res) {
    try {
        if (!req.params.id) {
            return res.status(400).send({
                success: false,
                message: "Scheduler Id is missing in params, which is required!",
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let sql1 = `call iot.scheduler_delete(${req.params.id});`;
                connection.query(sql1, true, (error1, results, fields1) => {
                    if (error1) {
                        return res.status(400).send(error1);
                    }
                    return res.status(200).send({ message: 'Successfully scheduler deleted!' });
                });
            });
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};