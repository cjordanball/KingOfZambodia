module.exports = {
	howdy(req, res) {
		res.send({ hi: 'there' });
	},

	create(req, res) {
		console.log('Hello, new driver!', req.body);
		res.send({ test: 'test' });
	}
};
