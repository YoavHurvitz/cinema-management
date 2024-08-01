/**
 * Movies Component
 * 
 * This component manages the display and operations of movie data.
 * It allows viewing, adding, editing, and deleting movies, as well as
 * showing member subscriptions for each movie.
 * 
 * Key features:
 * - Displays a list of all movies
 * - Allows adding new movies
 * - Provides functionality to edit and delete existing movies
 * - Shows member subscriptions for each movie
 * - Implements search functionality for movies
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import api from '../services/api';
import EditMovie from '../components/EditMovie';
import AddMovie from '../components/AddMovie';
import MovieSearch from '../components/MovieSearch';
import { updateMovie, deleteMovie, fetchMovies, addMovie } from '../redux/moviesSlice';
import { deleteSubscriptionsForMovie } from '../redux/subscriptionsSlice';
function Movies() {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);
  const members = useSelector(state => state.members);
  const subscriptions = useSelector(state => state.subscriptions);

  const [editingMovie, setEditingMovie] = useState(null);
  const [expandedMovie, setExpandedMovie] = useState(null);
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      // First, delete all subscriptions associated with this movie
      await api.delete(`/subscriptions/movie/${id}`);
      
      // Then delete the movie itself
      await api.delete(`/movies/${id}`);
      
      // Update Redux state
      dispatch(deleteMovie(id));
      // Also dispatch an action to remove related subscriptions from Redux state
      dispatch(deleteSubscriptionsForMovie(id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
  };

  const handleCloseEdit = () => {
    setEditingMovie(null);
  };

  const handleUpdateMovie = async (updatedMovie) => {
    try {
      if (!updatedMovie._id) {
        throw new Error('Movie ID is undefined');
      }
      dispatch(updateMovie(updatedMovie));
      await api.put(`/movies/${updatedMovie._id}`, updatedMovie);
      setEditingMovie(null);
    } catch (error) {
      console.error('Error updating movie:', error);
      dispatch(fetchMovies());
    }
  };

  const handleAddMovie = async (newMovie) => {
    try {
      const response = await api.post('/movies', newMovie);
      dispatch(addMovie(response.data));
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const toggleSubscriptions = (id) => {
    setExpandedMovie(expandedMovie === id ? null : id);
  };

  const getMovieSubscriptions = (movieId) => {
    return subscriptions
      .filter(sub => sub && sub.movieId && (sub.movieId === movieId || sub.movieId._id === movieId))
      .map(sub => {
        const member = members.find(m => m && m._id === (sub.memberId._id || sub.memberId));
        return {
          ...sub,
          memberName: member ? member.name : 'Unknown Member'
        };
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Movies
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setIsAddMovieOpen(true)}>
          Add Movie
        </Button>
      </Box>

      <MovieSearch onSearch={handleSearch} />

      <Grid container spacing={4}>
        {filteredMovies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={movie.imageUrl}
                alt={movie.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/140x200?text=No+Image';
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <Link to={`/movie/${movie._id}`}>{movie.name}</Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {movie.yearPremiered}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Genres: {movie.genres.join(', ')}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button size="small" color="primary" onClick={() => handleEdit(movie)}>
                    Edit
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleDelete(movie._id)}>
                    Delete
                  </Button>
                  <Button size="small" onClick={() => toggleSubscriptions(movie._id)}>
                    {expandedMovie === movie._id ? 'Hide Subscriptions' : 'Show Subscriptions'}
                  </Button>
                </Box>
                {expandedMovie === movie._id && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">Subscriptions:</Typography>
                    {getMovieSubscriptions(movie._id).length > 0 ? (
                      <List dense>
                        {getMovieSubscriptions(movie._id).map((sub, index) => (
                          <React.Fragment key={sub._id || index}>
                            <ListItem>
                              <ListItemText
                                primary={<Link to={`/member/${sub.memberId._id}`}>{sub.memberName}</Link>}
                                secondary={`Watched on: ${formatDate(sub.date)}`}
                              />
                            </ListItem>
                            {index < getMovieSubscriptions(movie._id).length - 1 && <Divider />}
                          </React.Fragment>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2">No subscriptions for this movie.</Typography>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {editingMovie && (
        <EditMovie
          movie={{...editingMovie, _id: editingMovie._id}}
          open={Boolean(editingMovie)}
          handleClose={handleCloseEdit}
          updateMovie={handleUpdateMovie}
        />
      )}
      <AddMovie
        open={isAddMovieOpen}
        handleClose={() => setIsAddMovieOpen(false)}
        addMovie={handleAddMovie}
      />
    </Container>
  );
}

export default Movies;