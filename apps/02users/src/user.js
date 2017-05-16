const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const PostSchema = require('./postSchema');
const BlogPost = require('./blogPost');

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
	lastName: {
		type: String,
		default: 'Jones'
	},
	age: Number,
	eyes: String,
	posts: [PostSchema],
	likes: Number,
	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogpost'
	}]
});

UserSchema.virtual('postCount').get(function() {
	return this.posts.length;
});

UserSchema.pre('remove', function(next) {
	// const BlogPost = mongoose.model('blogPost');

	BlogPost.remove({ _id: { $in: this.blogPosts } })
		.then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
