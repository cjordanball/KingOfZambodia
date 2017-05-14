const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required.'],
		match: [/^jo\w*|sue$/i, 'Name must start with "jo" or be "sue"'],
		validate: {
			validator: (name) => name.length > 2,
			message: 'Name must be longer than 2 chars.'
		},
	},
	postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
