import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button, Box, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchMovies, updateMovie, deleteMovie } from '../redux/moviesSlice';
import { addSubscription, fetchSubscriptions, deleteSubscription } from '../redux/subscriptionsSlice';
import EditMovie from '../components/EditMovie';
import AddSubscription from '../components/AddSubscription';
import api from '../services/api';
import AddMemberSubscription from '../components/AddMemberSubscription';

function Movie() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movie = useSelector(state => state.movies.find(m => m._id === id));
  const subscriptions = useSelector(state => state.subscriptions);
  const members = useSelector(state => state.members);

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSubscription, setIsAddingSubscription] = useState(false);

  useEffect(() => {
    if (!movie) {
      dispatch(fetchMovies());
    }
    if (subscriptions.length === 0) {
      dispatch(fetchSubscriptions());
    }
  }, [dispatch, movie, subscriptions.length]);

  if (!movie) return <Typography>Loading...</Typography>;

  const handleEdit = () => setIsEditing(true);

  const handleUpdate = async (updatedMovie) => {
    try {
      dispatch(updateMovie(updatedMovie));
      await api.put(`/movies/${updatedMovie._id}`, updatedMovie);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteMovie(movie._id));
      await api.delete(`/movies/${movie._id}`);
      navigate('/movies');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleAddSubscription = async (memberId, date) => {
    try {
      const newSubscription = { movieId: id, memberId, date };
      const response = await api.post('/subscriptions', newSubscription);
      dispatch(addSubscription(response.data));
      setIsAddingSubscription(false);
      dispatch(fetchSubscriptions());
    } catch (error) {
      console.error('Error adding subscription:', error);
    }
  };

  const handleDeleteSubscription = async (subscriptionId) => {
    try {
      await api.delete(`/subscriptions/${subscriptionId}`);
      dispatch(deleteSubscription(subscriptionId));
      dispatch(fetchSubscriptions());
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  const getMovieSubscriptions = () => {
    return subscriptions
      .filter(sub => sub && sub.movieId && (sub.movieId === id || sub.movieId._id === id))
      .map(sub => {
        const member = members.find(m => m && m._id === (sub.memberId?._id || sub.memberId));
        return { ...sub, memberName: member ? member.name : 'Unknown Member' };
      });
  };

  const getUnsubscribedMembers = () => {
    const subscribedMemberIds = getMovieSubscriptions().map(sub => sub.memberId?._id || sub.memberId);
    return members.filter(member => !subscribedMemberIds.includes(member._id));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{movie.name}</Typography>
      <Typography variant="body1">Year: {movie.yearPremiered}</Typography>
      <Typography variant="body1">Genres: {movie.genres.join(', ')}</Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mr: 1 }}>Edit</Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Subscriptions</Typography>
        <List>
          {getMovieSubscriptions().map((sub, index) => (
            <React.Fragment key={sub._id}>
              <ListItem>
                <ListItemText 
                  primary={<Link to={`/member/${sub.memberId}`}>{sub.memberName}</Link>}
                  secondary={`Watched on: ${formatDate(sub.date)}`}
                />
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSubscription(sub._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              {index < getMovieSubscriptions().length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        <Button variant="contained" color="primary" onClick={() => setIsAddingSubscription(true)} sx={{ mt: 2 }}>
          Add Subscription
        </Button>
      </Box>
      {isEditing && (
        <EditMovie
          movie={movie}
          open={isEditing}
          handleClose={() => setIsEditing(false)}
          updateMovie={handleUpdate}
        />
      )}
      {isAddingSubscription && (
        <AddMemberSubscription
          members={getUnsubscribedMembers()}
          onSubscribe={handleAddSubscription}
          movieId={id}
          onClose={() => setIsAddingSubscription(false)}
        />
      )}
    </Container>
  );
}

export default Movie;