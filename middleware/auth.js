const CustomAPIError = require('../errors/custom-error'); // Ensure this path is correct
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // console.log('throwing error');
        throw new CustomAPIError('Authorization header is missing or token is not provided', 401);
    }
    const token = authHeader.split(' ')[1];
    console.log("token:",   token);
    try {
        //console.log(req.headers.authorization);
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const{id,username} = decoded;
        req.user = {id,username}
        next();
    } catch (error) {
        throw new CustomAPIError('invalid token/expired token',401)
    }
}

module.exports = authenticationMiddleware;