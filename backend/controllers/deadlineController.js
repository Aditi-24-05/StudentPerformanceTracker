const Deadline=require('../models/Deadline.js');

// GET all deadlines
exports.getAllDeadlines = async (req, res) => {
  try {
    const deadlines = await Deadline.find().sort({ deadline: 1 });
    res.status(200).json(deadlines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new deadline
exports.createDeadline = async (req, res) => {
  try {
    const { title, deadline } = req.body;
    const newDeadline = new Deadline({ title, deadline });
    await newDeadline.save();
    res.status(201).json(newDeadline);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a deadline
exports.deleteDeadline = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Deadline.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Deadline not found' });
    res.status(200).json({ message: 'Deadline deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDeadlineCompletion = async (req, res) => {
    try {
      const { completed } = req.body;
      const updated = await Deadline.findByIdAndUpdate(
        req.params.id,
        { completed },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Error updating completion status' });
    }
};
