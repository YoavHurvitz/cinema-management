import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Paper, Typography, Box, Avatar, Divider } from '@mui/material';

function Profile() {
  const userData = useSelector(state => state.user);
  const user = userData?.user;  // Extract the user object from the userData

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4">User not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar sx={{ width: 100, height: 100, mr: 3, bgcolor: 'primary.main' }}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Box>
            <Typography variant="h4">{user.name}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              User
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography variant="h6" gutterBottom>
            User Details
          </Typography>
          <Typography><strong>ID:</strong> {user.id}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          {/* If you have a joinDate field, uncomment the next line */}
          {/* <Typography><strong>Join Date:</strong> {new Date(user.joinDate).toLocaleDateString()}</Typography> */}
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;