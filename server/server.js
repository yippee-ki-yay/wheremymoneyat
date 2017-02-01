require('./models/db');

const express = require('express');
const app = express();

const router = require('./routes/routes');

const PORT = 6969;

app.use(express.static('./../public'));
app.use('/api', router);

app.listen(6969, () => {
  console.log(`Listening on port ${PORT}`);
});
