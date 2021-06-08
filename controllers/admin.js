// Modals
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
let mysql = require('mysql');

function getToken(userid) {
    return jwt.sign({ __id: userid, __role: 'admin' }, config.secret, {
        expiresIn: 60 * 60 * 24 * 365 * 9999
    });
}

// let connection = mysql.createConnection(config);
let pool = mysql.createPool(config);

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

                let sql1 = `set @a=0;call iot.new_admin_login('${req.body.email}','${req.body.password}',@a);select @a;`;

                connection.query(sql1, function (err, results) {
                    connection.release();
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        if (results[3][0]['@a'] == 400) {
                            return res.status(400).send({
                                status: false,
                                message: 'Your email or password is wrong!'
                            })
                        } else {
                            return res.status(200).send({
                                status: true,
                                message: 'Successfully Logged In',
                                token: getToken(results[1][0].adminId),
                                data: results[1][0]
                            })
                        }
                    }
                })
            })
        }
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};