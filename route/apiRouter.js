
const express = require('express');
const router = express.Router();

const { registerUser,loginController ,getProfile ,logoutController } = require("../controller/userController.js");

router.post('/user/register',registerUser);
router.post('/user/login',loginController);
router.get('/user/profile',getProfile);

router.get('/user/logout',(req,res)=>{
    req.session.destroy();
})


module.exports =router;


