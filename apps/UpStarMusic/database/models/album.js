const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
	title: {
		type: String
	},
	date: {
		type: Date
	},
	copiesSold: {
		type: Number
	},
	numberTracks: {
		type: Number
	},
	image: {
		type: String
	},
	revenue: {
		type: Number
	}
});

module.exports = AlbumSchema;
