const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
	const query = Artist.find(queryBuilder(criteria))
		.sort({ [sortProperty]: 1 })
		.skip(offset)
		.limit(limit);

	return Promise.all([query, Artist.find(queryBuilder(criteria)).count()])
		.then((results) => {
			return {
				all: results[0],
				count: results[1],
				offset,
				limit
			};
		});
};

const queryBuilder = (criteria) => {
	const queryArray = [];

	if ('name' in criteria && criteria.name) {
		queryArray.push({ $text: { $search: criteria.name } });
	}
	if ('age' in criteria) {
		const { age: { min, max } } = criteria;
		queryArray.push({ age: { $gte: min, $lte: max } });
	}
	if ('yearsActive' in criteria) {
		const { yearsActive: { min, max } } = criteria;
		queryArray.push({ yearsActive: { $gte: min, $lte: max } });
	}
	return queryArray.length ? { $and: queryArray } : {};
};
