const Subscription = require('../models/subscriptionModel');

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('movieId', 'name')
      .populate('memberId', 'name');
    res.json(subscriptions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSubscriptionsByMemberId = async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const subscriptions = await Subscription.find({ memberId });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSubscriptionsByMovieId = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const subscriptions = await Subscription.find({ movieId });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addSubscription = async (req, res) => {
  try {
    const subscriptionObj = req.body;
    const subscription = new Subscription(subscriptionObj);
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteSubscriptionsByMovieId = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    await Subscription.deleteMany({ movieId });
    res.send('Deleted!');
  } catch (error) {
    res.status(500).send(error.message);
  }
};


const deleteSubscriptionsByMemberId = async (req, res) => {
  try {
    const memberId = req.params.memberId;
    await Subscription.deleteMany({ memberId });
    res.send('Deleted!');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const deletedSubscription = await Subscription.findByIdAndDelete(subscriptionId);
    
    if (!deletedSubscription) {
      return res.status(404).send('Subscription not found');
    }
    
    res.json({ message: 'Subscription deleted successfully', deletedSubscription });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getSubscriptionsByMemberId,
  getSubscriptionsByMovieId,
  addSubscription,
  deleteSubscriptionsByMovieId,
  deleteSubscriptionsByMemberId,
  getAllSubscriptions,
  deleteSubscription
};
