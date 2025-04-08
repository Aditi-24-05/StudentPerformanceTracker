const DailyGoal = require('../models/DailyGoal');

exports.getGoalsForDate = async (req, res) => {
  const { date } = req.params;
  try {
    const goal = await DailyGoal.findOne({ date });
    if (!goal) {
      // Return an empty tasks array if no document exists yet for this date
      return res.status(200).json({ date, tasks: [] });
    }
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch goals', details: err.message });
  }
};

exports.setGoalsForDate = async (req, res) => {
  const { date, tasks } = req.body;
  try {
    // Upsert: update existing document or create a new one if none exists
    const updatedGoal = await DailyGoal.findOneAndUpdate(
      { date },
      { tasks },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedGoal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save goals', details: err.message });
  }
};
