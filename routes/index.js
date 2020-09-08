// For routing
const express = require('express');
const router = express.Router();
const middleware = require('./../middleware/jwt');

// Controllers
const User = require('./../controllers/user');
const Rooms = require('./../controllers/rooms');
const Devices = require('./../controllers/devices');
const mqtt = require('./../controllers/mqtt');


/* =========================================== User =========================================== */
// auth
router.post('/signup', User.signup);
router.post('/login', User.login);
router.post('/forgetpassword', User.forgetpassword);

// user 
router.get('/users/list', middleware.checkToken, User.list);
router.get('/user/:id', middleware.checkToken, User.getSingleUser);
router.put('/user/:id', middleware.checkToken, User.updateSingleUser);
router.delete('/user/:id', middleware.checkToken, User.deleteUser);
router.post('/changepassword', middleware.checkToken, User.changepassword);

// Rooms
router.get('/rooms/list', middleware.checkToken, Rooms.list);
router.get('/rooms/listAll', middleware.checkToken, Rooms.listAll);
router.post('/room/add', middleware.checkToken, Rooms.add);
router.get('/room/:id', middleware.checkToken, Rooms.singleGetRoom);
router.put('/room/:boxId/:id', middleware.checkToken, Rooms.updateRoom);


// Devices
router.get('/devices/list', middleware.checkToken, Devices.list);



router.get('/mqtt/deviceStatus', mqtt.getDeviceStatus);

module.exports = router;