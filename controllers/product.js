const { config } = require('../config/config');
let mysql = require('mysql');

// let connection = mysql.createConnection(config);
let pool = mysql.createPool(config);

// create product and configurations by admin/manufacturer
exports.AddProduct = function (req, res) {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required',
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: false,
                message: 'Description is required',
            });
        } else if (!req.body.note) {
            return res.status(400).send({
                success: false,
                message: 'Note is required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                let sql = `set @_returnValue = 0;
                call iot.new_product_post('${req.body.name}', '${req.body.description}', '${req.body.note}', '${JSON.stringify(req.body.configurations)}',@_returnValue);
                select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);

                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];

                        if (_statuscode == 201) {
                            return res.status(201).send({ message: 'Product Successfully Created!' });
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

// update product and configurations by admin/manufacturer
exports.EditProduct = function (req, res) {
    try {
        if (!req.body.name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required',
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: false,
                message: 'Description is required',
            });
        } else if (!req.body.note) {
            return res.status(400).send({
                success: false,
                message: 'Note is required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                let sql = `set @_returnValue = 0;
                call iot.new_product_put('${req.body.name}', '${req.body.description}', '${req.body.note}', '${JSON.stringify(req.body.configurations)}','${req.params.id}',@_returnValue);
                select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);

                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];

                        if (_statuscode == 200) {
                            return res.status(200).send({ message: 'Product Successfully Updated!' });
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

// get product list by admin/manufacturer
exports.ProductList = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            let sql = `call iot.new_product_get_list();`

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

// get product by id by admin/manufacturer
exports.GetProduct = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            let sql = `set @_returnValue = 0;
            call iot.new_product_get_single('${req.params.id}', @_returnValue);
            select @_returnValue;`

            connection.query(sql, true, async (error, results) => {
                connection.release();
                if (error) {
                    return res.status(400).send(error);
                } else {
                    const _results = results.filter(a => a.length > 0);
                    const _statuscode = _results[_results.length - 1][0]['@_returnValue'];
                    if (_statuscode == 200) {
                        const _res = _results[0][0];
                        _res.configurations = JSON.parse(_results[0][0].configurations)
                        return res.status(200).send({ data: _res });
                    } if (_statuscode == 404) {
                        return res.status(404).send({ message: 'Product Not found!' });
                    } else {
                        return res.status(500).send({ message: 'Something went wrong, Internal server error!' });
                    }
                }
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};

// delete product by id by admin/manufacturer
exports.DeleteProduct = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            let sql = `set @_returnValue = 0;
            call iot.new_product_delete('${req.params.id}', @_returnValue);
            select @_returnValue;`

            connection.query(sql, true, async (error, results) => {
                connection.release();
                if (error) {
                    return res.status(400).send(error);
                } else {
                    const _results = results.filter(a => a.length > 0);
                    const _statuscode = _results[_results.length - 1][0]['@_returnValue'];

                    if (_statuscode == 200) {
                        return res.status(200).send({ message: 'Product successfully deleted!' });
                    } if (_statuscode == 404) {
                        return res.status(404).send({ message: 'Product Not found!' });
                    } else {
                        return res.status(500).send({ message: 'Something went wrong, Internal server error!' });
                    }
                }
            });
        });
    } catch (err) {
        return res.status(500).send(err.toString());
    }
};