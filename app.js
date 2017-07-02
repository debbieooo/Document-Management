const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./server/config/config.js');
const dotenv = require('dotenv');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const pathurl = path.join(__dirname, './server/routes/*.js');
dotenv.config();
const app = express();
const swaggerDefinition = {
  info: {
    title: 'Document Manager Swagger API',
    version: '1.0.0',
    description: 'Api documentation for document management system'
  },
  host: 'localhost:8000',
  basePath: '/'
};
const options = {
  swaggerDefinition,
  apis: [pathurl]
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.set('superSecret', config.secret);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/client/public')));
require('./server/routes')(app);
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client/public/index.html'))
);
module.exports = app;
