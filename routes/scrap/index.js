const scraper = require('express').Router();
const unidas = require('@controller/unidas');

scraper.get('/unidas', async (req, res) => {
    try {
        const response = await unidas.unidas_price();
        res.status(200).json(response);
    } catch (e) {
        console.error(e);
        res.status(500).json({ status: 'error', msg: 'Error in scrap route...' });
    }
});


module.exports = scraper;