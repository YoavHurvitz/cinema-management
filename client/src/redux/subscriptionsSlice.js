
// src/redux/subscriptionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async () => {
    const response = await api.get('/subscriptions');
    return response.data;
  }
);

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: [],
  reducers: {
    setSubscriptions: (state, action) => {
      return action.payload;
    },
    deleteSubscriptionsForMovie: (state, action) => {
      return state.filter(sub => sub.movieId !== action.payload);
    },
    deleteSubscriptionsForMember: (state, action) => {
      return state.filter(sub => sub.memberId !== action.payload);
    },
    addSubscription: (state, action) => {
      state.push(action.payload);
    },
    deleteSubscription: (state, action) => {
      return state.filter(subscription => subscription._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubscriptions.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setSubscriptions, addSubscription, deleteSubscription,deleteSubscriptionsForMovie,deleteSubscriptionsForMember} = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;