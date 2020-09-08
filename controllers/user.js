// Modals
const UserSchema = require('../modals/user');
const jwt = require('jsonwebtoken');
const config = require('./../config/config');
const moment = require('moment');
const http = require('http');
const urlencode = require('urlencode');

function getToken(result) {
    return jwt.sign({ _id: result._id }, config.secret, {
        expiresIn: 60 * 60 * 24 * 365 * 9999
    });
}

// signup - add new user
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
            const createdAt = moment(new Date()).format('MM/DD/YYYY hh:mm:ss A');
            let user = new UserSchema({
                name: req.body.name,
                mobile: req.body.mobile,
                password: req.body.password,
                email: req.body.email,
                role: req.body.role,
                createdAt: new Date()
            });
            user.save(function (err, result) {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Email already present',
                        error: err.toString()
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        data: result,
                        token: getToken(req) ? getToken(req) : null
                    });
                }
            });
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

// login (based on email) - allow user to use application
exports.login = function (req, res) {
    try {
        if (!req.body.email)
            return res.status(400).send({ message: 'Email is required', success: false })
        if (!req.body.password)
            return res.status(400).send({ message: 'Password is required', success: false })
        else
            UserSchema.findOneAndUpdate(
                { email: req.body.email },
                { lastLogin: new Date()},
                { upsert: true, new: true },
                function (err, result) {
                    if (err) {
                        return res.status(400).send({
                            success: false,
                            message: 'Credentials are not match!',
                        });
                    } else {
                        if (result) {
                            if (result.password === req.body.password) {
                                return res.status(200).send({
                                    data: result,
                                    token: getToken(result) ? getToken(result) : null,
                                    message: 'User successfully logged in'
                                });
                            } else {
                                return res.status(400).send({
                                    success: false,
                                    message: 'Credentials are not match!'
                                })
                            }
                        } else {
                            return res.status(400).send({
                                success: false,
                                message: 'Credentials are not match!'
                            });
                        }
                    }
                });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

exports.forgetpassword = function (req, res) {
    try {
        if (!req.body.mobile) {
            return res.status(400).send({
                success: false,
                message: 'Mobile Number is required'
            })
        } else if (!req.body.password) {
            return res.status(404).send({
                success: false,
                message: 'Password is required'
            })
        } else {
            UserSchema.findOneAndUpdate(
                { mobile: req.body.mobile },
                { password: req.body.password },
                { upsert: true, new: true },
                function (err, result) {
                    if (err) {
                        return res.status(404).send({
                            success: false,
                            message: err.toString(),
                        });
                    } else {
                        return res.status(200).send({
                            success: true,
                            data: 'Password changed Successfully'
                        })
                    }
                });
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() })
    }
}

// get all user list
exports.list = function (req, res) {
    try {
        UserSchema.find({}, function (err, result) {
            if (err) {
                res.status(404).send({
                    success: false,
                    message: 'No users found'
                })
            } else {
                res.status(200).send({
                    success: true,
                    data: result
                })
            }
        })
    } catch (error) {
        return res.status(500).send(error.toString());
    }
}

// get user
exports.getSingleUser = function (req, res) {
    try {
        if (!req.params.id) {
            res.status(400).send({
                success: false,
                message: 'Parameter User Id is required'
            })
        } else {
            UserSchema.findOne({ _id: req.params.id }, function (err, result) {
                if (err) {
                    res.status(404).send({
                        success: false,
                        message: 'No data found'
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        data: result
                    })
                }
            })
        }

    } catch (error) {
        return res.status(500).send(error.toString());
    }
}

// put/update - for singl user
exports.updateSingleUser = function (req, res) {
    try {
        if (!req.params.id) {
            res.status(400).send({
                success: false,
                message: 'Parameter User Id is required'
            })
        } else if (!req.body) {
            return res.status(400).send({
                success: false,
                message: 'Data required to update user',
            });
        } else {
            UserSchema.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { upsert: true, new: true },
                function (err, result) {
                    if (err) {
                        return res.status(404).send({
                            success: false,
                            message: 'User id is not match, Data not udpated'
                        })
                    } else {
                        return res.status(200).send({
                            success: true,
                            data: result
                        })
                    }
                });
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
}

// delete specific user
exports.deleteUser = function (req, res) {
    try {
        if (!req.params.id) {
            return res.status(400).send({
                success: false,
                message: 'Parameter User id is required.'
            });
        } else {
            UserSchema.findByIdAndRemove(req.params.id, function (err, user) {
                if (err)
                    return res.status(404).send({
                        success: false,
                        message: 'user id invalid or user not found.'
                    });
                else
                    return res.status(200).send({
                        success: true,
                        message: 'user deleted successfullly.'
                    })
            });
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() })
    }
}

// change password
exports.changepassword = function (req, res) {
    try {
        if (!req.body.currentpassword) {
            return res.status(400).send({
                success: false,
                message: 'Current password is required'
            })
        } else if (!req.body.newpassword) {
            return res.status(404).send({
                success: false,
                message: 'New Password is required'
            })
        } else if (req.body.currentpassword === req.body.newpassword) {
            return res.status(404).send({
                success: false,
                message: 'Please set new password, your new password look like old password!'
            })
        } else {
            const userid = req.decoded._id;
            UserSchema.findOneAndUpdate(
                { _id: userid, password: req.body.currentpassword },
                { password: req.body.newpassword },
                { upsert: true, new: true },
                function (err, result) {
                    if (err) {
                        return res.status(404).send({
                            success: false,
                            message: 'Retry, Your current password is wrong!',
                        });
                    } else {
                        return res.status(200).send({
                            success: true,
                            data: 'Password changed Successfully'
                        })
                    }
                });
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() })
    }
}

