const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
	let joe, blogPost;
	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		blogPost = new BlogPost({ title: 'JS is great', content: 'Yep, it really is' });

		joe.blogPosts.push(blogPost);

		let sumPromise = Promise.all([joe.save(), blogPost.save()]);
		sumPromise.then(() => done());
	});

	it('users clean up dangling blogposts on remove', (done) => {
		joe.remove()
			.then(() => BlogPost.count())
			.then((count) => {
				assert(count === 0);
				done();
			})
	})
})
