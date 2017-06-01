const roles = require('../controllers/role');
const users = require('../controllers/user');
const documents = require('../controllers/doc');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Create a role',
  }));

// Role routes
  app.post('/api/roles', roles.create);
  app.get('/api/roles', roles.getAll);
  app.get('/api/roles/allusers', roles.listAll);
  app.delete('/api/roles/:roleId', roles.destroy);

// User routes
  app.post('/api/users/signup', users.create);
  app.get('/api/users', users.listAll);
  app.delete('/api/users/delete/:userName', users.destroy);

// Document routes
  app.post('/api/documents', documents.create);
};
