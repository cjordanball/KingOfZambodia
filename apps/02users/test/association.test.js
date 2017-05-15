const assert = require('assert');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
	let joe, blogPost, comment;
	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		blogPost = new BlogPost({ title: 'JS is great', content: 'Yep, it really is' });
		comment = new Comment ({ content: 'What about Ruby?' });

		joe.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.author = joe;

		let sumPromise = Promise.all([joe.save(), blogPost.save(), comment.save()]);
		sumPromise.then(() => done());
	});

	it('saves a relation between a user and a blogPost', (done) => {
		User.findOne({ name: 'Joe'}).populate('blogPosts')
			.then((user) => {
				assert(user.blogPosts[0].title === 'JS is great');
				done();
			});
	});

	it('saves full relation graph', (done) => {
		User.findOne({ name: 'Joe'})
			.populate({
				path: 'blogPosts',
				model: 'blogpost',
				populate: {
					path: 'comments',
					model: 'comment',
					populate: {
						path: 'author',
						model: 'user'
					}
				}
			})
			.then((user) => {
				assert(user.name === 'Joe');
				assert(user.blogPosts[0].title === 'JS is great');
				assert(user.blogPosts[0].comments[0].content === 'What about Ruby?');
				assert(user.blogPosts[0].comments[0].author.name === 'Joe');
				done();
			})
	} )
})
