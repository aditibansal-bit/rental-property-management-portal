import axios from "axios";

const API_URL = "http://localhost:5000/api/properties";

// Get all properties
export const getProperties = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get one property by ID
export const getPropertyById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Search & Filter
export const searchProperties = async (filters) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: filters,
  });

  return response.data;
};

// Add Property
export const addProperty = async (propertyData) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("title", propertyData.title);
  formData.append("location", propertyData.location);
  formData.append("rent", propertyData.rent);
  formData.append("description", propertyData.description);

  if (propertyData.image) {
    formData.append("image", propertyData.image);
  }

  const response = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
// Update Property
export const updateProperty = async (id, propertyData) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("title", propertyData.title);
  formData.append("location", propertyData.location);
  formData.append("rent", propertyData.rent);
  formData.append("description", propertyData.description);

  if (propertyData.image) {
    formData.append("image", propertyData.image);
  }

  const response = await axios.put(
    `${API_URL}/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
// Delete Property
export const deleteProperty = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const requestRental = async (propertyId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/rental-requests",
    {
      property: propertyId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};