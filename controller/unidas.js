const launchInstance = require('@modules/puppeteer').launch_instance;
const reservationParams = require('@data/reservation_params.json');
const quotation = require('@data/quotation.json');

const unidas_url = 'https://www.unidas.com.br/reserva/passo-2';

exports.unidas_price = async () => {
    const { browser, page } = await launchInstance();
    try {
        await page.goto(unidas_url, { waitUntil: 'domcontentloaded' });
        await page.evaluate((reservationParams, quotation) => {
            sessionStorage.setItem('reservationParameters', JSON.stringify(reservationParams));
            sessionStorage.setItem('quotation', JSON.stringify(quotation));

        }, reservationParams, quotation);
        await page.reload({ waitUntil: 'load' });
        const availableCars = await page.evaluate(() => {
            const formatPrice = input => parseFloat(input.replace(/[^0-9.,]/g, '').replace(',', '.'));
            const formatGroup = input => input.replace("Grupo", "").trim();
            return Array.from(document.querySelectorAll('.card')).map(card => {
                const title = card.querySelector('.card__title')?.innerText;
                const group = card.querySelector('.card__description')?.innerText;
                const price = card.querySelector('.normal-payment__value p')?.innerText;
                return title ? {
                    title,
                    group: group && formatGroup(group),
                    price: price && formatPrice(price)
                } : null;
            }).filter(item => item);
        });
        console.log(availableCars);        
    } catch (e) {
        console.log(e);
    } finally {
        setTimeout(() => {
            browser.close();
        }, 100);
    }
};