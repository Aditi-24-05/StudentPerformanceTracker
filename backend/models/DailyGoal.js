const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const dailyGoalSchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true },
    tasks: [taskSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('DailyGoal', dailyGoalSchema);
