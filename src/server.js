const express = require('express');
const config = require('./config');

const app = express();

app.listen(config.app.port, () => {
    console.log(`Server running at http://${config.app.baseUrl}:${config.app.port}`);
});
