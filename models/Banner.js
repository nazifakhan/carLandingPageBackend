const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  banner_image: { type: String },
  banner_text: { type: String }
});

module.exports = mongoose.model('Banner', bannerSchema);
