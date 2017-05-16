const assert = require('assert');
const User = require('../src/user');

xdescribe('Selectors', () => {
	beforeEach((done) => {
		joe = new User({
			name: 'Joe',
			age: 50
		});
		jordan = new User({
			name: 'Jordan',
			age: 55,
			eyes: 'grey'
		});
		jay = new User({
			name: 'Jay',
			age: 48,
			eyes: 'blue'
		});
		Promise.all([joe.save(), jordan.save(), jay.save()])
			.then(() => {
				done();
			});
	});
	it('finds a 1 users who are less than 50', (done) => {
		User.find({ age: {$lt: 50 }})
			.then((users) => {
				assert(users.length === 1);
				done();
			});
	});
	it('finds users who are 48 or 55', (done) => {
		User.find({age: {$in:[48, 55]}})
			.then((users) => {
				assert(users.length === 2);
				done();
			});
	});
	it('finds all users whose names start with "jo"', (done) => {
		User.find({name: /Jo\w*/})
			.then((users) => {
				assert(users.length === 2);
				done();
			});
	});
	it('finds all users who are named Jordan, and (have grey eyes or are 48)', (done) => {
		User.find({name: 'Jordan', $or: [{eyes: 'grey'}, {age: 48}]})
			.then((users) => {
				assert(users.length === 1);
				done();
			});
	});
	it ('finds all users named Jay who have an eye color that is not grey', (done) => {
		User.find({ $and:[{ name: 'Jay' }, {eyes: {$not: { $eq: 'grey' }}}] })
		.then((users) => {
			assert(users.length === 1);
			done();
		})
	})
})
