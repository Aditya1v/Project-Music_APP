const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  username:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    // minlength: 8,
    // maxlength: 20,
    // match: [
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,20}$/,
    //   "Password must contain 8-20 characters, at least one uppercase, one lowercase, one number and one special character."
    // ]
  },
  role:{
    type: String,
    enum: ['user' , 'artist'],
    default:'user'
  }

})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel;