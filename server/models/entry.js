const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  text: {type: String},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdOn: {type: Date, default: Date.now()},
  price: {type: Number},
  type: {type: String},
  tags: [String]
});

mongoose.model('Entry', EntrySchema);
