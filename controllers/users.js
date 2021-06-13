// Modals
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
let mysql = require('mysql');
const { sendEmailForWelcome } = require('./../nodemailer/mail');

function getToken(userid) {
    return jwt.sign({ id: userid }, config.secret, {
        expiresIn: 60 * 60 * 24 * 365 * 9999,
        role: 'customer'
    });
}

function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

// let connection = mysql.createConnection(config);
let pool = mysql.createPool(config);

// create customer by admin
exports.AddCustomer = function (req, res) {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required',
            });
        } else if (!req.body.mobile) {
            return res.status(400).send({
                success: false,
                message: 'Mobile Number is required',
            });
        } else if (!req.body.email) {
            return res.status(400).send({
                success: false,
                message: 'Email is required',
            });
        } else {
            pool.getConnection(async function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let password = await randomPassword(8);
                let sql = `set @_returnValue = 0;
                call iot.new_customer_post('${req.body.name}', ${req.body.mobile}, '${password}', '${req.body.email}', @_returnValue);
                select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);
                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];
                        if (_statuscode === 201) {
                            await sendEmailForWelcome({
                                name: req.body.name,
                                email: req.body.email,
                                password: password
                            }).then(email => {
                                console.log(email);
                                return res.status(201).send({ message: 'User Successfully Created!' });
                            })
                        } else if (_statuscode === 409) {
                            return res.status(409).send({ message: 'Email or Mobile already exist!' });
                        } else {
                            return res.status(500).send({ message: 'Something went wrong, Internal server error!' });
                        }
                    }
                });
            });
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

// edit customer by admin
exports.UpdateCustomer = function (req, res) {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required',
            });
        } else if (!req.body.mobile) {
            return res.status(400).send({
                success: false,
                message: 'Mobile Number is required',
            });
        } else if (!req.body.email) {
            return res.status(400).send({
                success: false,
                message: 'Email is required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let sql = `set @_returnValue = 0;
                call iot.new_customer_put('${req.params.id}','${req.body.name}', ${req.body.mobile}, '${req.body.email}', @_returnValue);
                select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);
                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];
                        if (_statuscode === 200) {
                            return res.status(200).send({ message: 'User Successfully Updated!' });
                        } else if (_statuscode === 404) {
                            return res.status(404).send({ message: 'Sorry, User does not exist!' });
                        } else {
                            return res.status(500).send({ message: 'Something went wrong, Internal server error!' });
                        }
                    }
                });
            });
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
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let sql1 = `call iot.new_customer_login('${req.body.email}', '${req.body.password}')`;
                connection.query(sql1, true, (error1, results1) => {
                    connection.release();
                    if (error1) {
                        return res.status(400).send(error1);
                    } else {
                        if (results1[0].length > 0) {
                            return res.status(200).send({ message: 'User Successfully Login!', data: results1[0][0], token: getToken(results1[0][0].id) });
                        } else {
                            return res.status(404).send({ message: 'Invalid credentials!' });
                        }
                    }
                })
            })
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.list = (req, res) => {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql = `call iot.customer_get_list()`;
            connection.query(sql, true, (error, results) => {
                connection.release();
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