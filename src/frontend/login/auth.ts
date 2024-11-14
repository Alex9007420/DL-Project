import axios from 'axios';

export const login = async (username: string, password: string): Promise<boolean> => {
    try {
        const response: any = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            return true;
        }
    } catch (error) {
        console.error("Login error:", error);
        return false;
    }
    return false;
};

export const logout = (): void => {
    localStorage.removeItem('token');
};

export const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
};
