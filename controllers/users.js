// Modals
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
let mysql = require('mysql');
var nodemailer = require("nodemailer");
var ejs = require("ejs");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'quantanics.in@gmail.com', // your domain email address
        pass: 'keshavan00194' // your password
    }
});

function getToken(userid) {
    return jwt.sign({ id: userid, role: 'customer' }, config.secret, {
        expiresIn: 60 * 60 * 24 * 365 * 9999
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
        } else if (!req.body.address) {
            return res.status(400).send({
                success: false,
                message: 'Address is required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let password = randomPassword(8);
                let sql = `set @_returnValue = 0;
                call iot.new_customer_post('${req.body.name}', ${req.body.mobile}, '${password}', '${req.body.email}', '${req.body.address}', @_returnValue);
                select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);

                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];

                        if (_statuscode == 201) {
                            const data = await ejs.renderFile(`email-templates/welcome.ejs`, {
                                name: req.body.name,
                                token: Buffer.from(req.body.email, 'binary').toString('base64'),
                                email: req.body.email,
                                password: password,
                                url: 'http://165.22.208.52:3000'
                            });
                            var mailOptions = {
                                from: `"Quantanics" <no-reply@quantanics.in>`,
                                to: `${req.body.email}`,
                                bcc: 'quantanics.in@gmail.com',
                                subject: `Welcome ${req.body.name}`,
                                html: data
                            };

                            transporter.sendMail(mailOptions, function (err, info) {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).send({ message: 'Something went wrong, Internal server error!', err });
                                }
                                else {
                                    return res.status(201).send({ message: 'User Successfully Created!' });
                                }
                            });
                        } else if (_statuscode == 409) {
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
        } else if (!req.body.address) {
            return res.status(400).send({
                success: false,
                message: 'Address is required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let sql = `set @_returnValue = 0;
                call iot.new_customer_put('${req.params.id}','${req.body.name}', ${req.body.mobile}, '${req.body.email}', '${req.body.address}', @_returnValue);
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

// customer verify by welcome mail
exports.CustomerVerify = (req, res) => {
    try {
        console.log('in verification....');
        if (!req.body.token) {
            return res.status(400).send({
                success: false,
                message: 'Token is required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let sql = `set @_returnValue = 0;
                call iot.new_customer_verify('${Buffer.from(req.body.token, 'base64').toString('binary')}', @_returnValue);
                select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);
                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];
                        if (_statuscode === 200) {
                            return res.status(200).send({
                                success: true,
                                message: 'User Successfully verified!'
                            });
                        } else if (_statuscode === 404) {
                            return res.status(404).send({
                                success: false,
                                message: 'Sorry, User does not exist!'
                            });
                        } else {
                            return res.status(500).send({
                                success: false,
                                message: 'Something went wrong, Internal server error!'
                            });
                        }
                    }
                });
            });
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

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
                let sql = `set @_returnValue = 0;
                call iot.new_customer_login('${req.body.email}', '${req.body.password}', @_returnValue);
                select @_returnValue;`

                connection.query(sql, true, (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);
                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];
                        if (_statuscode === 200) {
                            return res.status(200).send({
                                status: true,
                                message: 'User Successfully Login!',
                                data: _results[0][0],
                                token: getToken(_results[0][0].id)
                            });
                        } else if (_statuscode === 400) {
                            return res.status(400).send({
                                success: false,
                                message: 'Sorry, Your email or password is wrong!'
                            });
                        } else if (_statuscode === 401) {
                            return res.status(401).send({
                                success: false,
                                message: 'Sorry, Your email address is not verified, please check your email!'
                            });
                        } else {
                            return res.status(500).send({
                                success: false,
                                message: 'Something went wrong, Internal server error!'
                            });
                        }
                    }
                })
            })
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.CustomerList = (req, res) => {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            // Use the connection
            let sql = `call iot.new_customer_get_list(${req.decoded.id})`;
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

exports.CustomerGetById = (req, res) => {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let sql = `set @_returnValue = 0;
                call iot.new_customer_getById(${req.params.id}, @_returnValue);
                select @_returnValue;`;

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);
                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];
                        if (_statuscode === 200) {
                            return res.status(200).send({ data: _results[0][0] });
                        } else if (_statuscode === 404) {
                            return res.status(404).send({ message: 'Sorry, User does not exist!' });
                        } else {
                            return res.status(500).send({ message: 'Something went wrong, Internal server error!' });
                        }
                    }
                });
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

exports.CustomerDeleteById = (req, res) => {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                // Use the connection
                let sql = `set @_returnValue = 0;
                call iot.new_customer_delete(${req.params.id}, @_returnValue);
                select @_returnValue;`;

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);
                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];
                        if (_statuscode === 200) {
                            return res.status(200).send({ message: 'User deleted successfully!' });
                        } else if (_statuscode === 404) {
                            return res.status(404).send({ message: 'Sorry, User does not exist!' });
                        } else {
                            return res.status(500).send({ message: 'Something went wrong, Internal server error!' });
                        }
                    }
                });
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}