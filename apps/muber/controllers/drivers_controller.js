
module.exports = {
	howdy(req, res) {
		res.send({ hi: 'there' });
	},

	create(req, res) {
		console.log('Hello, new driver!', req.body);
		res.send({ test: 'test' });
	},

	update(req, res, next) {
		const driverId = req.params.id;
		const driverOptions = req.body;
		Driver.findByIdAndRemove(driverId, driverOptions)
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
