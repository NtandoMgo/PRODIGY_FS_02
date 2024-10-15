import axios from 'axios';

const API_URL = 'http://localhost:8080';

const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};

const AuthService = {
    login,
};

export default AuthService;
