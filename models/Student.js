const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  age:     { type: Number, required: true, min: 1 },
  class:   { type: String, required: true, trim: true },
  enrolledAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
