/*
rootfiles routes.js 
*/
var user = require('../models/user');
encrypt = require('../utilities/encryption');


exports.getUsers =  function(request, response){
    user.find({}).exec(function(err, collection){
        response.send(collection);
    })
};

exports.createUser = function(request, response, next){
var userData = request.body;

userData.userName = userData.userName.toLowerCase();
userData.salt = encrypt.createsalt();
userData.hashed_pwd = encrypt.hashpwd(userData.salt, userData.password); 
user.create(userData, function(err, user){
    if(err){
        if(err.toString().indexOf('E11000') > -1){
            err = new Error('Duplicate username');
        }
        response.status(400);
        console.log("server error");
        return response.send({reason:err.toString()});
    }
    request.logIn(user, function(err){
        if(err) {return next(err);}
        response.status(201);
        response.end();
    })
})
};


exports.getUsers = function(request, response){
    user.find({}).exec(function(err, collection){
        if(err){
            response.status(400);
            console.log("server error");
            return response.send({reason:err.toString()});
        }
        response.json(collection);
    })
}