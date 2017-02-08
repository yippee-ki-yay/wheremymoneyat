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

// GET /entries/:author/:date
module.exports.listEntriesByDate = async (req, res) => {

  try {

    const today = moment(req.params.date).startOf('day');
    const tomorrow = moment(today).add(1, 'days');

    const entries = await Entry.find({createdOn:  {
                          $gte: today.toDate(),
                          $lt: tomorrow.toDate()
                        }, author: req.params.author}).exec();


//     const entries = await Entry.aggregate([{
//         $project : {
//             year : {
//                 $year : "$createdOn"
//             },
//             month : {
//                 $month : "$createdOn"
//             },
//             week : {
//                 $week : "$createdOn"
//             },
//             day : {
//                 $dayOfWeek : "$createdOn"
//             },
//             _id : 1,
//             price : 1
//         }
//     }, {
//         $group : {
//             _id : {
//                 year : "$year",
//                 month : "$month",
//                 week : "$week",
//                 day : "$day"
//             },
//             totalWeightDaily : {
//                 $sum : "$price"
//             }
//         }
//     }
// ]).exec();

    console.log(entries);

    sendResponse(res, 200, entries);

  } catch(err) {
    sendResponse(res, 500, err);
  }

};


function sendResponse(res, status, content) {
    res.status(status);
    res.json(content);
};
