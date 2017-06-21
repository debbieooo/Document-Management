const roles = require('../controllers/role');
const users = require('../controllers/user');
const documents = require('../controllers/doc');
const authorization = require('../middleware/authorization');
const search = require('../controllers/search');

module.exports = (app) => {


// Role routes
  app.post('/api/roles', roles.create);
  app.get('/api/roles', roles.getAll);


// User routes
  app.get('/api/users/active', authorization.authorize, users.currentUser);
  app.post('/api/users/signup', users.create);
  app.get('/api/users', authorization.authorize, authorization.authorizeAdmin, users.listAll);
  app.delete('/api/users/:id', authorization.authorize, authorization.authorizeAdmin, users.delete);
  app.post('/api/users/login', users.login);
  app.get('/api/users/:id', authorization.authorize, authorization.authorizeAdmin, users.findUser);
  app.put('/api/users/:id', authorization.authorize, users.update);
  app.get('/api/users/:id/documents', authorization.authorize, users.findUserDoc);

// Document routes
  app.post('/api/documents', authorization.authorize, documents.create);
  app.put('/api/documents/:id', authorization.authorize, documents.update);
  app.get('/api/documents/:id', authorization.authorize, documents.findDoc);
  app.delete('/api/documents/:id', authorization.authorize, documents.delete);
  app.get('/api/documents', authorization.authorize, authorization.authorizeAdmin, users.userDoclist);

// Search routes
  app.get('/api/search/users', authorization.authorize, authorization.authorizeAdmin, search.searchUser);
  app.get('/api/search/documents', authorization.authorize, search.searchDocs);
};
