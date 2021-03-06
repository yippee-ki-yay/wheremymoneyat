const mongoose = require('mongoose');
const User = mongoose.model('User');

let passport = require('passport');

module.exports.register = async (req, res) => {

  try {

    if(!req.body.password || !req.body.name || !req.body.email) {
      throw "Invalid data from the sender";
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email
    });

    user.setPassword(req.body.password);


    const token = user.generateJwt();

    await user.save();

    console.log('In register');

    sendResponse(res, 200, {token: token});

  } catch(err) {
    console.log(err);
    sendResponse(res, 400, err.errmsg);
  }

};


module.exports.login = async (req, res) => {

  try {

    if(!req.body.password || !req.body.email) {
      throw "Invalid data from the sender";
    }

    passport.authenticate('local', function(err, user, info) {
      if (err) {
        sendResponse(res, 404, err);
        return;
      }

      if (user) {
        const token = user.generateJwt();
        sendResponse(res, 200, {token: token});

      } else {
        sendResponse(res, 401, info);
      }

    })(req, res);

  } catch(err) {
    console.log(err);
    sendResponse(res, 500, err);
  }
};


function sendResponse(res, status, content) {
    res.status(status);
    res.json(content);
};
