const Driver = require('../models/driver');

module.exports = {
	howdy(req, res) {
		res.send({ hi: 'there' });
	},

	index(req, res, next) {
		const { lng, lat } = req.query;
		Driver.geoNear(
			{ type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
			{ spherical: true, maxDistance: 200000 }
		)
		.then((drivers) => {
			res.send(drivers);
		})
		.catch(next);
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
