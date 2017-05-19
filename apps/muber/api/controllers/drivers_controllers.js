const Driver = require('../../models/driver');

const howdy = (req, res) => {
	res.send({ hi: 'there' });
};

const create = (req, res, next) => {
	Driver.create(req.swagger.params.newDrivers.value)
	.then((drivers) => {
		res.send({
			okay: true,
			saved: drivers
		});
	})
	.catch(next);
};

const index = (req, res, next) => {
	const { lng, lat } = req.swagger.params;
	Driver.geoNear(
		{ type: 'Point', coordinates: [parseFloat(lng.value), parseFloat(lat.value)] },
		{ spherical: true, maxDistance: 200000 }
	)
	.then((drivers) => {
		res.send(drivers);
	})
	.catch(next);
};

const update = (req, res, next) => {
	console.log('in update');
	const driverId = req.swagger.params.id.value;
	const driverOptions = req.swagger.params.changeObject.value;
	Driver.findByIdAndUpdate(driverId, driverOptions)
	.then(() => {
		Driver.findById(driverId)
		.then(driver => res.send(driver))
		.catch(next);
	});
};

const remove = (req, res, next) => {
	console.log('remeove');
	const driverId = req.swagger.params.id.value;
	console.log('id', driverId);

	Driver.findByIdAndRemove(driverId)
	.then((driver) => {
		console.log('driver', driver);
		res.status(200).send({
			okay: true,
			deleted: driver
		});
	})
	.catch(next);
};

module.exports = {
	howdy,
	create,
	index,
	update,
	remove
};
