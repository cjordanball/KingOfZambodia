const express = require ('express');
const routes = require('./routes/routes');
const app = express();

routes(app);

module.exports = app;
