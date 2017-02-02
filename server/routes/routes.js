const express = require('express');
const router = express.Router();

const entryController = require('../controllers/entry.controller');

// Test route
router.get('/test', (req, res) => {res.send("wrks")});

//Routes
router.post('/entries', entryController.addEntry);
router.get('/entries/:author', entryController.listUserEntries);


module.exports = router;
