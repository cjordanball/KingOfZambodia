const assert = require('assert');
const User = require('../src/user');

describe.only('Reading users out of database', () => {
	let joe;

	beforeEach((done) => {
		alex = new User({ name: 'Alex' });
		joe = new User({ name: 'Joe'});
		jordan = new User({ name: 'Jordan' });
		maria = new User({ name: 'Maria' });
		zack = new User({ name: 'Zack'});
		Promise.all([joe.save(), jordan.save(), alex.save(), maria.save(), zack.save()])
			.then(() => done());
	});

	it('finds all users with name of Joe', (done) => {
		User.find({ name: 'Joe' })
			.then((users) => {
				assert(users[0].id.toString() === joe._id.toString());
				done();
			})
			.catch((err) => { console.error('Error: ', err)});
	});

	it('finds a user with a particular id', (done) => {
		User.findOne({ _id: joe._id })
			.then((user) => {
				assert(user.name === 'Joe');
				done();
			})
	});
	it('can skip and limit the result set', (done) => {
		User.find({})
			.sort({ name: 1 })
			.skip(1)
			.limit(2)
			.then((users) => {
				assert(users[0].name === 'Joe');
				assert(users[1].name === 'Jordan');
				assert(users.length === 2);
				done();
			})

	})
});
