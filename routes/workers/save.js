const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
router.use(express.json());

router.post('/', async (req, res) => {
    const prisma = new PrismaClient();
    if(req.body) {
        try {
            const { dateOut, hourOut, dateDev, hourDev, locationOut, locationDev } = req.query;
            const intervalMs = +req.query.intervalMs? +req.query.intervalMs : 0;
            const data = {
                dateOut: dateOut,
                hourOut: hourOut,
                dateDev: dateDev,
                hourDev: hourDev,
                locationOut: locationOut || "",
                locationDev: locationDev || "",
                intervalMs: intervalMs
            }
            const savedWorker = await prisma.Workers.create({ data });
            res.status(200).json({ status: 'success', msg: 'Worker saved successfully', data: savedWorker });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: 'error', msg: 'Error saving worker' });
        }
    } else {
        res.status(400).json({ status: 'error', msg: 'Invalid request body' });
    }
});


module.exports = router;