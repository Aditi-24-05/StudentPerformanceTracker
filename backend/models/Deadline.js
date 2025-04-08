const mongoose = require('mongoose');

const deadlineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  completed: { 
    type: Boolean, 
    default: false 
},
}, { timestamps: true });

module.exports = mongoose.model('Deadline', deadlineSchema);