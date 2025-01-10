const routes = require('express').Router();
const unidas = require('@routes/unidas/index.js');
const workers = require('@routes/workers/index.js');

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'connected...' });
});

routes.use('/unidas', unidas);
routes.use('/workers', workers);

module.exports = routes;