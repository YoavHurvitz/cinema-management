import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button, Box, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateMember, deleteMember, fetchMembers } from '../redux/membersSlice';
import { addSubscription, fetchSubscriptions, deleteSubscription } from '../redux/subscriptionsSlice';
import EditMember from '../components/EditMember';
import AddSubscription from '../components/AddSubscription';
import api from '../services/api';
import Navbar from '../components/Navbar';

function Member() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector(state => state.members.find(m => m._id === id));
  const subscriptions = useSelector(state => state.subscriptions);
  const movies = useSelector(state => state.movies);

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSubscription, setIsAddingSubscription] = useState(false);

  useEffect(() => {
    if (!member) {
      dispatch(fetchMembers());
    }
    if (subscriptions.length === 0) {
      dispatch(fetchSubscriptions());
    }
  }, [dispatch, member, subscriptions.length]);

  if (!member) return <Typography>Loading...</Typography>;

  const handleEdit = () => setIsEditing(true);

  const handleUpdate = async (updatedMember) => {
    try {
      dispatch(updateMember(updatedMember));
      await api.put(`/members/${updatedMember._id}`, updatedMember);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const handleDelete = async () => {
    try {
       dispatch(deleteMember(member._id));
      await api.delete(`/members/${member._id}`);
      navigate('/members');
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleAddSubscription = async (movieId, date) => {
    try {
      const newSubscription = { memberId: id, movieId, date };
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

  const getMemberSubscriptions = () => {
    return subscriptions
      .filter(sub => sub && sub.memberId && (sub.memberId === id || sub.memberId._id === id))
      .map(sub => {
        const movie = movies.find(m => m && m._id === (sub.movieId?._id || sub.movieId));
        return {
          ...sub,
          movieName: movie ? movie.name : 'Unknown Movie',
          date: sub.date || 'Unknown Date'
        };
      })
      .filter(sub => sub.movieName);
  };

  const getUnwatchedMovies = () => {
    const watchedMovieIds = subscriptions
      .filter(sub => sub && sub.memberId && (sub.memberId === id || sub.memberId._id === id))
      .map(sub => sub.movieId?._id || sub.movieId);
    return movies.filter(movie => movie && movie._id && !watchedMovieIds.includes(movie._id));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
   
    <Container maxWidth="md" sx={{ mt: 4 }}>
       <Navbar/> 
      <Typography variant="h4" gutterBottom>{member.name}</Typography>
      <Typography variant="body1">Email: {member.email}</Typography>
      <Typography variant="body1">City: {member.city}</Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mr: 1 }}>Edit</Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Subscriptions</Typography>
        <List>
          {getMemberSubscriptions().map((sub, index) => (
            <React.Fragment key={sub._id}>
              <ListItem>
                <ListItemText 
                  primary={<Link to={`/movie/${sub.movieId}`}>{sub.movieName}</Link>}
                  secondary={`Watched on: ${formatDate(sub.date)}`}
                />
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSubscription(sub._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              {index < getMemberSubscriptions().length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        <Button variant="contained" color="primary" onClick={() => setIsAddingSubscription(true)} sx={{ mt: 2 }}>
          Add Subscription
        </Button>
      </Box>
      {isEditing && (
        <EditMember
          member={member}
          open={isEditing}
          handleClose={() => setIsEditing(false)}
          updateMember={handleUpdate}
        />
      )}
      {isAddingSubscription && (
        <AddSubscription
          movies={getUnwatchedMovies()}
          onSubscribe={handleAddSubscription}
          memberId={id}
          onClose={() => setIsAddingSubscription(false)}
        />
      )}
    </Container>
  );
}

export default Member;