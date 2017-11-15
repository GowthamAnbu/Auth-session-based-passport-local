var users = require('../controllers/users');
const cors = require('cors');

module.exports = function (app) {
    
    app.use(cors());
    
    app.get('/api/register',users.createUser);

    /* app.get('/home', users.getUsers);
    app.post('/addemployee', users.addEmployee); */
    
    app.get('*', function(request, response){
        response.status(404);
        response.end();
    })
}