const mongoose = require('mongoose');
const AlbumSchema = require('./album');

mongoose.Promises = global.Promises;

const Schema = mongoose.Schema;


const ArtistSchema = new Schema({
	name: {
		type: String
	},
	age: {
		type: Number
	},
	yearsActive: {
		type: Number
	},
	image: {
		type: String
	},
	genre: {
		type: String
	},
	website: {
		type: String
	},
	netWorth: {
		type: Number
	},
	labelName: {
		type: String
	},
	retired: {
		type: Boolean
	},
	albums: [AlbumSchema]
});

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;
