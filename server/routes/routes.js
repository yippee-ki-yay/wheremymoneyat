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
router.post('/entries', auth, entryController.addEntry);
router.get('/entries/:author/:date', auth, entryController.listEntriesByDate);
router.get('/days/:numdays/entries/:author', auth, entryController.listEntriesByDay);
//router.get('/entries/:author', auth, entryController.listUserEntries);
router.get('/tags/:author/tag/:tag', auth, entryController.listEntriesByTag);

router.get('/stats/:author', auth, entryController.homeStats);

//Users
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
