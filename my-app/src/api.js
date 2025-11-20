import axios from 'axios';

// Base URL derived from current origin unless overridden
const baseURL = (process.env.REACT_APP_API_URL || window.location.origin) + '/api';

const api = axios.create({
  baseURL,
});

export default api;