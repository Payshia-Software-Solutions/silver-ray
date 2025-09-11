
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/Silver_server',
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors for requests or responses here
// For example, to handle token authentication
apiClient.interceptors.request.use(config => {
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
}, error => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(response => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  return response;
}, error => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // You can add global error handling here
  return Promise.reject(error);
});


export default apiClient;
