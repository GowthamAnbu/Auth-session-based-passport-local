var mongoose = require('mongoose'),
passport = require('passport'),
encrypt = require('../utilities/encryption'),
User = require('../models/user'),
LocalStrategy = require('passport-local').Strategy;

module.exports = function(){
//local strategy method for passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
(username, password, done) => {
    User.findOne({username:username,password:password}).exec((err, user) => {
        console.log("checking" + user);
        if(err){return done(err);}   //refer the docs 
        if(user && user.authenticate(password)){
            console.log(user);
            return done(null, user);
        }else{
            return done(null, false,{message:"username or password is incorrect"});
        }
    })
}
));

passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},

function(request, email, password, done) {
  process.nextTick(function() {
    User.findOne({email: email}, function(err, user) {
      if(err) {
        return done(err);
        }
      if(user) {
        // console.log('user already exists');
        return done(null, false, {errMsg: 'email already exists'});
      }
      else {
          var newUser = new User({
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            dob:request.body.dob,/* 
            password:request.body., */
            role:request.body.role,
            email:request.body.email,
            mobile:request.body.mobile,
            address:request.body.address,
            is_superuser:request.body.is_superuser,
            is_active:request.body.is_active/* ,
            salt:request.body. */
          });
          newUser.salt = encrypt.createsalt(); 
          newUser.password = encrypt.hashpwd(newUser.salt,password);
          newUser.save(function(err) {
            if(err) {
                console.log(err);
                return done(null, false);
            }
            /* console.log('New user successfully created...');
            console.log('email',email);
            console.log(newUser); */
            return done(null, newUser);
          });
        }
    });
  });
}));

//Serialization for authentication
passport.serializeUser((user, done) => {
if(user){
    done(null, user._id);
}
})
//Deserialization for authentication
passport.deserializeUser((_id, done) => {
User.findOne({_id:_id}).exec((err, user) => {
    if(user){
        return done(null, user);
    }else{
        return done(null, false);
    }
})
})


}