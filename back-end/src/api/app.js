const express = require('express');
const cors = require('cors');
const midError = require('./middlewares/error');
const router = require('./routes/Router');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('/images', express.static('public/images')); // https://expressjs.com/en/starter/static-files.html

app.use(midError);

module.exports = app;