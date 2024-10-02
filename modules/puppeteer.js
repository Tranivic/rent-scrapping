const puppeteer = require('puppeteer');
exports.launch_instance = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
            const page = await browser.newPage();
            resolve({browser, page});
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
