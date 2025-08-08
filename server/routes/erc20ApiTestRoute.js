const express = require('express');
const { getTokenName } = require('../controllers/erc20ApiTestController');

const router = express.Router();

router.route('/erc20-api-test/token-name').get(getTokenName);

module.exports = router;
