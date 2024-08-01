const mongoose = require('mongoose');
const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const Member = require('../models/memberModel');
const Subscription = require('../models/subscriptionModel');

const seedData = async () => {
  // Users
  const users = [
    { fullName: "John Doe", username: "john", password: "password123" },
    { fullName: "Jane Smith", username: "jane", password: "password456" },
    { fullName: "Mike Johnson", username: "mike", password: "password789" },
    { fullName: "Emily Brown", username: "emily", password: "passwordabc" },
    { fullName: "David Wilson", username: "david", password: "passworddef" },
    { fullName: "Sarah Davis", username: "sarah", password: "passwordghi" },
    { fullName: "Tom Taylor", username: "tom", password: "passwordjkl" },
    { fullName: "Lisa Anderson", username: "lisa", password: "passwordmno" },
    { fullName: "Chris Martin", username: "chris", password: "passwordpqr" },
    { fullName: "Emma White", username: "emma", password: "passwordstu" }
  ];

  // Movies
  const movies = [
    { name: "Inception", yearPremiered: 2010, genres: ["Sci-Fi", "Action", "Thriller"], imageUrl: "https://example.com/inception.jpg" },
    { name: "The Shawshank Redemption", yearPremiered: 1994, genres: ["Drama"], imageUrl: "https://example.com/shawshank.jpg" },
    { name: "The Godfather", yearPremiered: 1972, genres: ["Crime", "Drama"], imageUrl: "https://example.com/godfather.jpg" },
    { name: "Pulp Fiction", yearPremiered: 1994, genres: ["Crime", "Drama"], imageUrl: "https://example.com/pulpfiction.jpg" },
    { name: "The Dark Knight", yearPremiered: 2008, genres: ["Action", "Crime", "Drama"], imageUrl: "https://example.com/darkknight.jpg" },
    { name: "Forrest Gump", yearPremiered: 1994, genres: ["Drama", "Romance"], imageUrl: "https://example.com/forrestgump.jpg" },
    { name: "The Matrix", yearPremiered: 1999, genres: ["Action", "Sci-Fi"], imageUrl: "https://example.com/matrix.jpg" },
    { name: "Goodfellas", yearPremiered: 1990, genres: ["Biography", "Crime", "Drama"], imageUrl: "https://example.com/goodfellas.jpg" },
    { name: "Schindler's List", yearPremiered: 1993, genres: ["Biography", "Drama", "History"], imageUrl: "https://example.com/schindlerslist.jpg" },
    { name: "Fight Club", yearPremiered: 1999, genres: ["Drama"], imageUrl: "https://example.com/fightclub.jpg" }
  ];

  // Members
  const members = [
    { email: "member1@example.com", city: "New York" },
    { email: "member2@example.com", city: "Los Angeles" },
    { email: "member3@example.com", city: "Chicago" },
    { email: "member4@example.com", city: "Houston" },
    { email: "member5@example.com", city: "Phoenix" },
    { email: "member6@example.com", city: "Philadelphia" },
    { email: "member7@example.com", city: "San Antonio" },
    { email: "member8@example.com", city: "San Diego" },
    { email: "member9@example.com", city: "Dallas" },
    { email: "member10@example.com", city: "San Jose" }
  ];

  try {
    // Clear existing data
    await User.deleteMany({});
    await Movie.deleteMany({});
    await Member.deleteMany({});
    await Subscription.deleteMany({});

    // Insert new data
    const createdUsers = await User.insertMany(users);
    const createdMovies = await Movie.insertMany(movies);
    const createdMembers = await Member.insertMany(members);

    // Create subscriptions
    const subscriptions = [];
    for (let i = 0; i < 10; i++) {
      subscriptions.push({
        movieId: createdMovies[i]._id,
        memberId: createdMembers[i]._id,
        date: new Date(2023, 6 + i, 15 + i).toISOString().split('T')[0] // Creates dates from July 15 to Aug 24, 2023
      });
    }
    await Subscription.insertMany(subscriptions);

    console.log('Dummy data inserted successfully');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
};

module.exports = seedData;