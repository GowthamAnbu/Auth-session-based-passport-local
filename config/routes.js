var users = require('../controllers/users');
const cors = require('cors');

module.exports = (app) => {
    
    app.use(cors());
    
    app.post('/api/register',users.createUser);
    
    app.get('/api/getusers',users.getUsers);
    app.get('*', (request, response) => {
        response.status(404);
        response.end();
    })
}