const Movie = require('../models/movieModel');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    res.json(movie);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addMovie = async (req, res) => {
  try {
    const movieObj = req.body;
    const movie = new Movie(movieObj);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieObj = req.body;
    await Movie.findByIdAndUpdate(movieId, movieObj);
    res.send('Updated!');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    await Movie.findByIdAndDelete(movieId);
    res.send('Deleted!');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie
};
