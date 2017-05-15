const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	content: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
