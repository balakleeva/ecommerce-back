require('dotenv').config();
const express = require('express')
const { sequelize } = require('./model');
const server = express();
const bodyParser = require('body-parser');
const api = require('./routes/api');

sequelize.authenticate().then(async () => {
    await sequelize.sync();
    console.log('DB CONNECTED!');
}).catch((e) => {
    console.error(e)
});

const port = process.env.PORT || 8000

server.use(bodyParser.json());
server.use(require('express-pdf'));
server.use('/api', api);

server.listen(port, () => {
    console.log(`Listening on ${port}`)
})

