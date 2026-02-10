import axios from 'axios';

const apiClient = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },  
});

// 🔁 Retry logic (1 retry)
apiClient.interceptors.response.use(
    response => response,
    async error => {
        const config = error.config;

        if(!config || config._retry) {
            return Promise.reject(error);
        }

        config._retry = true;
        return apiClient(config);
    },
);

export default apiClient;