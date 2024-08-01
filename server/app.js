const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('./configs/configDB');
const seedData = require('./configs/seedData');

// Import routers
const userRouter = require('./routers/userRouter');
const movieRouter = require('./routers/movieRouter');
const memberRouter = require('./routers/memberRouter');
const subscriptionRouter = require('./routers/subscriptionRouter');

const app = express();
const PORT = process.env.PORT || 3050;

// Flag to control seeding
const SHOULD_SEED = false;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB and seed data
connectDB().then(async () => {
  if (SHOULD_SEED) {
    await seedData();
  }
  
  // Routes
  app.use('/users', userRouter);
  app.use('/movies', movieRouter);
  app.use('/members', memberRouter);
  app.use('/subscriptions', subscriptionRouter);

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.error(error));