require('dotenv').config();
console.log('Using MONGO_URI:', process.env.MONGO_URI);
const express = require('express');
const path = require('path'); 
const mongoose = require('mongoose');
const studentRoutes  = require('./routes/students');
const errorHandler   = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser:    true,
  useUnifiedTopology: true
})
.then(() => console.log('🟢 Connected to MongoDB Atlas'))
.catch(err => console.error('🔴 MongoDB Error:', err));

// Routes
app.use('/api/students', studentRoutes);


// Serve your frontend from public/
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error-handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
