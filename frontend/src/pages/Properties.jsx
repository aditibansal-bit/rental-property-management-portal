import { useEffect, useState } from "react";
import {
  getProperties,
  deleteProperty,
  addProperty,
} from "../services/propertyService";
import "../styles/Properties.css";

function Properties() {
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
  title: "",
  location: "",
  rent: "",
  description: "",
});

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
  try {
    await deleteProperty(id);

    fetchProperties();

    alert("Property deleted successfully");
  } catch (error) {
    console.log(error);
    alert("Failed to delete property");
  }
};

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleAddProperty = async () => {
  try {
    await addProperty(formData);

    alert("Property added successfully");

    setFormData({
      title: "",
      location: "",
      rent: "",
      description: "",
    });

    fetchProperties();

  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
    alert("Failed to add property");
  }
};

  return (
  <div className="page">
    <h1>Properties</h1>

    <div className="property-form">
  <input
    type="text"
    name="title"
    placeholder="Property Title"
    value={formData.title}
    onChange={handleChange}
  />

  <input
    type="text"
    name="location"
    placeholder="Location"
    value={formData.location}
    onChange={handleChange}
  />

  <input
    type="number"
    name="rent"
    placeholder="Monthly Rent"
    value={formData.rent}
    onChange={handleChange}
  />

  <textarea
    name="description"
    placeholder="Description"
    value={formData.description}
    onChange={handleChange}
  ></textarea>

  <button onClick={handleAddProperty}>
    Add Property
  </button>
</div>

    <div className="property-grid">
      {properties.map((property) => (
        <div className="property-card" key={property._id}>
          <h2>{property.title}</h2>

          <p>
            <strong>Location:</strong> {property.location}
          </p>

          <p>
            <strong>Rent:</strong> ₹{property.rent}/month
          </p>

          <p>{property.description}</p>

          <div className="property-buttons">
            <button className="edit-btn">Edit</button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(property._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
export default Properties;