import axios from "axios";

const API_URL = "http://localhost:5000/api/properties";

export const getProperties = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteProperty = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const addProperty = async (propertyData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API_URL, propertyData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};