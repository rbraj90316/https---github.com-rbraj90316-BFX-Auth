const express = require('express');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {sendMail}=require('../utility/nodemailer');
const JWT_KEY = require('../secrets');
const { encrypt } = require('../utils/imageEncryption');
const bcrypt=require('bcrypt');
// sign up user
module.exports.signupWithImage = async function signupWithImage(req, res) {
    try {
        const dataObj = req.body;
        const user = await userModel.create(dataObj);
        if (!user || !req.file) {
            return res.json({
                message: 'Error while signing up'
            });
        }
        // Encrypt the uploaded image data
        const encryptedImageData = await encrypt(req.file.buffer);
        // Store encrypted image data in the user's profilePicture field
        user.profilePicture = encryptedImageData;
        await user.save();
        res.json({
            message: 'User signed up with encrypted profile picture',
            data: user
        });
    } catch (err) {
        res.json({
            message: err.message
        });
    }
};
// login user
module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {              
                if (data.password==user.password) {
                    let uid = user._id;
 
                    let token = jwt.sign({ payload: uid }, JWT_KEY);

                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: 'User has logged in',
                        token:token,                
                        data:user  
                    });
                } else {
                    return res.json({
                        message: 'Wrong credentials'
                    });
                }
            } else {
                return res.json({
                    message: 'Operation is not allowed'
                });
            }
        } else {
            return res.json({
                message: 'Empty field found'
            });
        }
    } catch (err) {
        return res.json({
            message: err.message
        });
    }
};
//forget password
module.exports.forgetpassword = async function forgetpassword(req, res) {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            const resetToken = user.createResetToken();
            console.log(resetToken );
            http://abc.com//resetpassword/resetToken;
            resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //send mail to user-
            console.log(resetPasswordLink);
            let Obj={
                resetPasswordLink:resetPasswordLink,
                email:email
            }
            sendMail("resetpassword",Obj);
            return res.json({
            message:'Password reset successfully'
            });
        }
        else {
            return res.json({
                message: 'please signup'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}
//logout user
module.exports.logout=function logout(req,res){
        res.cookie('login',' ',{maxAge:1});//maxAge:1 millisecond
        res.json({
        message:'user logged out successfully'
        });  
}