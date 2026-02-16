// src/services/recruiterService.js
import axios from "axios";
import { mockRecruiters } from "../mocks/recruiterMockData";
import { USE_MOCK_DATA } from "../config";

const API_BASE = "http://localhost:9090/recruiters";

export const getRecruiterById = async (id) => {
  if (USE_MOCK_DATA) {
    const recruiter = mockRecruiters.find((r) => r.id === id);
    if (!recruiter) throw new Error("Recruiter not found (mock)");
    return recruiter;
  }

  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recruiter by ID:", error);
    throw error;
  }
};

export const createRecruiter = async (recruiterData) => {
  if (USE_MOCK_DATA) {
    const newRecruiter = { ...recruiterData, id: Date.now().toString() };
    mockRecruiters.push(newRecruiter);
    return newRecruiter;
  }

  try {
    const response = await axios.post(`${API_BASE}/create`, recruiterData);
    return response.data;
  } catch (error) {
    console.error("Error creating recruiter:", error);
    throw error;
  }
};

export const deleteRecruiter = async (id) => {
  if (USE_MOCK_DATA) {
    const index = mockRecruiters.findIndex((r) => r.id === id);
    if (index !== -1) mockRecruiters.splice(index, 1);
    return;
  }

  try {
    await axios.delete(`${API_BASE}/${id}`);
  } catch (error) {
    console.error("Error deleting recruiter:", error);
    throw error;
  }
};

export const getAllRecruiters = async () => {
  if (USE_MOCK_DATA) {
    return mockRecruiters;
  }

  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.error("Error fetching recruiters:", error);
    throw error;
  }
};
