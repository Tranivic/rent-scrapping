require('module-alias/register');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const unidas = require('@controller/unidas');

module.exports = async function processWorkerTask(worker) {
    console.log(`Processing worker ${worker.id} with interval ${worker.intervalMs}...`);
    try {
        const { dateOut, hourOut, dateDev, hourDev } = worker;
        const scrapedData = await unidas.unidas_price(dateOut, hourOut, dateDev, hourDev);
        const data = {
            workerID: worker.id,
            prices: JSON.stringify(scrapedData.data.prices)
        }
        if(data.prices){
            await prisma.Results.create({data});
            return
        }
        console.log("The prices were not scraped correctly!");
    } catch (e) {
        console.error(e);
    }

};