const scraper = require('express').Router();
const unidas = require('@routes/scraper/unidas.js');

scraper.get('/', async (req, res) => {
    try {
        res.status(200).json({ status: 'sucess', msg: 'success' });
    } catch (e) {
        res.status(500).json({ status: 'error', msg: 'error' });
    }
});
scraper.use('/unidas', unidas);

module.exports = scraper;