const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PointSchema = new Schema({
	type: {
		type: String,
		default: 'Point'
	},
	coordinates: {
		type: [Number],
		index: '2dsphere',
		required: true
	}
});

const DriverSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	driving: {
		type: Boolean,
		default: false
	},
	geometry: {
		type: PointSchema
	}
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
