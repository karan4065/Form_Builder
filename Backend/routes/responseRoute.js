import express from 'express'
const router = express.Router();
import Response from '../model/response_schema.js'

// Submit response
router.post('/', async (req, res) => {
  try {
    const response = new Response(req.body);
    await response.save();
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get responses for a form
router.get('/form/:formId', async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId }).sort({ createdAt: -1 });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
