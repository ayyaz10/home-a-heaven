const express = require('express');
const guestController = require('../controller/guest');
const router = express.Router();



router.get('/', guestController);

module.exports = router;