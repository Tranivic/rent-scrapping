const workers = require('express').Router();
const save_worker = require('@routes/workers/save.js');

workers.use('/save', save_worker);

module.exports = workers;