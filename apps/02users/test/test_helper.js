const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/users_test');
mongoose.connection
	.once('open', () => console.log('Good to go!'))
	.on('error', (error) => {
		console.warn('Warning:', error);
	});
