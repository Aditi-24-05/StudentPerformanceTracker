const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  type: String,
  done: Number,
  total: Number,
  topics: [{ name: String, done: Boolean }]
});

const SubjectSchema = new mongoose.Schema({
  name: String,
  tasks: [TaskSchema]
});

module.exports = mongoose.model('Subject', SubjectSchema);