// otp
exports.otp = function (req, res) {
    try {
        otp = Math.floor(100000 + Math.random() * 900000);
        hashcode = req.body.signature;

        if (!req.body.mobile) {
            return res.status(400).send({
                success: false,
                message: 'Mobile Number is required'
            })
        } else {
            UserSchema.findOne({ mobile: req.body.mobile }, function (err, result) {
                if (err) {
                    return res.status(404).send({
                        success: false,
                        message: err.toString()
                    })
                } else {
                    if (result) {
                        if (req.body.type === 'forgetpassword') {
                            msg = urlencode(`<#> Your LocalFolks One Time Password (OTP) is: ${otp}. Don't share with anyone, T & C apply. ${hashcode}`);
                            toNumber = `+91${req.body.mobile}`;
                            apikey = 'DKybIYCWD1M-rlY9TJ2HXLt8pQTVyunck9hxLR4Ehl'
                            sender = 'LFOLKS';
                            data = '&apikey=' + apikey + '&sender=' + sender + '&numbers=' + toNumber + '&message=' + msg;
                            options = {
                                host: 'api.textlocal.in', path: '/send?' + data
                            };
                            callback = function (response) {
                                var str = '';
                                response.on('data', function (chunk) {
                                    str += chunk;
                                });
                                response.on('end', function () {
                                    return res.status(200).send({
                                        mobile: toNumber,
                                        otp: otp,
                                        message: str.toString()
                                    });
                                });
                            }
                            http.request(options, callback).end();
                        } else {
                            return res.status(404).send({
                                success: false,
                                message: 'Account already exist'
                            });
                        }
                    } else {
                        if (req.body.type === 'signup') {
                            msg = urlencode(`<#> Your LocalFolks One Time Password (OTP) is: ${otp}. Don't share with anyone, T & C apply. ${hashcode}`);
                            toNumber = `+91${req.body.mobile}`;
                            apikey = 'DKybIYCWD1M-rlY9TJ2HXLt8pQTVyunck9hxLR4Ehl'
                            sender = 'LFOLKS';
                            data = '&apikey=' + apikey + '&sender=' + sender + '&numbers=' + toNumber + '&message=' + msg;
                            options = {
                                host: 'api.textlocal.in', path: '/send?' + data
                            };
                            callback = function (response) {
                                var str = '';
                                response.on('data', function (chunk) {
                                    str += chunk;
                                });
                                response.on('end', function () {
                                    return res.status(200).send({
                                        mobile: toNumber,
                                        otp: otp,
                                        message: str.toString()
                                    });
                                });
                            }
                            http.request(options, callback).end();
                        } else {
                            return res.status(404).send({
                                success: false,
                                message: 'Account is not found, Check you mobile number'
                            });
                        }
                    }

                }
            })
        }
    } catch (error) {
        return res.status(500).send({ message: error.toString() })
    }
}

// resend otp
exports.resendotp = function (req, res) {
    try {
        otp = req.body.otp;
        hashcode = req.body.signature;

        UserSchema.findOne({ mobile: req.body.mobile }, function (err, result) {
            if (err) {
                return res.status(404).send({
                    success: false,
                    message: err.toString()
                })
            } else {
                if (result) {
                    if (req.body.type === 'forgetpassword') {
                        msg = urlencode(`<#> Your LocalFolks One Time Password (OTP) is: ${otp}. Don't share with anyone, T & C apply. ${hashcode}`);
                        toNumber = `+91${req.body.mobile}`;
                        apikey = 'DKybIYCWD1M-rlY9TJ2HXLt8pQTVyunck9hxLR4Ehl'
                        sender = 'LFOLKS';
                        data = '&apikey=' + apikey + '&sender=' + sender + '&numbers=' + toNumber + '&message=' + msg;
                        options = {
                            host: 'api.textlocal.in', path: '/send?' + data
                        };
                        callback = function (response) {
                            var str = '';
                            response.on('data', function (chunk) {
                                str += chunk;
                            });
                            response.on('end', function () {
                                return res.send({
                                    mobile: toNumber,
                                    otp: otp,
                                    message: str.toString()
                                });
                            });
                        }
                        http.request(options, callback).end();
                    } else {
                        return res.status(404).send({
                            success: false,
                            message: 'Account already exist'
                        });
                    }
                } else {
                    if (req.body.type === 'signup') {
                        msg = urlencode(`<#> Your LocalFolks One Time Password (OTP) is: ${otp}. Don't share with anyone, T & C apply. ${hashcode}`);
                        toNumber = `+91${req.body.mobile}`;
                        apikey = 'DKybIYCWD1M-rlY9TJ2HXLt8pQTVyunck9hxLR4Ehl'
                        sender = 'LFOLKS';
                        data = '&apikey=' + apikey + '&sender=' + sender + '&numbers=' + toNumber + '&message=' + msg;
                        options = {
                            host: 'api.textlocal.in', path: '/send?' + data
                        };
                        callback = function (response) {
                            var str = '';
                            response.on('data', function (chunk) {
                                str += chunk;
                            });
                            response.on('end', function () {
                                return res.send({
                                    mobile: toNumber,
                                    otp: otp,
                                    message: str.toString()
                                });
                            });
                        }
                        http.request(options, callback).end();
                    } else {
                        return res.status(404).send({
                            success: false,
                            message: 'Account is not found, Check you mobile number'
                        });
                    }
                }

            }
        })
    } catch (error) {
        return res.status(500).send({ message: error.toString() })
    }
}