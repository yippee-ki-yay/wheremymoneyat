const mongoose = require('mongoose');
const Entry = mongoose.model('Entry');

const moment = require('moment');

module.exports.addEntry = async (req, res) => {

  try {

    req.body.createdOn = moment().toDate();

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


//GET /tags/:author/tag/:tag
module.exports.listEntriesByTag = async (req, res) => {
  try {

    const authorId = req.params.author;
    let tag = req.params.tag;

    if(tag) {
      tag = '#' + tag;
    }

    const entries = await Entry.find({author: authorId, tags: tag}).exec();

    sendResponse(res, 200, entries);

  } catch(err) {
    sendResponse(res, 500, err);
  }
};

module.exports.homeStats = async (req, res) => {
  try {

    const sumPriceQuery = sumPrice();

    const dayMatch = createRange('day', req.params.author);
    const monthMatch = createRange('month', req.params.author);
    const weekMatch = createRange('week', req.params.author);

    const weekResult = await Entry.aggregate(weekMatch, sumPriceQuery).exec();

    const monthResult = await Entry.aggregate(monthMatch, sumPriceQuery).exec();

    const dayResult = await Entry.aggregate(dayMatch, sumPriceQuery).exec();

    let result = {};

    if(!weekResult[0] || !monthResult[0] || !dayResult[0]) {
      result = {
        monthPrice: 0,
        weekPrice: 0,
        dayPrice: 0
      };
    } else {
      result = {
        monthPrice: monthResult[0].total ,
        weekPrice: weekResult[0].total,
        dayPrice: dayResult[0].total
      };
    }


     sendResponse(res, 200, result);

  } catch(err) {
    console.log(err);
    sendResponse(res, 400, err);
  }
};

module.exports.listEntriesByDay = async (req, res) => {
  try {
    const entries = await Entry.aggregate(
      {
        $match: {
          author: mongoose.Types.ObjectId(req.params.author)
        }
      },
      {
        $group: {
         _id: { $dayOfMonth: '$createdOn'},
         entries: {
           $push: {
             "_id": "$_id",
             "text": "$text",
             "tags": "$tags",
             "price": "$price"
           }
         }
         }
       },
       {
         $limit: parseInt(req.params.numdays)
       },
      //  {
      //    $project: {
      //      _id: 0,
      //      date: '$createdOn'
      //    }
      //  }
    );

    sendResponse(res, 200, entries);

  } catch(err) {
    console.log(err);
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
