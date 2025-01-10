require('module-alias/register');
const express = require('express');
const routes = require('@routes');

const app = express();
const port = process.env.PORT || 2020;

app.use('/', routes);

async function startServer() {
    try {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to launch Puppeteer:', error);
    }
}

startServer();
