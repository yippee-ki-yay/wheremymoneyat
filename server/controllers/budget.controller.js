const mongoose = require('mongoose');
const User = mongoose.model('User');

//POST /budget/:userid
module.exports.addBudget = async (req, res) => {
  try {

    const user = await User.findById(req.params.userid).exec();

    const newBudget = {
      interval: req.body.budgetInterval,
      price: req.body.budgetPrice,
      byTags: req.body.byTags
    };

    console.log(req.body);

    if(req.body.type === 'general') {
      if(user.budgets[0]) {
        user.budgets[0].price = parseInt(req.body.budgetPrice);
        user.budgets[0].interval = req.body.budgetInterval;
      } else {
        user.budgets.push(newBudget);
      }
    }

    const savedUser = await user.save();

    sendResponse(res, 200, newBudget);

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
