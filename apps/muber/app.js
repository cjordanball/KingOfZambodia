const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const SwagExp = require('swagger-express-mw');
// const routes = require('./routes/routes');

const app = express();
const config = {
	appRoot: __dirname
};

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
	mongoose.connect('mongodb://localhost/muber');
}

SwagExp.create(config, (err, swagExpress) => {
	if (err) {
		throw err;
	}
	app.use(cors());
	// app.use(bodyParser.json());
	swagExpress.register(app);

	app.use((errr, req, res, next) => {
		res.status(422).send({
			okay: false,
			error: errr.message
		});
		next();
	});
	const port = process.env.PORT || 3000;
	app.listen(port);
});
// apply middlewares

// routes(app);


module.exports = app;
