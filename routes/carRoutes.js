const express = require('express');
const router = express.Router();
const Cars = require('../models/Cars');

// Create a new car
router.post('/', async (req, res) => {
  try {
    const car = new Cars(req.body);
    const savedCar = await car.save();
    // re-fetch with category populated
    const populatedCar = await Cars.findById(savedCar._id).populate('category_id', 'category_name');
    res.json(populatedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Cars.find().populate('category_id', 'category_name');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read featured cars
router.get('/featured', async (req, res) => {
  try {
    const cars = await Cars.find({ featured: true }).populate('category_id', 'category_name');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update car
router.put('/:id', async (req, res) => {
  try {
    const car = await Cars.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('category_id', 'category_name');
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete car
router.delete('/:id', async (req, res) => {
  try {
    await Cars.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
