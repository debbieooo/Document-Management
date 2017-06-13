const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./server/config/config.json'); // get our config file
const dotenv = require('dotenv');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

dotenv.config();
// Set up the express app
const app = express();

// if(process.env.NODE_ENV !== 'test') {
//   const compiler = webpack(webpackConfig);
//   app.use(webpackHotMiddleware(compiler, {
//     noInfo: true,
//     publicPath: webpackConfig.output.publicPath
//   }));
//   app.use(webpackHotMiddleware(compiler));
// }

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

module.exports = app;
