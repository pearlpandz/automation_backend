// For routing
const express = require('express');
const router = express.Router();
var multer = require('multer');

// middlewares
const middleware = require('./../middleware/jwt');

// Controllers
const User = require('./../controllers/users');
const Rooms = require('./../controllers/rooms');
const Devices = require('./../controllers/devices');
const mqtt = require('./../controllers/mqtt');
const scheduler = require('./../scheduler/scheduler');

// auth
router.post('/signup', User.signup);
router.post('/login', User.login);

// users
router.get('/users/list', middleware.checkToken, User.list);

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
router.get('/mqtt/switchState', mqtt.switchState);
router.get('/mqtt/getAllDevices', mqtt.getAllDevices);

// scheduler
router.get('/scheduler/list', scheduler.list);
router.get('/scheduler/start', scheduler.start);
router.get('/scheduler/stop', scheduler.stop);

module.exports = router; 