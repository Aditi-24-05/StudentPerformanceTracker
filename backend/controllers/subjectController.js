const Subject = require('../models/Subject');

exports.getSubjects = async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
};
/*
exports.addSubject = async (req, res) => {
  const newSubject = new Subject(req.body);
  await newSubject.save();
  res.status(201).json(newSubject);
};
*/
exports.updateSubject = async (req, res) => {
  try {
    const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating subject' });
  }
};

exports.deleteSubject = async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
