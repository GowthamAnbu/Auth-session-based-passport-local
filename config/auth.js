var passport = require('passport');

exports.authenticate = (request, response, next) => {
		request.body.email = request.body.email.toLowerCase(); 
		
		var auth = passport.authenticate('local',(err, user) => {
			if(err){return next(err);}
			if(!user){response.send({success:false,message:"username or password is incorrect"});}
			/*passport primarily adds the login to the request object 
			but in the custom login developer has to set the send object to response object
			*/
			request.logIn(user, (err) => {
				if(err){return next(err);}
				response.send({success:true, user:user});
			})
		})
		auth(request, response, next);
};

exports.register = (request, response, next) => {

	var reg = passport.authenticate('local-signup',(err, user) =>{
		if(err){return next(err);}
		if(!user){
			response.status(400);
			response.send({message:"email already exists"});
		}
		request.logIn(user, (err) => {
			if(err){return next(err);}
			response.status(201);
			response.send({message:"user created successfully"});
		})
	})
	reg(request, response, next);
};


/*
request.isAuthenticated() is a default function in passport
which returns true if the user is logged in 
else false
*/
exports.requiresApiLogin = (request, response, next) => {
	if(!request.isAuthenticated()){
		response.status(403);
		response.end();
	} else{
		next();
	}
};
/*
requiresRole is created to check whether logged in as well as is admin
to authorize the users
*/
/* exports.requiresRole = function(role){
	return function(request, response, next){
		if(!request.isAuthenticated() || request.user.roles.indexOf(role) === -1){
			response.status(403);
			response.end();
		} else{
			next();
		}
	}
} */