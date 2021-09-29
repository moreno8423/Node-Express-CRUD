const mongoose = require('mongoose');
const Schema =  mongoose.Schema

//User Schema
const userSchema  = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    gender: String
});


 let User = mongoose.model('User', userSchema);
 module.exports = User;