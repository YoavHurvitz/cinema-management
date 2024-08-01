const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.addMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
