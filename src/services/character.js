import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const fetchCharacters = async (page) => {
  const response = await api.get(`${API_BASE_URL}/characters?page=${page}`);
  return response.data;
};

export const postFavoriteCharacter = async (character_id) => {
  const response = await api.post(`${API_BASE_URL}/favorites/${character_id}`);
  return response.data;
};

export const deleteFavoriteCharacter = async (character_id) => {
  const response = await api.delete(`${API_BASE_URL}/favorites/${character_id}`);
  return response.data;
};