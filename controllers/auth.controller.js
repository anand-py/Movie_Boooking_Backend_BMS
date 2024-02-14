const User = require('../models/user.models')
const constants = require('../utils/constants')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config')

exports.signup = async(req,res)=>{
    /**
     * Inside the sign up call
     */
    var userStatus = req.body.userStatus;
    if(!req.body.userStatus){
       if(!req.body.userType || req.body.userType==constants.userTypes.customer){
        userStatus = constants.userStatus.approved;
       }else{
        userStatus = constants.userStatus.pending;  
       }
    }

    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: userStatus
    }

    try {
        const userCreated = await User.create(userObj);
        const postResponse = {
            name : userCreated.name,
            userId : userCreated.userId,
            email: userCreated.email,
            userTypes : userCreated.userType,
            userStatus : userCreated.userStatus,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
        res.status(201).send(postResponse);
    } catch(err){
        res.status(500).send({
            message : 'Some internal Server Erorr',
            err : err.message
        })
    }

}

exports.signin = async(req,res)=>{
    const user = await User.findOne({userId : req.body.userId});
    try{
        if(user == null){
            res.status(400).send({
                message : "Failed ! UserId doesn't exist"
            })
            return;
        }
        if(user.userStatus != 'APPROVED'){
            res.status(200).send({
                messgae : `can't allow`
            })
        }
        //Checkig if the password matches
    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      console.log(user.userId)
      var token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: 300 // 15 minutes
      });

      res.status(200).send({
        name : user.name,
        userId : user.userId,
        email: user.email,
        userTypes : user.userType,
        userStatus : user.userStatus,
        accessToken : token
      })
    }catch(err){
        res.status(500).send({
            message : 'Some internal Server Erorr',
            err : err.message
        })
    }
}