const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const registerUser = async(req,res)=>{

    const{username,email,password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({email});

    if(isUserAlreadyExist){
        res.status(409).json({
            message:'User already exists'
        })
    }

    const user = await userModel.create({
        username,
        email,
        password
    })

    const token =  jwt.sign({id:user._id},process.env.JWT_TOKEN);

    res.cookie('token',token);

    res.status(201).json({
        message:'User created successfully',
        user:{
            id:user._id,
            username:user.username
        }

    })

    module.exports = registerUser;

}