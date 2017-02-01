const mongoose = require('mongoose');
const Entry = mongoose.model('Entry');


module.exports.addEntry = async (req, res) => {

  try {
    const entry = new Entry(req.body);

    if(!entry) {
      throw "No falsy entry bro!";
    }

    const savedEntry = await entry.save();

    sendResponse(res, 200, savedEntry);

  } catch(err) {
    sendResponse(res, 500, err);
  }

};

module.exports.listUserEntries = async (req, res) => {

  try {

    const authorId = req.params.author;

    const entries = await Entry.find({author: authorId}).exec();

    sendResponse(res, 200, entries);

  } catch(err) {
    sendResponse(res, 500, err);
  }


};


function sendResponse(res, status, content) {
    res.status(status);
    res.json(content);
};
