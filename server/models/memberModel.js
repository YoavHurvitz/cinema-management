const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  email: String,
  city: String,
  name: String
}, { collection: 'members' });

module.exports = mongoose.model('Member', memberSchema);