import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Get active tasks (non-trashed)
router.get('/', async (req, res) => {
  try {
    const { stage, priority, search } = req.query;
    let filter = { isTrashed: false };
    if (stage) filter.stage = stage;
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const tasks = await Task.find(filter).populate('team', 'name email title role').sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create task
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Move to Trash (Soft Delete)
router.patch('/:id/trash', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { isTrashed: true }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Trashed tasks
router.get('/trashed', async (req, res) => {
  try {
    const tasks = await Task.find({ isTrashed: true }).sort({ updatedAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Restore from Trash
router.patch('/:id/restore', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { isTrashed: false }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Permanent Delete
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task permanently deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
