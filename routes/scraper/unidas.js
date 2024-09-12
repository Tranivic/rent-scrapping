const router = require('express').Router();
const puppeteer = require('@modules/puppeteer');

router.get('/', async (req, res) => {
    let browser;
    try {
        browser = await puppeteer.launch_instance();
        setTimeout(async () => {
            await browser.close();
            res.status(200).json({ status: 'success', msg: 'Puppeteer browser worked well...' });
        }, 1000);
    } catch (e) {
        console.error('Error launching Puppeteer:', e);
        if (browser) {
            await browser.close();
        }
        res.status(500).json({ status: 'error', msg: 'Error in launch puppeteer browser' });
    }
});

module.exports = router;