const puppeteer = require('puppeteer');

exports.launch_instance = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
            resolve(browser);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
