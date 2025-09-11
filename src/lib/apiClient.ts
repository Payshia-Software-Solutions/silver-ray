
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/Silver_server',
  headers: {
    'Content-Type': 'application/json',
  },
});

// The PHP backend uses a query parameter for routing (e.g., index.php?route=/my-path).
// This interceptor modifies the request URL to match that format.
apiClient.interceptors.request.use(config => {
    if (config.url) {
        // Ensure the path starts with a slash
        const path = config.url.startsWith('/') ? config.url : `/${config.url}`;
        
        // Transform the URL to use the 'route' query parameter
        config.url = `/?route=${path}`;
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
