const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
router.use(express.json());

router.post('/', async (req, res) => {
    const prisma = new PrismaClient();
    if(req.body) {
        try {
            const data = {
                pickDate: new Date(req.body.pickDate),
                pickLocation: req.body.pickLocation,
                pickHour: req.body.pickHour,
                dropDate: new Date(req.body.dropDate),
                dropHour: req.body.dropHour,
                carGroup: req.body.carGroup,
                scrapRole: req.body.scrapRole
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