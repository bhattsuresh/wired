const express = require("express");
const bodyParser = require('body-parser');
const {UserController, AuthController} = require("../controllers");

const router = express.Router();

const {checkAuth} = require('../middleware');

router.get('/', UserController.users);

router.post('/login', AuthController.userLogin);
router.post('/signup', AuthController.userRegister);

router.post('/category', UserController.addCategory);
router.get('/category', UserController.getCategory);
router.get('/feed', checkAuth, UserController.getFeed);
router.post('/feed', checkAuth ,UserController.addFeed);


module.exports = router
