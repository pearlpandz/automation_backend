const { config } = require('../config/config');
let mysql = require('mysql');

// let connection = mysql.createConnection(config);
let pool = mysql.createPool(config);

// Actual sale of the product from agent to customer
exports.ActualSale = function (req, res) {
    try {
        if (!req.body.customerId) {
            return res.status(400).send({
                success: false,
                message: 'Customer Id is required',
            });
        } else if (!req.body.inventoryId) {
            return res.status(400).send({
                success: false,
                message: 'Inventory Id is required',
            });
        } else if (!req.body.productId) {
            return res.status(400).send({
                success: false,
                message: 'Product Id is required',
            });
        } else if (!req.body.soldBy) {
            return res.status(400).send({
                success: false,
                message: 'Agent Id is required',
            });
        } else if (!req.body.deliveryAddress) {
            return res.status(400).send({
                success: false,
                message: 'Delivery address is required',
            });
        } else if (!req.body.contactNo) {
            return res.status(400).send({
                success: false,
                message: 'Contact number is required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                let sql = `set @_returnValue = 0;
                call iot.actualSale('${req.body.customerId}', '${req.body.inventoryId}', '${req.body.productId}', '${req.body.price}', '${req.body.soldBy}', '${req.body.deliveryAddress}', '${req.body.contactNo}', @_returnValue);
                select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);

                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];

                        if (_statuscode == 200) {
                            return res.status(200).send({ message: 'Product sold successfully!' });
                        } else if (_statuscode == 403) {
                            return res.status(404).send({ message: 'customer not found, unauthorized to sale product to non-customer' });
                        } else if (_statuscode == 404) {
                            return res.status(404).send({ message: 'Product is not found!' });
                        } else if (_statuscode == 405) {
                            return res.status(404).send({
                                message: "Agent not found, You're not agent, unauthorized to sale the products product"
                            });
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


// Product Installation in customer place
exports.ProductInstallationUpdate = function (req, res) {
    try {
        if (!req.params.id) {
            return res.status(400).send({
                success: false,
                message: 'Inventory Id is required',
                info: "Inventory Id is not present in params"
            });
        } else if (!req.body.agentId) {
            return res.status(400).send({
                success: false,
                message: 'Agent Id is required',
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) return res.status(500).send(err); // not connected!

                let sql = `set @_returnValue = '0';
                call iot.product_installation_update('${req.params.id}', '${req.body.agentId}', @_returnValue);
                select @_returnValue;`

                connection.query(sql, true, async (error, results) => {
                    connection.release();
                    if (error) {
                        return res.status(400).send(error);
                    } else {
                        const _results = results.filter(a => a.length > 0);

                        const _statuscode = _results[_results.length - 1][0]['@_returnValue'];

                        if (_statuscode == 200) {
                            return res.status(200).send({ message: 'Product installation details updated successfully!' });
                        } else if (_statuscode == 403) {
                            return res.status(404).send({ message: "Agent not found, You're not authorised to install the product" });
                        } else if (_statuscode == 404) {
                            return res.status(404).send({ message: 'Product is not found or installing a wrong product!' });
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

                let __status = [];
                if (req.body.status == 'all') {
                    __status = ["new", "available", "sold"]
                } else {
                    __status = [req.body.status]
                }

                let sql = `set @_returnValue = 0;
            call iot.new_inventory_listByStatusForAdmin('${JSON.stringify(__status)}', @_returnValue);
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