const Driver = require('../models/driver');

module.exports = {
	howdy(req, res) {
		res.send({ hi: 'there' });
	},

	create(req, res, next) {
		Driver.create(req.body)
		.then((drivers) => {
			res.send({
				okay: true,
				saved: drivers
			});
		})
		.catch(next);
	},

	update(req, res, next) {
		const driverId = req.params.id;
		const driverOptions = req.body;
		Driver.findByIdAndUpdate(driverId, driverOptions)
		.then(() => {
			Driver.findById(driverId)
			.then(driver => res.send(driver))
			.catch(next);
		});
	},

	delete(req, res, next) {
		const driverId = req.params.id;

		Driver.findByIdAndRemove(driverId)
		.then(driver => res
			.status(204)
			.send(driver)
		)
		.catch(next);
	}
};
