import axios from 'axios';

const API_URL = 'http://localhost:3050'; // Updated to use port 3050

const api = axios.create({
  baseURL: API_URL,
});

export default api;