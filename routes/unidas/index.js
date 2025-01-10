const scraper = require('express').Router();
const unidas = require('@controller/unidas');

scraper.get('/scrap/', async (req, res) => {
    try {
        const mandatoryParams = ["dateOut", "hourOut", "dateDev", "hourDev"]
        const { dateOut, hourOut, dateDev, hourDev } = req.query;
        [dateOut, hourOut, dateDev, hourDev].forEach((param, i) => {
            if (!param) {
                throw new Error(`The ${mandatoryParams[i]} param was not informed!`);
            }
        });
        const response = await unidas.unidas_price(dateOut, hourOut, dateDev, hourDev);
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({
            status: 'error',
            msg: e.message,
        });
        console.error(e);
    }
});

module.exports = scraper;