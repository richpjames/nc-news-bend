const db = require('../db/connection.js');

exports.updateHousePoints = (house_id, increment) => {
	return db('houses')
		.where({ house_id })
		.increment('house_points', increment)
		.returning('*');
};
