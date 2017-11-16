var users = require('../controllers/users');
const cors = require('cors');
var auth = require('./auth');

module.exports = (app) => {
    
    app.use(cors());
    
    app.post('/api/register',auth.register);
    app.post('/api/login',auth.authenticate);
    // app.get('/api/getusers',users.getUsers);

    app.get('*', (request, response) => {
        response.status(404);
        response.end();
    })
}