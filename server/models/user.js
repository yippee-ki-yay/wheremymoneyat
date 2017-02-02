const mongoose = require('mongoose');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
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

UserSchema.methods.setPassword = function (password) {

    this.salt = crypto.randomBytes(16).toString('hex');

    // create encrypted hash
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

UserSchema.methods.generateJwt = function() {
    const expiry = new Date();

    // Expire after one day
    expiry.setDate(expiry.getDate() + 1);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
    }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


mongoose.model('User', UserSchema);
