const express = require('express');
const router = express.Router();
const ContactForm = require('../models/ContactForm');

router.post('/', async (req, res) => {
  try {
    const contact = new ContactForm(req.body);
    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const contacts = await ContactForm.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await ContactForm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
