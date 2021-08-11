const { config } = require('../config/config');
let mysql = require('mysql');

// let connection = mysql.createConnection(config);
let pool = mysql.createPool(config);

// Add Produced Products to Inventory
exports.AddProductToInventory = function (req, res) {
    try {
        if (!req.body.count) {
            return res.status(400).send({
                success: false,
                message: 'Produced Stock Count is required',
            });
        } else if (!req.body.productId) {
            return res.status(400).send({
                success: false,
                message: 'Product Id is required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                let sql = `set @_returnValue = 0;
                call iot.new_inventory_post('${req.body.count}', '${req.body.productId}', @_returnValue);
                select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);

                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];

                        if (_statuscode == 200) {
                            return res.status(200).send({ message: 'Successfully produced stock added in Inventory!' });
                        } else if (_statuscode == 404) {
                            return res.status(404).send({ message: 'Product not found!' });
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
exports.MoveInventoryProductToAgent = function (req, res) {
    try {
        if (!req.body.agentId) {
            return res.status(400).send({
                success: false,
                message: 'Agent is required',
            });
        } else if (!req.body.inventoryProductIds?.length > 0) {
            return res.status(400).send({
                success: false,
                message: 'Atleast one product required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                let sql = `set @_returnValue = 0;
                call iot.new_inventory_sell_productToAgent('${req.body.agentId}', '${JSON.stringify(req.body.inventoryProductIds)}', @_returnValue);
                select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);

                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];

                        if (_statuscode == 200) {
                            return res.status(200).send({ message: 'Successfully products moved to Agent!' });
                        } else if (_statuscode == 404) {
                            return res.status(404).send({ message: 'Agent is not found!' });
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

// get inventory product list by admin/manufacturer
exports.GetInventoryProductListForAdmin = function (req, res) {
    try {
        if (!req.body.status) {
            return res.status(400).send({
                success: false,
                message: 'Product Status is required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                let sql = `set @_returnValue = 0;
            call iot.new_inventory_listByStatusForAdmin('${req.body.status}', @_returnValue);
            select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);
                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];
                        if (_statuscode == 200) {
                            const _res = _results[0];
                            return res.status(200).send({ data: _res });
                        } if (_statuscode == 404) {
                            return res.status(200).send({ data: [] });
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

// get inventory product list by admin/manufacturer
exports.GetInventoryProductListForAgent = function (req, res) {
    try {
        if (!req.body.agentId) {
            return res.status(400).send({
                success: false,
                message: 'Agent Id is required',
            });
        } else if (!req.body.status) {
            return res.status(400).send({
                success: false,
                message: 'Product Status is required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                let sql = `set @_returnValue = 0;
            call iot.new_inventory_listByStatusForAgent('${req.body.agentId}', '${req.body.status}', @_returnValue);
            select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);
                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];
                        if (_statuscode == 200) {
                            const _res = _results[0];
                            return res.status(200).send({ data: _res });
                        } if (_statuscode == 404) {
                            return res.status(200).send({ data: [] });
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

// get inventory product info by id by admin/manufacturer
exports.GetInventoryProductInfo = function (req, res) {
    try {
        pool.getConnection(function (err, connection) {
            if (err) return res.status(500).send(err); // not connected!

            let sql = `set @_returnValue = 0;
            call iot.new_inventory_viewById('${req.params.id}', @_returnValue);
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