import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { fetchAllData } from './redux/actions';
import Navbar from './components/Navbar';
import Movies from './pages/Movies';
import Members from './pages/Members';
import Profile from './components/Profile';
import Movie from './pages/Movie';
import Member from './pages/Member';
import Login from './pages/Login';

const theme = createTheme();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  const appContainerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={appContainerStyle}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/members" element={<Members />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/member/:id" element={<Member />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
