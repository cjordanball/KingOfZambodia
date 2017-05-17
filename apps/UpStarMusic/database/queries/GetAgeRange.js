const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
	const minAge = Artist.find({}).sort({age: 1}).limit(1).then(artists => artists[0].age);
	const maxAge = Artist.find({}).sort({ age: -1}).limit(1).then(artists => artists[0].age);
	return Promise.all([minAge, maxAge])
		.then(extremes => {
		return { min: extremes[0], max: extremes[1]};
	});
};
