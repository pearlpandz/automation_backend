let mysql = require('mysql');
const config = require('../config/config');
let connection = mysql.createConnection(config);


exports.add = function (req, res) {
    try {
        let sql1 = `call iot.scheduler_create('${req.body.name}', '${req.decoded.id}', '${req.body.deviceIds}', '${req.body.starttime}', '${req.body.endtime}');`;
        connection.query(sql1, true, (error1, results, fields1) => {
            if (error1) {
                return res.status(400).send(error1);
            }
            return res.status(200).send({ message: 'Scheduler added successfully!' });
        })
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.list = function (req, res) {
    try {
        let sql1 = `call iot.scheduler_list('${req.decoded.id}');`;
        connection.query(sql1, true, (error1, results, fields1) => {
            if (error1) {
                return res.status(400).send(error1);
            }
            return res.status(200).send(results[0]);
        })
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.singleGet = function (req, res) {
    try {
        let sql1 = `call iot.scheduler_single_info('${req.decoded.id}', '${req.params.id}');`;
        connection.query(sql1, true, (error1, results, fields1) => {
            if (error1) {
                return res.status(400).send(error1);
            }
            return res.status(200).send(results[0]);
        })
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};