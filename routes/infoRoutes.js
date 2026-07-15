const express = require('express');
const router = express.Router();
const Information = require('../models/Information');

router.post('/', async (req, res) => {
  try {
    const info = new Information(req.body);
    await info.save();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const info = await Information.find();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const info = await Information.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Information.findByIdAndDelete(req.params.id);
    res.json({ message: 'Information deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
