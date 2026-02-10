import axios from "axios";

const API_BASE_URL = "http://localhost:9090/api/users";

export const registerUser = async (formData) => {
  const response = await axios.post(
    `${API_BASE_URL}/register`,
    formData
  );
  return response.data;
};
