/*
rootfile mongoose.js
server side validation is not implemented yet
*/
var mongoose = require('mongoose'),
encrypt = require('../utilities/encryption');

var Schema= mongoose.Schema;
var userSchema = new Schema({
    firstName: {type:String,required:true},
    lastName: {type:String,required:true},
    email:{type:String, required:true,unique:true},
    dob:{type:String, required:true}
});
/*
schema methods allows the object to call this methods to do easy functions
code no:26 is an example of getting the password and salt of particular
object
*/
userSchema.methods={
authenticate: (passwordToMatch) => {
    return encrypt.hashpwd(this.salt, passwordToMatch) === this.hashed_pwd;
},
hasRole: (role) => {
    return this.role.indexOf('admin') > -1;
}
}
var user= module.exports = mongoose.model('user',userSchema);
