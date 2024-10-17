import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

const login = async (username, password) => {
    try {
        const response = await axios.post(
            'http://localhost:8080/auth/login',
            { username, password }, // Send as JSON
            {
                headers: {
                    'Content-Type': 'application/json', // Use JSON content type
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};
export { login };

export const logout = () => {
    // Clear user data (e.g., remove token from local storage)
    localStorage.removeItem('user');
};