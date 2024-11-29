const routes = require('express').Router();
const scraper = require('@routes/scraper/index.js');
const workers = require('@routes/workers/index.js');

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'connected...' });
});

routes.use('/scraper', scraper);
routes.use('/workers', workers);

module.exports = routes;