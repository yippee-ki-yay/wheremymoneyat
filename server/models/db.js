const mongoose = require('mongoose');

const dbUri = "mongodb://localhost/wheremymoneyat";

mongoose.connect(dbUri);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbUri}`);
});

require('./user');
require('./entry');
