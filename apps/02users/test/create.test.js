const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
	it('saves a user', (done) => {
		const joe = new User({
			name: 'Joe'
		});
		joe.save()
			.then(() => {
				//Has joe been saved
				assert(!joe.isNew);
				assert(joe.lastName === 'Jones');
				done();
			})
			.catch((err) => {
				console.log('ERR: ', err);
				done();
			});
	});
	it ('allows override of default last name', (done) => {
		const joe = new User({
			name: 'Jordan',
			lastName: 'Ball'
		});
		joe.save()
			.then(() => {
				User.findOne( { name: 'Jordan' })
					.then((user) => {
						assert (joe.lastName === 'Ball');
						done();
					});
			});
	});
});
