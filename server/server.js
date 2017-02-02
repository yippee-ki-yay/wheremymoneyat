require('dotenv').load();

require('./models/db');
require('./config/passport');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./routes/routes');

const PORT = 6969;

app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With' );
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

//app.use(express.static('./../public'));
app.use('/api', router);

app.listen(6969, () => {
  console.log(`Listening on port ${PORT}`);
});
