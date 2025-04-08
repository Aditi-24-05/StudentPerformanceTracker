const express = require('express');
const router = express.Router();
const { getGoalsForDate, setGoalsForDate } = require('../controllers/goalController');

router.get('/:date', getGoalsForDate);
router.post('/', setGoalsForDate);

module.exports = router;
