import axios from "axios";

const API_BASE_URL = process.env.APP_API_BASE_URL || 'http://localhost:5000/api/v1';


export const login = async (username) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username });


  console.log(response.headers);

    return response.data;
  };

  export const logout = async (username) => {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`, { username });
    return response.data;
  };