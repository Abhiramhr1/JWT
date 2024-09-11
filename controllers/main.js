// const {CustomAPIError} = require('../errors/custom-error') not working
// const CustomAPIError = require('../errors/custom-error'); // Ensure this path is correct

const jwt = require('jsonwebtoken')
const login = async(req,res)=>{
    const{username,password} = req.body; 
    console.log(username,password);

    //we can do 3 types of validation
    //mongoose validation
    //joi
    //check in the controllers

    if( !username || !password)
    {
        throw new CustomAPIError('please provide details',400);
    }
    const id = new Date().getDate()

    //sign() method  ( payload, secret string for signature ,[options])
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(200).json({msg:"user created",token:token})
}

const dashBoard = async (req, res, next) => {

        //console.log(req.headers);
            // const decoded = jwt.verify(token,process.env.JWT_SECRET);
           // console.log(decoded);

            console.log("req",req.user.username);
            const luckyNumber = Math.floor(Math.random() * 100);
            res.status(200).json({ msg: `Hello user:${req.user.username}`, secret: luckyNumber }); //decoded is passed in req object from middleware
    

};

module.exports = {login,dashBoard}