var users = require('../controllers/users');
const cors = require('cors');

module.exports = function (app) {
    
    app.use(cors());
    
    app.post('/api/register',users.createUser);
    
    app.get('/api/getusers',users.getUsers);
    app.get('*', function(request, response){
        response.status(404);
        response.end();
    })
}