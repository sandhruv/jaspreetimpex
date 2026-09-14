const mongoose = require('mongoose');

const SiteSettingsSchema = new mongoose.Schema({
  hero: {
    type: Boolean,
    default: true
  },
  about: {
    type: Boolean,
    default: true
  },
  services: {
    type: Boolean,
    default: true
  },
  whyChooseUs: {
    type: Boolean,
    default: true
  },
  contact: {
    type: Boolean,
    default: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
