const app = require('./app.js')

const PORT = process.env.PORT || 2020;

async function startServer() {
    try {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to launch Puppeteer:', error);
    }
}

startServer();