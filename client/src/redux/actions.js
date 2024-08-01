import api from '../services/api';
import { setMovies } from './moviesSlice';
import { setMembers } from './membersSlice';
import { setSubscriptions } from './subscriptionsSlice';

export const fetchAllData = () => async (dispatch) => {
  try {
    const [moviesResponse, membersResponse, subscriptionsResponse] = await Promise.all([
      api.get('/movies'),
      api.get('/members'),
      api.get('/subscriptions'),
    ]);

    dispatch(setMovies(moviesResponse.data));
    dispatch(setMembers(membersResponse.data));
    dispatch(setSubscriptions(subscriptionsResponse.data));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};