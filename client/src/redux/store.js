import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import membersReducer from './membersSlice';
import subscriptionsReducer from './subscriptionsSlice';
import userReducer from './userSlice';
import { setUser } from '../redux/userSlice'; // Assume you have a userSlice for managing user state

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    members: membersReducer,
    subscriptions: subscriptionsReducer,
    user: userReducer
  },
});

const savedUser = localStorage.getItem('user');
if (savedUser) {
  store.dispatch(setUser(JSON.parse(savedUser)));
}

// Subscribe to store changes
store.subscribe(() => {
  const user = store.getState().user;
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
});

export default store;