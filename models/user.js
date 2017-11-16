/*
rootfile mongoose.js
server side validation is not implemented yet
*/
var mongoose = require('mongoose'),
encrypt = require('../utilities/encryption');

var Schema= mongoose.Schema;
var userSchema = new Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    dob:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:Number, required:true},
    email:{type:String, required:true,unique:true},
    mobile:{type:String, required:true},
    address:{type:String, required:true},
    is_superuser:{type: Number},
    is_active:{type: Number},
    salt:{type: String}
});
/*
schema methods allows the object to call this methods to do easy functions
code no:26 is an example of getting the password and salt of particular
object
*/
userSchema.methods={
authenticate: (passwordToMatch) => {
    return encrypt.hashpwd(this.salt, passwordToMatch) === this.password;
},
hasRole: (role) => {
    return this.role.indexOf('admin') > -1;
}
}
var user= mongoose.model('user',userSchema);
module.exports = user;
