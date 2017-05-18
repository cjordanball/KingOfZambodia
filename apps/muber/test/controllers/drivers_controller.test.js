const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
	it('POST to /api/drivers creates a new driver', (done) => {
		Driver.count().then((count) => {
			request(app)
			.post('/api/drivers')
			.send([{ email: 'toast@test.com' }, { email: 'taste@test.com' }])
			.end(() => {
				Driver.count().then((newCount) => {
					assert(count + 2 === newCount);
					done();
				});
			});
		});
	});
	it('PUT to /api/drivers updates an existing driver', (done) => {
		const driver = new Driver({ email: 'test@tester.com', driving: false });
		driver.save()
			.then((newDriver) => {
				const id = newDriver._id;
				request(app)
				.put(`/api/drivers/${id}`)
				.send({ driving: true })
				.end(() => {
					Driver.findById(id)
						.then((val) => {
							assert(val.driving === true);
							done();
						});
				});
			});
	});
	it('DELETE to /api/drivers/:id to delete an existing driver', (done) => {
		const newDriver = new Driver({ email: 'test@testeroo.com', driving: false });
		newDriver.save()
			.then(() => {
				request(app)
				.delete(`/api/drivers/${newDriver._id}`)
				.end(() => {
					Driver.findById(newDriver._id)
					.then((val) => {
						assert(!val);
						done();
					});
				});
			});
	});
	it('GET to /api/drivers finds drivers in a location', (done) => {
		const seattleDriver = new Driver({
			email: 'seattle@test.com',
			geometry: { type: 'Point', coordinates: [-122.475, 47.614] }
		});
		const miamiDriver = new Driver({
			email: 'miami@test.com',
			geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
		});
		Promise.all([seattleDriver.save(), miamiDriver.save()])
		.then(() => {
			request(app)
			.get('/api/drivers?lat=47.614&lng=-122.475')
			.end((err, response) => {
				const drivers = response.body;
				assert(drivers.length === 1);
				assert(drivers[0].obj.email === 'seattle@test.com');
				done();
			});
		});
	});
});
