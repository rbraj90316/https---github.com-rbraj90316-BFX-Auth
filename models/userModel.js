//mongoose db initialization
const mongoose = require('mongoose');
const emailValidator=require('email-validator'); 
const bcrypt=require('bcrypt');
const crypto=require('crypto');
mongoose.connect('mongodb://localhost:27017/imageDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});
  // Defining the user schema/dhacha and model:
  const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
        return emailValidator.validate(this.email);
        }    
    },
    password:{
        type:String,
       
        minLength:8
    },
    confirmPassword:{
        type:String,
        minLength:8,
        validate:function(){
        return this.confirmPassword==this.password;
        }
    },
  profilePicture:{
    type:String
  } 

  });
  userSchema.methods.createResetToken=function(){
    //creating unique token using npm crypto
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.resetToken=resetToken;
    return resetToken;
    console.log("restTKN: ", resetToken);
  }
  userSchema.pre('save',function(){
    this.confirmPassword=undefined;
  });
  //model
  const userModel=mongoose.model('userModel',userSchema);
  module.exports=userModel;