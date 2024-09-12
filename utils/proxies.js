const generateRandomNumber = require('@mixins/utils').generate_random_number;

exports.get_stored_proxy = (randomize, proxyIndex) => {
    const proxyList = require('@public/proxies/proxies.json');

    if (randomize) {
        const randomNumber = generateRandomNumber(1, proxyList.length - 1);
        console.log(`Proxy selected for extract: ${randomNumber} - ${proxyList[randomNumber]}`);
        return proxyList[randomNumber];
    } else {
        console.log(`Proxy selected for extract: ${proxyIndex} - ${proxyList[proxyIndex]}`);
        return proxyList[proxyIndex];
    }
};

exports.get_ip = async (page) => {
    await page.goto('https://httpbin.org/ip');
    const body = await page.$('body');
    const ip = await page.evaluate(body => body.textContent, body);
    return JSON.parse(ip).origin;
};


exports.autenticate_proxy = async (page, username, password) => {
    await page.authenticate({
        username: username,
        password: password,
    });
};