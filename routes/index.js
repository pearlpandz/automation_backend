// For routing
const express = require('express');
const router = express.Router();
const middleware = require('./../middleware/jwt');

// Controllers
const User = require('./../controllers/user');

/* =========================================== User =========================================== */
// auth
router.post('/signup', User.signup);
router.post('/login', User.login);
router.post('/forgetpassword', User.forgetpassword);

// user
router.get('/user/:id', middleware.checkToken, User.getSingleUser);
router.put('/user/:id', middleware.checkToken, User.updateSingleUser);
router.delete('/user/:id', middleware.checkToken, User.deleteUser);
router.post('/changepassword', middleware.checkToken, User.changepassword);


module.exports = router;