const assert = require('assert');
const User = require('../src/user');

describe('Updating a user', () => {
	let joe;
	beforeEach((done) => {
		joe = new User({ name: 'Joe', likes: 0 });
		joe.save()
			.then(() => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find({}))
			.then(users => {
				assert(users.length === 1);
				assert(users[0].name === 'Sue');
				done();
			})
			.catch((err) => {
				console.log('ERR: ', err);
				done();
			});
	};

	it('instance type using set and save', (done) => {
		joe.set('name', 'Sue');
		assertName(joe.save(), done);
	});

	it('an instance update', (done) => {
		assertName(joe.update({name: 'Sue'}), done);
	});

	it('a class update', (done) => {
		assertName (
			User.update({ name: 'Joe' }, { name: 'Sue' }),
			done
		);
	});

	it('class method findOneAndUpdate', (done) => {
		assertName (
			User.findOneAndUpdate({ name: 'Joe' }, { name: 'Sue' }),
			done
		);
	});

	it('class method findByIdAndUpdate', (done) => {
		assertName (
			User.findByIdAndUpdate(joe._id, { name: 'Sue'}),
			done
		)
	});

	it('A user can have their post-count incremented by 1', (done) => {
		User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
			.then(() => User.find({ name: 'Joe' }))
			.then((users) => {
				assert(users[0].likes === 10);
				done();
			});
	});
});
