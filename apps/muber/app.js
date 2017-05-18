const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
	mongoose.connect('mongodb://localhost/muber');
}
// apply middlewares
app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
	res.status(422).send({
		okay: false,
		error: err.message
	});
	next();
});

module.exports = app;
