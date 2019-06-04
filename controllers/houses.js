const { updateHousePoints } = require('../models/votes');

exports.patchHousebyId = (req, res, next) => {
	const increment = req.body.inc_house_points;
	const { house_id } = req.params;
	updateHousePoints(house_id, increment)
		.then(([house]) => {
			if (!house) return Promise.reject({ status: 404, msg: 'house id not found' });
			res.status(200).send({ house });
		})
		.call(next);
};
