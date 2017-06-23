const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./server/config/config.js'); // get our config file
const dotenv = require('dotenv');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const pathurl = path.join(__dirname, './server/routes/*.js');
console.log('swagger', pathurl);

dotenv.config();
// Set up the express app
const app = express();
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Document Manager Swagger API',
    version: '1.0.0',
    description: 'Api documentation for document management system'
  },
  host: 'localhost:8000',
  basePath: '/'
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [pathurl]
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// if(process.env.NODE_ENV !== 'test') {
//   const compiler = webpack(webpackConfig);
//   app.use(webpackHotMiddleware(compiler, {
//     noInfo: true,
//     publicPath: webpackConfig.output.publicPath
//   }));
//   app.use(webpackHotMiddleware(compiler));
// }

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
// secret variable
app.set('superSecret', config.secret);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/client/public')));
require('./server/routes')(app);
// Setup a default catch-all route that
// sends back a welcome message in JSON format.

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client/public/index.html'))
);
// serve swagger

module.exports = app;
