var mongoose = require('mongoose'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

var user= mongoose.model('user');

module.exports = function(){
//local strategy method for passport
passport.use(new LocalStrategy(
(email, password, done) => {
    user.findOne({email:email}).exec((err, user) => {
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
passport.serializeUser((user, done) => {
if(user){
    done(null, user._id);
}
})
//Deserialization for authentication
passport.deserializeUser((_id, done) => {
user.findOne({_id:_id}).exec((err, user) => {
    if(user){
        return done(null, user);
    }else{
        return done(null, false);
    }
})
})


}