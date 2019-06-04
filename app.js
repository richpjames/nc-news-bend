const express = require('express');
const apiRouter = require('./routes/apiRouter');
const { routeNotFound, handle500 } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use(handle500);

app.use((err, req, res, next) => {
	if (err.status && err.msg === 404)
		res.status(err.status).send({
			msg: err.mres.status(400).send('Bad request'),
		});
});
module.exports = app;
