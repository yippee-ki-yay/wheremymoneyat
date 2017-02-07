const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');

const entryController = require('../controllers/entry.controller');
const userController = require('../controllers/user.controller');

const auth = jwt({
  secret: process.env.JWT_SECRET,
});

// Test route
router.get('/test', (req, res) => {res.send("wrks")});
router.get('/test-auth', auth, (req, res) => {res.send(req.user)});

//Entries
router.post('/entries', entryController.addEntry);
router.get('/entries/:author/:date', entryController.listEntriesByDate);
router.get('/entries/:author', entryController.listUserEntries);
router.get('/entries/:author/tag/:tag', entryController.listEntriesByTag);

//Users
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
