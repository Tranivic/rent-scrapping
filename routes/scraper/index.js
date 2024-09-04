const scraper = require('express').Router();

scraper.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to scraper route...' });
});

module.exports = scraper;