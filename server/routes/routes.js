const express = require('express');
const router = express.Router();

const entryController = require('../controllers/entry.controller');
const userController = require('../controllers/user.controller');

// Test route
router.get('/test', (req, res) => {res.send("wrks")});

//Entries
router.post('/entries', entryController.addEntry);
router.get('/entries/:author', entryController.listUserEntries);

//Users
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
