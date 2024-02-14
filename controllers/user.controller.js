const User = require('../models/user.models')
const bcrypt = require('bcryptjs')

exports.update = async(req,res)=>{
    const userIdReq = req.userId;
    try {
        const user = await User.findOneAndUpdate({
            userId: userIdReq
        }, {
            password: bcrypt.hashSync(req.body.password, 8)
        }).exec();
        res.status(200).send({

            message: `User record has been updated successfully`

        });

    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    }
}

exports.updateUser = async(req,res)=>{
    const userIdReq = req.params.userId;
    try {
        const user = await User.findOneAndUpdate({
            userId: userIdReq
        }, {
            name: req.body.name,
            userStatus: req.body.userStatus,
            userType: req.body.userType

        }).exec();
        res.status(200).send({

            message: `User record has been updated successfully`

        });
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    }
}