# Document Management System

[![Build Status](https://travis-ci.org/andela-doni/doc-manager.svg?branch=dev)](https://travis-ci.org/andela-doni/doc-manager)   [![Coverage Status](https://coveralls.io/repos/github/andela-doni/doc-manager/badge.svg)](https://coveralls.io/github/andela-doni/doc-manager)
The application is available on Heroku [https://doc-manager-app.herokuapp.com/] 
A full stack document management system, complete with roles and privileges. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.

### Table of Contents

  - Technologies
  - Functionalities
  - Setup and Installation
  - How to contribute
  - Limitations
  - Faqs
  

### Technologies 
The technologies used are:

* [React js](https://facebook.github.io/react/) - HTML enhanced for web apps!
* [node.js] - evented I/O for the backend
* [PostgresDatabase(ORM)](https://www.postgresql.org/)- PostgreSQL is a powerful, open source object-relational database system. 
* [Sequelize](http://docs.sequelizejs.com/) - great UI boilerplate for modern web apps
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Webpack](https://webpack.js.org/) - webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser
* [Materialize Css](http://breakdance.io) - Materialize is a UI component library created with CSS, JavaScript, and HTML.
* [Babel](https://babeljs.io/) -The compiler for writing next generation JavaScript.

  
### Functionalities

Documents
- Create documents
- Update Document
- Delete Document
- Search for documents

Users
- Create Users
- Update Users
- Delete Users
- Search for users
Role
- Create Roles( Admin and General Users)
 
#### EndPoints
| End Points | Functionality |
| ------ | ------ |
| POST /users/login | Logs a user in. |
|POST /users/logout | Logs a user out. |
|POST /users/| Creates a new user. |
|GET /users/|Find matching instances of user. |
| GET /users/?limit={integer}&offset={integer} | Pagination for users. |
|GET /users/<id>|Find user. |
| PUT /users/<id> |Update user attributes. |
| DELETE /users/<id> | Delete user. |
| POST /documents/ | Creates a new document instance. |
| GET /documents/ | Find matching instances of document. |
|GET /documents/?limit={integer}&offset={integer}| Pagination for docs.|
|GET /documents/<id>| Find document. |
| PUT /documents/<id> | Update document attributes.|
| DELETE /documents/<id> | Delete document. |
| GET /users/<id>/documents| Find all documents belonging to the user. |
| GET /search/users/?q={} | Search for a user. |
| GET /search/documents/?q={doctitle} |Search for a doc. |

### Installation

Doc-Manager requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd doc-manager
$ npm install 
$ npm start
```
### How to Contribute
To contribute to this project:
1. Fork the project & clone locally
2. Create an upstream remote and sync your local copy before you branch
3. Branch for each separate piece of work.
4. Do the work, write good commit messages, and read the CONTRIBUTING file if there is one.
5. Push to your origin repository
6. Create a new PR in GitHub.
7. Respond to any code review feedback

### Limitations
1. Only text document files can be created and managed with this application
2. No Google/ Facebook/ Github login available
3. Limit in the size of documents

### FAQ
1. How can i contact the owner of this project?
- You can send in a comment on this repository
2. How can i contribute to this project?
    To contribute to this project:
    1. Fork the project & clone locally
    2. Create an upstream remote and sync your local copy before you branch
    3. Branch for each separate piece of work.
    4. Do the work, write good commit messages, and read the CONTRIBUTING file if there is one.
    5. Push to your origin repository
    6. Create a new PR in GitHub.
    7. Respond to any code review feedback


