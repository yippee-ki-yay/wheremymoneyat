const mongoose = require('mongoose');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const BudgetSchema = new mongoose.Schema({
  type: {String},
  price: {Number},
  byTags: [String]
});

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
  budgets: [BudgetSchema]
});



UserSchema.methods.setPassword = function (password) {

    this.salt = crypto.randomBytes(16).toString('hex');

    // create encrypted hash
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

UserSchema.methods.generateJwt = function() {
    const expiry = new Date();

    // Expire after ten days
    expiry.setDate(expiry.getDate() + 10);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
    }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


UserSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
};


mongoose.model('User', UserSchema);
