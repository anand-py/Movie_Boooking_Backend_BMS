const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config')
const User = require('../models/user.models')
const constants = require('../utils/constants') 

verifyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"]
    if(!token){
        return res.status(403).send({
            message : "No Token Provided !"
        })
    }
    jwt.verify(token, config.secret, (err,decoded)=>{
        if(err){
            return res.status(401).send({
                message : "Unauthorized"
            })
        }
        req.userId = decoded.id;
        next()
    })
}

isAdmin = async (req,res,next)=>{
    const userId = await User.findOne({
        userId : req.userId
    })
    if(user && user.userType == constants.userTypes.admin){
        next()
    }else{
        return res.status(403).send({
            message : "Required Admin Role"
        })
    }
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}

module.exports = authJwt