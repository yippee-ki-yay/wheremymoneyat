const mongoose = require('mongoose');
const Entry = mongoose.model('Entry');

const moment = require('moment');

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


//GET /entries/:author/tag/:tag
module.exports.listEntriesByTag = async (req, res) => {
  try {

    const authorId = req.params.author;
    const tag = req.params.tag;

    const entries = await Entry.find({author: authorId, tags: tag}).exec();

    sendResponse(res, 200, entries);

  } catch(err) {
    sendResponse(res, 500, err);
  }
};

module.exports.homeStats = async (req, res) => {
  try {

    const sumPriceQuery = sumPrice();

    console.log(req.params.author);

    const monthMatch = createRange('month', req.params.author);
    const weekMatch = createRange('week', req.params.author);

    const weekResult = await Entry.aggregate(weekMatch, sumPriceQuery).exec();

    const monthResult = await Entry.aggregate(monthMatch, sumPriceQuery).exec();


    const result = {
      monthPrice: monthResult[0].total,
      weekPrice: weekResult[0].total
    };

     sendResponse(res, 200, result);

  } catch(err) {
    console.log(err);
    sendResponse(res, 400, err);
  }
};

// GET /entries/:author/:date
module.exports.listEntriesByDate = async (req, res) => {

  try {

    const today = moment(req.params.date).startOf('day');
    const tomorrow = moment(today).add(1, 'days');

    const entries = await Entry.find({createdOn:  {
                          $gte: today.toDate(),
                          $lt: tomorrow.toDate()
                        }, author: req.params.author}).exec();


    sendResponse(res, 200, entries);

  } catch(err) {
    sendResponse(res, 500, err);
  }

};

function sumPrice() {
  return {
    $group: {
       _id: null,
       total: { $sum: '$price' }}
  };
}

// HELPER
function createRange(range, authorid) {
  const start = moment().startOf(range);
  const end = moment().endOf(range);

  return {'$match': {
    createdOn: {
      $gte: start.toDate(),
      $lt: end.toDate()
    },
    author: mongoose.Types.ObjectId(authorid)
  }};
}

function sendResponse(res, status, content) {
    res.status(status);
    res.json(content);
};
