const express = require('express');
const userRouter = express.Router();
const {updateUser, deleteUser } = require('../controllers/userController')
const { signupWithImage, login, forgetpassword, logout } = require('../controllers/authController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
userRouter
.route('/signup')
.post(upload.single('image'),signupWithImage)
// user ke options
userRouter
    .route('/delete')
    .delete(deleteUser)
userRouter
    .route('/update')
    .patch(updateUser)
userRouter
    .route('/login')
    .post(login)

userRouter
    .route('/forgetpassword')
    .post(forgetpassword)
userRouter
    .route('/logout')
    .get(logout)  
module.exports = userRouter;