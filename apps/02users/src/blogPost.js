const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const BlogPostSchema = new Schema({
	title: String,
	content: String,
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'comment'
	}]
})

const BlogPost = mongoose.model('blogpost', BlogPostSchema);

module.exports = BlogPost;
