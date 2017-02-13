const mongoose = require('mongoose');
const User = mongoose.model('User');

//POST /budget/:userid
module.exports.addBudget = async (req, res) => {
  try {

    const user = await User.findById(req.params.userid).exec();

    user.budgets.push({
      type: req.body.type,
      price: req.body.price,
      byTags: req.body.byTags
    })

    const savedUser = await user.save();

    sendResponse(res, 200, err);

  } catch(err) {
    console.log(err);
    sendResponse(res, 500, err);
  }
};

//GET /budget/:userid
module.exports.listUserBudgets = async (req, res) => {
  try {

    const user = await User.findById(req.params.userid).exec();

    sendResponse(res, 200, user.budgets);

  } catch(err) {
    console.log(err);
    sendResponse(res, 500, err);
  }
};


function sendResponse(res, status, content) {
    res.status(status);
    res.json(content);
};
