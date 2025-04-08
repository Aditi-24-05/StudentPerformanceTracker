const express = require('express');
const cors = require('cors');

const subjectRoutes = require('./routes/subjectRoutes');
const goalRoutes = require('./routes/goalRoutes');
const deadlineRoutes = require('./routes/deadlineRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/subjects', subjectRoutes);
app.use('/api/goals', goalRoutes); 
app.use('/api/deadlines', deadlineRoutes); 

module.exports = app;
