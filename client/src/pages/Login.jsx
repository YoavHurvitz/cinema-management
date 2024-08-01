import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Switch, 
  FormControlLabel 
} from '@mui/material';
import api from '../services/api';
import { setUser } from '../redux/userSlice'; // Assume you have a userSlice for managing user state

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Login
        const response = await api.post('/users/login', { email, password });
        dispatch(setUser(response.data));
        navigate('/movies');
      } else {
        // Signup
        const response = await api.post('/users/signup', { name, email, password });
        dispatch(setUser(response.data));
        navigate('/');
        setIsLogin(true);  
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {!isLogin && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={isLogin}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          <FormControlLabel
            control={<Switch checked={!isLogin} onChange={() => setIsLogin(!isLogin)} />}
            label={isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          />
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;