var user = require('../models/user');

exports.getUsers =  function(request, response,next){
    user.find({}).exec(function(err, collection){
        response.json(collection);
    })
};

exports.addEmployee = function(request, response){
    var employee = new user({
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        dob:request.body.dob
    });
    employee.save({}, function(err){
        if (err){
            response.send({success:false,message:"unable to add user"});
        } 
        response.send({success:true,message:"user added successfully !"});
    })
};
