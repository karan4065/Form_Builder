import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'https://form-builder-2-0srn.onrender.com' });

export default API;