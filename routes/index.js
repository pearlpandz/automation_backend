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

// auth
router.post('/signup', User.signup);
router.post('/login', User.login);

// users
router.get('/users/list', middleware.checkToken, User.list);

// rooms
router.get('/rooms/list', middleware.checkToken, Rooms.list);
router.post('/room', middleware.checkToken, Rooms.add);

// devices
router.get('/devices/list/:id', middleware.checkToken, Devices.list);
router.post('/device', middleware.checkToken, Devices.add);
router.put('/device/:id', middleware.checkToken, Devices.update);
module.exports = router;