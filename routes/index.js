// For routing
const express = require('express');
const router = express.Router();
var multer = require('multer');

// middlewares
const middleware = require('./../middleware/jwt');

// Controllers
const Admin = require('./../controllers/admin');
const User = require('./../controllers/users');
const Product = require('./../controllers/product');
const Inventory = require('./../controllers/inventory');
const Switch = require('./../controllers/switch');

const Rooms = require('./../controllers/rooms');
const Devices = require('./../controllers/devices');
const mqtt = require('./../controllers/mqtt');
const scheduler = require('./../scheduler/scheduler');
const schedule = require('./../controllers/scheduler');
const mailer = require('./../nodemailer/mail');

/* ------------------------------------ Admin Portal ----------------------------- */
// Admin/Franchise/Manufacturer Management
router.post('/admin/login', Admin.login);
router.get('/admin/list/:id', middleware.checkToken, Admin.AdminListByRole);
router.get('/admin/agent/list', middleware.checkToken, Admin.ExceptAgentList);
router.get('/admin/:id', middleware.checkToken, Admin.AdminGetById);
router.post('/admin/add', middleware.checkToken, Admin.AddAdmin);
router.put('/admin/edit/:id', middleware.checkToken, Admin.UpdateAdmin);
router.post('/admin/verify', Admin.AdminVerify);
router.delete('/admin/:id', middleware.checkToken, Admin.AdminDeleteById);


// Customer Management
router.get('/customer/list', middleware.checkToken, User.CustomerList);
router.get('/customer/:id', middleware.checkToken, User.CustomerGetById);
router.post('/customer/add', middleware.checkToken, User.AddCustomer);
router.put('/customer/edit/:id', middleware.checkToken, User.UpdateCustomer);
router.delete('/customer/:id', middleware.checkToken, User.CustomerDeleteById);
router.post('/customer/transfer', middleware.checkToken, User.TransferCustomer);

// Product Management
router.post('/product', middleware.checkToken, Product.AddProduct);
router.get('/products', middleware.checkToken, Product.ProductList);
router.get('/product/:id', middleware.checkToken, Product.GetProduct);
router.put('/product/:id', middleware.checkToken, Product.EditProduct);
router.delete('/product/:id', middleware.checkToken, Product.DeleteProduct); 

// Inventory Management
router.post('/inventory', middleware.checkToken, Inventory.AddProductToInventory);
router.put('/inventory/moveProductToAgent', middleware.checkToken, Inventory.MoveInventoryProductToAgent);
router.get('/inventory/:id', middleware.checkToken, Inventory.GetInventoryProductInfo);
router.post('/inventory/list/admin', middleware.checkToken, Inventory.GetInventoryProductListForAdmin);
router.post('/inventory/list/agent', middleware.checkToken, Inventory.GetInventoryProductListForAgent);



// Switch List
router.get('/switch/list', middleware.checkToken, Switch.SwitchList);

/* ------------------------------------ Customer Portal ----------------------------- */
// auth
router.post('/login', User.login);
router.post('/verify', User.CustomerVerify);

// rooms
router.get('/rooms/list', middleware.checkToken, Rooms.list);
router.post('/room', middleware.checkToken, Rooms.add);
router.put('/room/:id', middleware.checkToken, Rooms.update);
router.delete('/room/:id', middleware.checkToken, Rooms.delete);

// Base Devices
router.get('/basedevices/list', middleware.checkToken, Devices.basedeviceslist);

// Room Devices
router.get('/devices/list/:id', middleware.checkToken, Devices.list);
router.post('/device/bulk', middleware.checkToken, Devices.bulkAdd);
router.post('/device', middleware.checkToken, Devices.add);
router.put('/device/:id', middleware.checkToken, Devices.update);
router.put('/device/statusUpdate/:id', middleware.checkToken, Devices.statusUpdate);
router.delete('/device/:id', middleware.checkToken, Devices.delete);

// mqtt
router.get('/mqtt/getDeviceStatus', mqtt.getDeviceStatus);
router.post('/mqtt/switchState', mqtt.switchState);
router.get('/mqtt/getAllDevices', mqtt.getAllDevices);

// scheduler
router.post('/scheduler/add', middleware.checkToken, schedule.add);
router.get('/scheduler/list', middleware.checkToken, schedule.list);
router.get('/scheduler/devices', middleware.checkToken, schedule.roomsAndDevices);
router.get('/scheduler/:id', middleware.checkToken, schedule.singleGet);
router.patch('/scheduler/activate', middleware.checkToken, schedule.activate);
router.patch('/scheduler/deactivate', middleware.checkToken, schedule.deactivate);
router.delete('/scheduler/delete/:id', middleware.checkToken, schedule.delete);

router.get('/scheduler/start', scheduler.start);
router.get('/scheduler/stop', scheduler.stop);

// nodemailer
// router.get('/sendEmail', mailer.sendEmail);

module.exports = router;