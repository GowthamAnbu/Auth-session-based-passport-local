var mongoose = require('mongoose');

var Schema= mongoose.Schema;

var userSchema = new Schema({
firstName: {type:String,required:true},
lastName: {type:String,required:true},
dob:{type:String, required:true}
});

var user= module.exports = mongoose.model('User',userSchema);

module.exports.createDefaultUsers = function () {
user.find({}).exec(function(err, collection){
    if(collection.length === 0){
    var salt,hash;
    user.create({firstName:'Merrick',lastName:'Baliton',dob:'1995-12-31'});
    user.create({firstName:'Cole',lastName:'Blake',dob:'1995-11-04'});
    user.create({firstName:'Jack',lastName:'Rickson',dob:'1995-10-05'});
    }
})
};
