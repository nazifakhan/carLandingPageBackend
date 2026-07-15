const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  car_name: { type: String, required: true },
  car_image: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  featured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Cars', carSchema);
