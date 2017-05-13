const assert = require('assert');
const User = require('../src/user');

describe('Updating a user', () => {
	let joe;
	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		joe.save()
			.then(() => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find({}))
			.then(users => {
				console.log(users[0]);
				assert(users.length === 1);
				assert(users[0].name === 'Sue');
				done();
			})
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
});
