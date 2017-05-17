const mongoose = require('mongoose');

mongoose.Promises = global.Promises;
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	driving: {
		type: Boolean,
		default: false
	}
	// location:
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
