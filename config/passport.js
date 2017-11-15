var mongoose = require('mongoose'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

var user= mongoose.model('user');

module.exports = function(){
//local strategy method for passport
passport.use(new LocalStrategy(
function(username, password, done){
    user.findOne({userName:username}).exec(function(err, user){
        // if(err){return done(err);}   //refer the docs 
        if(user && user.authenticate(password)){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}
));

//Serialization for authentication
passport.serializeUser(function(user, done){
if(user){
    done(null, user._id);
}
})
//Deserialization for authentication
passport.deserializeUser(function(_id, done){
user.findOne({_id:_id}).exec(function(err, user){
    if(user){
        return done(null, user);
    }else{
        return done(null, false);
    }
})
})


}