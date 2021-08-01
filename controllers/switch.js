const { config } = require('../config/config');
let mysql = require('mysql');

// let connection = mysql.createConnection(config);
let pool = mysql.createPool(config);

// get product list by admin/manufacturer
exports.SwitchList = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            let sql = `call iot.new_port_list();`

            connection.query(sql, true, async (error, results) => {
                connection.release();
                if (error) {
                    return res.status(400).send(error);
                } else {
                    return res.status(200).send({ data: results[0] });
                }
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};
