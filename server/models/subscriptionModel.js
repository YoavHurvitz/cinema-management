const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  date: Date
}, { collection: 'subscriptions' });

module.exports = mongoose.model('Subscription', subscriptionSchema);