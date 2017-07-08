const roles = require('../controllers/role');
const users = require('../controllers/user');
const documents = require('../controllers/documents');
const authorization = require('../middleware/authorization');
const search = require('../controllers/search');

module.exports = (app) => {
// Role routes
/**
 * @swagger
 * definition:
 *   roles:
 *     properties:
 *       title:
 *         type: string
 */
/**
 * @swagger
 * definition:
 *   documents:
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       access:
 *         type: string
 */
/**
 * @swagger
 * definition:
 *   users:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       username:
 *         type: string
 *       roleid:
 *         type: integer
 */
/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     tags:
 *       - Roles
 *     description: Creates a new role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: role
 *         description: New Roles by admin
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/roles'
 *     responses:
 *       200:
 *         description: Successfully created
 */
  app.post('/api/v1/roles', authorization.authorize, authorization.authorizeAdmin, roles.create);
  /**
 * @swagger
 * /api/v1/roles/{id}:
 *   get:
 *     tags:
 *       - Roles
 *     description: Returns a single role
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Single Role's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single role
 *         schema:
 *           $ref: '#/definitions/roles'
 */
  app.get('/api/v1/roles', authorization.authorize, authorization.authorizeAdmin, roles.getAll);


  // User routes
  /**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: users
 *         description: Creates a new user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/users'
 *     responses:
 *       201:
 *         description: Successfully created
 */
  app.post('/api/v1/users/signup', users.create);
  /**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns the current user logged in
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Users's info
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single user currently logged in
 *         schema:
 *           $ref: '#/definitions/users'
 */
  app.get('/api/v1/users/active', authorization.authorize, users.currentUser);
  /**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/users'
 */
  app.get('/api/v1/users', authorization.authorize, authorization.authorizeAdmin, users.listAll);
  /**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
  app.delete('/api/v1/users/:id', authorization.authorize, authorization.authorizeAdmin, users.delete);
  /**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Users
 *     description: Logs in an old user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: Successfully created
 */
  app.post('/api/v1/users/login', users.login);
  /**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single user
 *         schema:
 *           $ref: '#/definitions/users'
 */
  app.get('/api/v1/users/:id', authorization.authorize, authorization.authorizeAdmin, users.findUser);
  /**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     tags: Users
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
 *       name: user
 *       in: body
 *       description: Fields for the User resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
  app.put('/api/v1/users/:id', authorization.authorize, users.update);
  /**
 * @swagger
 * /api/v1/users/{id}/documents:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns documents for a particular user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A documents user
 *         schema:
 *           $ref: '#/definitions/users'
 */
  app.get('/api/v1/users/:id/documents', authorization.authorize, users.findUserDoc);

  // Document routes
  /**
 * @swagger
 * /api/v1/documents:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: document
 *         description: Document object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/documents'
 *     responses:
 *       201:
 *         description: Successfully created
 */
  app.post('/api/v1/documents', authorization.authorize, documents.create);
  /**
 * @swagger
 * /api/v1/documents/{id}:
 *   put:
 *     tags: Document
 *     description: Updates a single document
 *     produces: application/json
 *     parameters:
 *       name: document
 *       in: body
 *       description: Fields for the document resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/documents'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
  app.put('/api/v1/documents/:id', authorization.authorize, documents.update);
  /**
 * @swagger
 * /api/v1/documents/{id}:
 *   get:
 *     tags:
 *       - Document, Documents
 *     description: Returns a single document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Document's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single document
 *         schema:
 *           $ref: '#/definitions/documents'
 */
  app.get('/api/v1/documents/:id', authorization.authorize, documents.findDoc);
  /**
 * @swagger
 * /api/v1/document/{id}:
 *   delete:
 *     tags:
 *       - Documents
 *     description: Deletes a single document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Document's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
  app.delete('/api/v1/documents/:id', authorization.authorize, documents.delete);
  /**
 * @swagger
 * /api/v1/documents:
 *   get:
 *     tags:
 *       - Document, Documents
 *     description: Returns all documents
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of documents
 *         schema:
 *           $ref: '#/definitions/documents'
 */
  app.get('/api/v1/documents', authorization.authorize, users.userDoclist);

  // Search routes
  /**
 * @swagger
 * /api/v1/search/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all matching users of that instance
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/users'
 */
  app.get('/api/v1/search/users', authorization.authorize, authorization.authorizeAdmin, search.searchUser);
  /**
 * @swagger
 * /api/v1/search/documents:
 *   get:
 *     tags:
 *       - Document, Documents
 *     description: Returns all matching documents of that instance
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/documents'
 */
  app.get('/api/v1/search/documents', authorization.authorize, search.searchDocs);
};
