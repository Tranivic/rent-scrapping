const launchInstance = require('@modules/puppeteer').launch_instance;
let reservationParams = require('@data/reservation_params.json');

const unidas_url = 'https://www.unidas.com.br/reserva/passo-1';

exports.unidas_price = async (dateOutParam,hourOutParam,dateDevParam,hourDevParam) => {
    return new Promise(async (resolve, reject) => {
        const { browser, page } = await launchInstance(false, null);
        try {
            reservationParams.stepOne.dateOut = dateOutParam;
            reservationParams.stepOne.hourOut = hourOutParam;
            reservationParams.stepOne.dateDev = dateDevParam;
            reservationParams.stepOne.hourDev = hourDevParam;
            const { dateOut, hourOut, dateDev, hourDev } = reservationParams.stepOne;
            await page.goto(unidas_url, { waitUntil: 'domcontentloaded' });
            await page.evaluate((reservationParams) => {
                sessionStorage.setItem('reservationParameters', JSON.stringify(reservationParams));
            }, reservationParams);
            await page.reload({ waitUntil: 'load' });
            const button = await page.$$('.continue');
            await page.evaluate(() => {
                const button = document.querySelectorAll('.continue')[1];
                button.scrollIntoView();
            });
            async function clickButtonUntilDone(button) {
                let buttonIsInScreen = await page.$$('.continue');
                while (buttonIsInScreen[1]) {
                    await button.click();
                    await page.waitForTimeout(3000);
                    buttonIsInScreen = await page.$$('.continue');
                }
            }
            await clickButtonUntilDone(button[1]);
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
            const response = {
                status: 200,
                msg: 'Scraping success',
                data: {
                    info: {
                        dateOut,
                        hourOut,
                        dateDev,
                        hourDev,
                    },
                    prices: [
                        ...availableCars
                    ]
                }
            };
            resolve(response);
        } catch (e) {
            reject({
                status: 500,
                message: 'Scraping failed',
            });
            console.error(e);
        } finally {
            browser.close();
        }
    });
};