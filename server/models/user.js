const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
      type: String,
      unique: true,
      required: true
  },
  name: {
      type: String,
      unique: true,
      required: true
  },
  registeredOn: {type: Date, default: Date.now},
  hash: String,
  salt: String,
});

mongoose.model('User', UserSchema);
