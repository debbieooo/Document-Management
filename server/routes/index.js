const roles = require('../controllers/role');
const users = require('../controllers/user');
const documents = require('../controllers/doc');
const authorization = require('../middleware/authorization');
const search = require('../controllers/search');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Create a role',
  }));

// Role routes
  app.post('/api/roles', roles.create);
  app.get('/api/roles', roles.getAll);
  // app.get('/api/roles/allusers', roles.listAll);

// User routes
  app.post('/api/users/signup', users.create);
  app.get('/api/users', users.listAll);
  app.delete('/api/users/:id', authorization.authorize, users.delete);
  app.post('/api/users/login', users.login);
  app.get('/api/users/:id', users.findUser);
  app.put('/api/users/:id', users.update);
  app.get('/api/users/:id/documents', users.findUserDoc);

// Document routes
  app.post('/api/documents', documents.create);
  app.put('/api/documents/:id', documents.update);
  app.get('/api/documents/:id', documents.findDoc);
  // app.get('/api/documents/:title', documents.findDoc);
  app.delete('/api/documents/:id', documents.delete);

// Search routes
  app.get('/api/search/users', search.searchUser);
};
