const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

router.get('/', subscriptionController.getAllSubscriptions);

// Get subscriptions by member ID
router.get('/member/:memberId', subscriptionController.getSubscriptionsByMemberId);

// Get subscriptions by movie ID
router.get('/movies/:movieId', subscriptionController.getSubscriptionsByMovieId);

// Add a new subscription
router.post('/', subscriptionController.addSubscription);

// Delete subscriptions by movie ID
router.delete('/movie/:movieId', subscriptionController.deleteSubscriptionsByMovieId);

// Delete subscriptions by member ID
router.delete('/member/:memberId', subscriptionController.deleteSubscriptionsByMemberId);

// Delete Subscription by Sub ID
router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;