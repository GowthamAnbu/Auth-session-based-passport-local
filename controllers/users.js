/*
rootfiles routes.js 
*/
var user = require('../models/user');
encrypt = require('../utilities/encryption');

exports.RegisterUser = (request, response, next) => {
var userData = request.body;

userData.email = userData.email.toLowerCase();
userData.salt = encrypt.createsalt();
userData.password = encrypt.hashpwd(userData.salt, userData.password); 

user.create(userData, (err, user) => {
    if(err){
        if(err.toString().indexOf('E11000') > -1){
            err = new Error('Duplicate username');
        }
        response.status(400);//Bad Request
        return response.send({reason:err.toString()});
    }
    request.logIn(user, (err) => {
        if(err) {return next(err);}
        response.status(201);//Created
        response.end();
    })
})
};

exports.login = (request, response) => {
    var loginForm = request.body;
    //password salt problem
    user.findOne({email:loginForm.email,password:loginForm.password},{firstName:1,lastName:1}).exec((err, collection) => {
        if(err){
            respose.status(400);
            return response.send({reason:err.toString()});
        }
        if(collection === null){
            err = new Error("username or password is incorrect");
            response.status(400);
            return response.send({reason:err.toString()});
        }
        response.status(202);//Accepted
		response.send(collection);
	})
};

/* exports.getUsers = (request, response) => {
    user.find({}).exec((err, collection) => {
        if(err){
            response.status(400);
            console.log("server error");
            return response.send({reason:err.toString()});
        }
        response.json(collection);
    })
}; */