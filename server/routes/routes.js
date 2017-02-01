const express = require('express');
const router = express.Router();

const entryController = require('../controllers/entry.controller');

router.post('/entries', entryController.addEntry);
router.get('/entries/:author', entryController.listUserEntries);


module.exports = router;
