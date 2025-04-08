const express = require('express');
const router = express.Router();
const { getSubjects, deleteSubject, updateSubject } = require('../controllers/subjectController');


const Subject =require('../models/Subject');

router.get('/', getSubjects);
router.post('/', async (req, res) => {
    try {
      const newSubject = new Subject(req.body);
      const savedSubject = await newSubject.save();
      res.status(201).json(savedSubject); // important: return saved subject with _id
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while adding subject' });
    }
  });
  
router.delete('/:id', deleteSubject);
router.put('/:id', updateSubject); // <-- Add this line
module.exports = router;
