const routes = require('express').Router();
const scrap = require('@routes/scrap/index.js');
const workers = require('@routes/workers/index.js');

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'connected...' });
});

routes.use('/scrap', scrap);
routes.use('/workers', workers);

module.exports = routes;