const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const router = express.Router();

router.post('/create',async(req,res)=>{
    console.log(req.cookies);
    console.log(req.body);

    const token = req.cookies.token;

    if(!token){
        res.status(401).json({message:'Unauthorized'});
    }

    try{
         const decoded = jwt.verify(token,process.env.JWT_TOKEN);

         const user = userModel.findOne({_id:decoded.id});

         console.log(user);

         res.send('Post created successfully')
    }
    catch(error){

       return   res.status(401).json({message:'invalid token'});
    }
})

// router.get('/test', (req, res) => {
//     res.send("Post routes are wired up!");
// });

module.exports = router;