const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
	it('can create a subdocument', (done) => {
		const joe = new User({
			name: 'Joe',
			postCount: 1,
			posts: [{ title: 'Post a Title' }],
		});
		joe.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user.posts[0].title === 'Post a Title');
				done();
			})
	});
	it('can add subdocuments to an existing record', (done) => {
		const joe = new User({
			name: 'Joe',
			postCount: 0,
			posts: [],
		});
		joe.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				user.posts.push({ title: 'New Post' });
				return user.save();
			})
			.then(() => User.findOne( { name: 'Joe' }))
			.then((user) => {
				assert(user.posts[0].title === 'New Post');
				done();
			})
	});
	it('can remove subdocuments of an existing record', (done) => {
		const joe = new User({
			name: 'Joe',
			postCount: 1,
			posts: [{ title: 'The Winter or Our Discontent' }],
		});
		joe.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				let index = user.posts.findIndex(val => {
					return val.title.search(/Winter/i);
				});
				const post = user.posts[index];
				post.remove();
				return user.save();
			})
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user.posts.length === 0);
				done();
			});
	});
})
