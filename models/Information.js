const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  car_image: { type: String },
  car_name: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Information', infoSchema);
