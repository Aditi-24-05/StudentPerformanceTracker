const express = require('express');

const {  getAllDeadlines, createDeadline, deleteDeadline ,updateDeadlineCompletion} = require('../controllers/deadlineController.js');

const router = express.Router();

router.get('/', getAllDeadlines);
router.post('/', createDeadline);
router.delete('/:id', deleteDeadline);
router.put('/:id', updateDeadlineCompletion);
module.exports = router;

