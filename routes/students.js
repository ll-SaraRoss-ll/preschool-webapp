const express = require('express');
const router  = express.Router();
const Student = require('../models/Student');

/** GET /api/students */
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.find();
    res.json({ data: students });
  } catch (err) {
    next(err);
  }
});

/** 
 * GET /api/students/:id
 * Fetch one student by MongoDB _id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    // Handle invalid ObjectId
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid student ID' });
    }
    next(err);
  }
});

/** POST /api/students */
router.post('/', async (req, res, next) => {
  try {
    const student = new Student(req.body);
    const saved   = await student.save();
    res.status(201).json({ message: 'Student added', student: saved });
  } catch (err) {
    next(err);
  }
});

/** PUT /api/students/:id */
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      const error = new Error('Student not found');
      error.status = 404;
      throw error;
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

/** DELETE /api/students/:id */
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      const error = new Error('Student not found');
      error.status = 404;
      throw error;
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
