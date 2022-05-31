const express = require("express");
const {AuthController} = require("../controllers");

const authRouter = express.Router();

const {checkAuth} = require('../middleware');

authRouter.post('/user/register', AuthController.userRegister);

authRouter.post('/user/login', AuthController.userLogin);

authRouter.post('/user/send-otp',  AuthController.userSendOtp);

authRouter.put('/user/update-password', AuthController.updatePassword);

authRouter.put('/user/profile', checkAuth ,AuthController.updateProfile);



module.exports = authRouter
