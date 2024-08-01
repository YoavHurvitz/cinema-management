import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box, styled, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MovieIcon from '@mui/icons-material/Movie';
import { clearUser } from '../redux/userSlice';

const StyledButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(0, 1),
  borderRadius: '4px',
  border: `2px solid ${theme.palette.common.white}`,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  },
  ...(active && {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  }),
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);

  const [anchorEl, setAnchorEl] = useState(null);




  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(clearUser());
    navigate('/');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };
  const user = userData?.user;

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Box display="flex" alignItems="center">
          <MovieIcon sx={{ fontSize: 40, marginRight: 2 }} />
          <Typography variant="h4" component="div">
            Cinema Management
          </Typography>
        </Box>
        <ButtonContainer>
          {user && (
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              Welcome, {user.name}
            </Typography>
          )}
          <StyledButton
            variant="outlined"
            color="inherit"
            component={Link}
            to="/movies"
            active={location.pathname === '/movies'}
          >
            Movies
          </StyledButton>
          <StyledButton
            variant="outlined"
            color="inherit"
            component={Link}
            to="/members"
            active={location.pathname === '/members'}
          >
            Members & Subscriptions
          </StyledButton>
          {user && (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar>{user.name ? user.name.charAt(0) : 'U'}</Avatar>
            </IconButton>
          )}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>
              <AccountCircleIcon sx={{ mr: 1 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToAppIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </ButtonContainer>
      </StyledToolbar>
    </AppBar>
  );
}

export default Navbar;