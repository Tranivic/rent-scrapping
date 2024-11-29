const puppeteer = require('puppeteer');
const proxies = require('@data/proxies.json');

const proxys = {
    value: null,
    useLimit: 10,
    usage: 0,
    protocol: 'http://',
    user: '',
    password: '',
};

proxys.value = proxies[Math.floor(Math.random() * proxies.length)];

exports.launch_instance = (useProxys, proxy, headless = 'new') => {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({ headless: headless, args: [useProxys ? `--proxy-server=${proxys.protocol}${proxy ? proxy : proxys.value}` : '', '--no-sandbox'] });
            const page = await browser.newPage();
            this.prevent_resource_download(page);
            if (useProxys) {
                await page.authenticate({
                    username: proxys.user,
                    password: proxys.password,
                });
            }
            resolve({ browser, page });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

exports.prevent_resource_download = async (recivedPage) => {
    await recivedPage.setRequestInterception(true);
    recivedPage.on('request', (req) => {
        const resourceType = req.resourceType();
        if (
            resourceType === 'stylesheet' ||
            resourceType === 'image' ||
            resourceType === 'font' ||
            resourceType === 'media' ||
            resourceType === 'texttrack'
        ) {
            req.abort();
        } else {
            req.continue();
        }
    });
};
