const express = require('express');
const router = express.Router();
const { Interview, User } = require('../models');
const auth = require('../middleware/auth');

// Create a new interview
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, date, duration, type } = req.body;
    const interview = await Interview.create({
      title,
      description,
      date,
      duration,
      type,
      userId: req.user.id
    });
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Error creating interview' });
  }
});

// Get all interviews for a user
router.get('/', auth, async (req, res) => {
  try {
    const interviews = await Interview.findAll({
      where: { userId: req.user.id },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interviews' });
  }
});

// Get a single interview
router.get('/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interview' });
  }
});

// Update an interview
router.put('/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    const { title, description, date, duration, type } = req.body;
    await interview.update({ title, description, date, duration, type });
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: 'Error updating interview' });
  }
});

// Delete an interview
router.delete('/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    await interview.destroy();
    res.json({ message: 'Interview deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting interview' });
  }
});

module.exports = router; 