// src/services/userService.js
import axios from "axios";

const API_BASE = "http://localhost:9090/users";

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add token to requests if available
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('relink_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE}/email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_BASE}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};