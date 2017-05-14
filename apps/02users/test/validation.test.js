const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
	function checkValidation(user, testMessage) {
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;
		console.log('mess: ', message);
		assert (message === testMessage);
	}

	it('requires a user name', (done) => {
		const user = new User({
			name: undefined,
			postCount: 20
		});
		checkValidation(user, 'Name is required.');
		done();
	});

	it('requires a name longer than 2 chars', (done) => {
		const user = new User({
			name: 'jo',
			postCount: 20
		});
		checkValidation(user, 'Name must be longer than 2 chars.');
		done();
	});

	it('requires a name of Jo... or Sue', (done) => {
		const user = new User({
			name: 'Jasmine',
			postCount: 20
		});
		checkValidation(user, 'Name must start with "jo" or be "sue"');
		done();
	})

	it('disallows invalid records from being saved', (done) => {
		const user = new User({ name: 'Al'});
		user.save()
			.catch((validationResult) => {
				let { message } = validationResult.errors.name;
				console.log('val', message);
				assert( message === 'Name must start with "jo" or be "sue"');
				done();
			})
	});


});
