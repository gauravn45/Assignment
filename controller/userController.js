const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const User = require("../models/userModel");
const config =require('../config/config');


//register user  
 const registerUser = async (req, res) => {
    try {
       // console.log("body",req.body)
        const { fname, lname, email, pass} = req.body;
        // console.log(fname,lname,email,pass)
        if (!fname || !lname || !email || !pass)  return  res.status(400).json({ status: 0, message: "Please enter all details" })
        
        if (!validator.isEmail(email)) {
           return res.status(400).json({
                status: 400, message: "Email id is Invalid "
            })
        }

        const existUser = await User.findAll({
            where: { email }
        });
        // console.log("user",existUser)

        if (existUser.length > 0) return res.status(401).json({ status: 400, message: "user already registed with this email id" })
        
        const userData = { fname, lname, email };
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(pass, salt);
        userData.password = hashPass;

        const newUser = await User.create(userData)

        delete newUser.password;
        return res.status(200).json({ status: 200, message: "User register successfully",data:{newUser} }
        )

    } catch (error) {
        console.log("Registration error ", error)
        return res.status(500).json({ status: 500, messages:'server error' });

    }
}

// login api  controller
const loginController = async (req,res) =>{
    try{
        // if(!req.body) return res.status(400).json({ status:400, message:'Missing the body parameter'});

    var sess=req.session
    console.log(sess)
        const { email, password } = req.body;
    
    if (!email || !password)
    { return res.status(400).json({ status:400, message:'Missing email or password '})};
        // validation of email
    if (!validator.isEmail(email)) { return res.status(400).json({ status:400, message: 'Invalid email' }) };


    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ status:400, message: 'user not found '})
    };
    
    const passMatch = bcrypt.compareSync(password, user.password);
    if (!passMatch)
    { return res.status(400).json({ status: 400,message:"password in incorrect"  }); }

    const token = jwt.sign(
      {
        userId: user.id,
        email:user.email
      },
      config.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const userInfo = { 
        id: user.id,
         fname: user.fname,
         lname: user.lname,
          email: user.email
     };
     // sess.session.email = userInfo.email;
      
    return res.status(200).json({ status: 200, messages:'Login Successful',data:{ token ,  userInfo } });
        
    }catch(error){
        console.log("Login failed",error)
        return res.status(500).json({ status: 500, messages:'server error' });
    }
}

// get profile details
const getProfile = async(req,res) => {
    try{
        const profile=await User.findByPk(req.query.id);
        if(!profile){
            return res.status(400).json({status:400 , message : "User not existed  " })
        }
        return res.status(200).json({status:200,message : "User data" , data:profile})

    }catch(error) {
        console.log("profile get error",error);
        return res.status(500).json({ status: 500, messages:'server error'});

    }
}

//logout 
// const logoutController = async(req,res) => {
//     req.session.destroy();

// }
module.exports={
    registerUser,
    loginController,
    getProfile,
    // logoutController:logoutController
}