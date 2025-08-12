// backend/routes/formRoutes.js
import express from 'express';
import Form from "../model/form.js";



const router = express.Router();

// Create form
router.post('/', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single form
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Form not found' });
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update form
router.put('/:id', async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!form) return res.status(404).json({ error: 'Form not found' });
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete form
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Form.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Form not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
