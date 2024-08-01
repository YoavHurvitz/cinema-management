/**
 * Members Component
 * 
 * This component manages the display and operations of member data.
 * It allows viewing, adding, editing, and deleting members, as well as
 * managing their movie subscriptions.
 * 
 * Key features:
 * - Displays a list of all members
 * - Allows adding new members
 * - Provides functionality to edit and delete existing members
 * - Shows movie subscriptions for each member
 * - Allows adding and deleting subscriptions for members
 * - Implements search functionality for members
 * 
 */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/api';
import EditMember from '../components/EditMember';
import AddMember from '../components/AddMember';
import MemberSearch from '../components/MemberSearch';
import AddSubscription from '../components/AddSubscription';
import { updateMember, deleteMember, fetchMembers, addMember } from '../redux/membersSlice';
import { addSubscription, fetchSubscriptions, deleteSubscription,deleteSubscriptionsForMember } from '../redux/subscriptionsSlice';

function Members() {
  const dispatch = useDispatch();
  const members = useSelector(state => state.members);
  const movies = useSelector(state => state.movies);
  const subscriptions = useSelector(state => state.subscriptions);

  const [editingMember, setEditingMember] = useState(null);
  const [expandedMember, setExpandedMember] = useState(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addingSubscriptionFor, setAddingSubscriptionFor] = useState(null);

  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      // First, delete all subscriptions associated with this member
      await api.delete(`/subscriptions/member/${id}`);
      
      // Then delete the member itself
      await api.delete(`/members/${id}`);
      
      // Update Redux state
      dispatch(deleteMember(id));
      // Also dispatch an action to remove related subscriptions from Redux state
      dispatch(deleteSubscriptionsForMember(id));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleCloseEdit = () => {
    setEditingMember(null);
  };

  const handleUpdateMember = async (updatedMember) => {
    try {
      dispatch(updateMember(updatedMember));
      await api.put(`/members/${updatedMember._id}`, updatedMember);
      setEditingMember(null);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const handleAddMember = async (newMember) => {
    try {
      const response = await api.post('/members', newMember);
      dispatch(addMember(response.data));
      setIsAddMemberOpen(false);
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const toggleSubscriptions = (id) => {
    setExpandedMember(expandedMember === id ? null : id);
  };


  const handleAddSubscription = async (memberId, movieId, date) => {
    try {
      const newSubscription = { memberId, movieId, date };
      const response = await api.post('/subscriptions', newSubscription);
      dispatch(addSubscription(response.data));
      setAddingSubscriptionFor(null);
      // Optionally, you can refresh the subscriptions data
      dispatch(fetchSubscriptions());
    } catch (error) {
      console.error('Error adding subscription:', error);
    }
  };
  const handleDeleteSubscription = async (subscriptionId) => {
    try {
      await api.delete(`/subscriptions/${subscriptionId}`);
      dispatch(deleteSubscription(subscriptionId));
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  const getMemberSubscriptions = (memberId) => {
    return subscriptions
      .filter(sub => sub && sub.memberId && (sub.memberId === memberId || sub.memberId._id === memberId))
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

  const getUnwatchedMovies = (memberId) => {
    const watchedMovieIds = subscriptions
      .filter(sub => sub && sub.memberId && (sub.memberId === memberId || sub.memberId._id === memberId))
      .map(sub => sub.movieId?._id || sub.movieId);
    return movies.filter(movie => movie && movie._id && !watchedMovieIds.includes(movie._id));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Members
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setIsAddMemberOpen(true)}>
          Add Member
        </Button>
      </Box>

      <MemberSearch onSearch={handleSearch} />

      <Grid container spacing={4}>
        {filteredMembers.map((member) => (
          <Grid item key={member._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <Link to={`/member/${member._id}`}>{member.name}</Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {member.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  City: {member.city}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button size="small" color="primary" onClick={() => handleEdit(member)}>
                    Edit
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleDelete(member._id)}>
                    Delete
                  </Button>
                  <Button size="small" onClick={() => toggleSubscriptions(member._id)}>
                    {expandedMember === member._id ? 'Hide Subscriptions' : 'Manage Subscriptions'}
                  </Button>
                </Box>
                {expandedMember === member._id && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">Subscriptions:</Typography>
                    {getMemberSubscriptions(member._id).length > 0 ? (
                      <List dense>
                        {getMemberSubscriptions(member._id).map((sub, index) => (
                          <React.Fragment key={sub._id || index}>
                            <ListItem>
                              <ListItemText
                                primary={<Link to={`/movie/${sub.movieId._id}`}>{sub.movieName}</Link>}
                                secondary={`Watched on: ${formatDate(sub.date)}`}
                              />
                              <ListItemSecondaryAction>
                                <IconButton 
                                  edge="end" 
                                  aria-label="delete" 
                                  onClick={() => handleDeleteSubscription(sub._id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                            {index < getMemberSubscriptions(member._id).length - 1 && <Divider />}
                          </React.Fragment>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2">No subscriptions for this member.</Typography>
                    )}
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => setAddingSubscriptionFor(member._id)}
                      sx={{ mt: 1 }}
                    >
                      Add Subscription
                    </Button>
                    {addingSubscriptionFor === member._id && (
                        <AddSubscription
                          movies={getUnwatchedMovies(member._id)}
                          onSubscribe={(movieId, date) => handleAddSubscription(member._id, movieId, date)}
                          memberId={member._id}
                          onClose={() => setAddingSubscriptionFor(null)}
                        />
                      )}
                    
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <EditMember
        member={editingMember}
        open={Boolean(editingMember)}
        handleClose={handleCloseEdit}
        updateMember={handleUpdateMember}
      />
      <AddMember
        open={isAddMemberOpen}
        handleClose={() => setIsAddMemberOpen(false)}
        addMember={handleAddMember}
      />
    </Container>
  );
}

export default Members;