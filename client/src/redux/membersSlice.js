// src/redux/membersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async () => {
    const response = await api.get('/members');
    return response.data;
  }
);

const membersSlice = createSlice({
  name: 'members',
  initialState: [],
  reducers: {
    setMembers: (state, action) => {
      return action.payload;
    },
    updateMember: (state, action) => {
      const index = state.findIndex(member => member._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteMember: (state, action) => {
      return state.filter(member => member._id !== action.payload);
    },
    addMember: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setMembers, updateMember, deleteMember, addMember } = membersSlice.actions;
export default membersSlice.reducer;