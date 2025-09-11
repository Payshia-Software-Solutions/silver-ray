
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/Silver_server',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to format the URL for the PHP backend
apiClient.interceptors.request.use(config => {
  if (config.url) {
    // The PHP backend expects the route path in a `route` query parameter.
    // e.g., /company/rooms/2 becomes ?route=company/rooms/2
    config.params = {
      ...config.params,
      route: config.url.startsWith('/') ? config.url.substring(1) : config.url,
    };
    // The base URL already has the server path, so we set the config URL to /
    // to prevent duplication. The `route` param will handle the path.
    config.url = '/';
  }
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
