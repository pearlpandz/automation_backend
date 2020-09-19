// Modals
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const moment = require('moment');
const http = require('http');
const urlencode = require('urlencode');
let mysql = require('mysql');

function getToken(userid) {
    return jwt.sign({ id: userid }, config.secret, {
        expiresIn: 60 * 60 * 24 * 365 * 9999
    });
}

let connection = mysql.createConnection(config);


exports.signup = function (req, res) {
    try {
        if (!req.body.mobile) {
            return res.status(400).send({
                success: false,
                message: 'Mobile Number is required',
            });
        } else if (!req.body.name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required',
            });
        } else if (!req.body.email) {
            return res.status(400).send({
                success: false,
                message: 'Email is required',
            });
        } else if (!req.body.password) {
            return res.status(400).send({
                success: false,
                message: "Password is required",
            });
        } else if (!req.body.role) {
            return res.status(400).send({
                success: false,
                message: 'Role is required',
            });
        } else {
            let sql = `call iot.user_createupdate(0,'${req.body.name}', ${req.body.mobile}, '${req.body.password}', '${req.body.email}', '${req.body.role}')`;

            connection.query(sql, true, (error, results, fields) => {
                if (error) {
                    res.status(400).send(error);
                }
                res.status(200).send({ message: 'User Successfully Created!' });
            });

            connection.end();
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.login = function (req, res) {
    try {
        if (!req.body.email) {
            return res.status(400).send({
                success: false,
                message: 'Email is required',
            });
        } else if (!req.body.password) {
            return res.status(400).send({
                success: false,
                message: "Password is required",
            });
        } else {
            let sql1 = `call iot.user_single('${req.body.email}', '${req.body.password}')`;
            connection.query(sql1, true, (error1, results1, fields1) => {
                if (error1) {
                    res.status(400).send(error1);
                } else {
                    if (results1[0].length > 0) {
                        res.status(200).send({ message: 'User Successfully Login!', data: results1[0][0], token: getToken(results1[0][0].id) });
                    } else {
                        res.status(404).send({ message: 'User not found!' });
                    }
                }
            })

        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.list = (req, res) => {
    try {
        let sql = `call iot.user_selectall()`;
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