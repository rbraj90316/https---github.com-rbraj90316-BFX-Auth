const express = require('express');
const app=express();
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const JWT_KEY = require('../secrets');
//middleware to find user id from token
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, JWT_KEY, (err, decoded) => {
            if (err) {
                req.user = undefined;
            } else {
                req.user = decoded;
            }
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});
module.exports.updateUser=async function updateUser(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, JWT_KEY);
        console.log(payload);
        if (!payload) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
        const userId = payload.payload;
        let user=await userModel.findById(userId);
    let dataToBeUpdated = req.body;
    if(user){
        const keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        for(let i=0;i<keys.length;i++){
            user[keys[i]]=dataToBeUpdated[keys[i]];
        }
        const updatedData=await user.save();
    res.json({
        message: "data updated successfully",
        data:user
    });
    }
    else{
      res.json({
        message:'user not found'
        });
    }
        
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
module.exports.deleteUser = async function(req, res) {
    try {
        // Extract token from the Authorization header
        const token = req.headers.authorization.split(' ')[1]; 
        // Verify the token
        const payload = jwt.verify(token, JWT_KEY);
        if (!payload) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
        // Delete the user based on the payload's ID
        const userId = payload.payload;
        const user = await userModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        return res.json({
            message: 'User deleted successfully',
            data:user
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
