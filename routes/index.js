const routes = require('express').Router();
const scraper = require('@routes/scraper/index.js')

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to all routes' });
});

routes.use('/scraper', scraper)


module.exports = routes;