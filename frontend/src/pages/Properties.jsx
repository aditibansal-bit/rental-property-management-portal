import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProperties,
  addProperty,
  deleteProperty,
  updateProperty,
  searchProperties,
} from "../services/propertyService";
import "../styles/Properties.css";

function Properties() {
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    rent: "",
    description: "",
    image: null,
  });

  const [editingId, setEditingId] = useState(null);

  const [filters, setFilters] = useState({
  location: "",
  minRent: "",
  maxRent: "",
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
  setFormData({
    ...formData,
    image: e.target.files[0],
  });
};

  const handleAddProperty = async () => {
    try {
      if (editingId) {
        await updateProperty(editingId, formData);
        alert("Property updated successfully");
      } else {
        await addProperty(formData);
        alert("Property added successfully");
      }

      setFormData({
        title: "",
        location: "",
        rent: "",
        description: "",
        image: null,
      });

      setEditingId(null);

      fetchProperties();
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      alert("Failed to save property");
    }
  };

  const handleSearchChange = (e) => {
  setFilters({
    ...filters,
    [e.target.name]: e.target.value,
  });
};

const handleSearch = async () => {
  try {
    const data = await searchProperties(filters);
    setProperties(data);
  } catch (error) {
    console.log(error);
    alert("Search failed");
  }
};

const handleReset = async () => {
  setFilters({
    location: "",
    minRent: "",
    maxRent: "",
  });

  fetchProperties();
};

  const handleEdit = (property) => {
    setFormData({
      title: property.title,
      location: property.location,
      rent: property.rent,
      description: property.description,
    });

    setEditingId(property._id);
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

  return (
    <div className="page">
      <h1>Properties</h1>

<div className="search-section">
  <div className="search-bar">
    <input
      type="text"
      name="location"
      placeholder="Search by Location"
      value={filters.location}
      onChange={handleSearchChange}
    />

    <input
      type="number"
      name="minRent"
      placeholder="Min Rent"
      value={filters.minRent}
      onChange={handleSearchChange}
    />

    <input
      type="number"
      name="maxRent"
      placeholder="Max Rent"
      value={filters.maxRent}
      onChange={handleSearchChange}
    />

    <button onClick={handleSearch}>
      Search
    </button>

    <button onClick={handleReset}>
      Reset
    </button>
  </div>
</div>

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
        />

        <input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
/>

        <button onClick={handleAddProperty}>
          {editingId ? "Update Property" : "Add Property"}
        </button>
      </div>

      <div className="property-grid">
        {properties.map((property) => (
          <div className="property-card" key={property._id}>

            {property.image && (
  <img
    src={`http://localhost:5000/uploads/${property.image}`}
    alt={property.title}
    className="property-image"
  />
)}
            <h2>{property.title}</h2>

            <p>
              <strong>Location:</strong> {property.location}
            </p>

           <p>
  <strong>Rent:</strong> ₹{property.rent}/month
</p>

<p>
  <strong>Status:</strong>{" "}
  <span
    className={
      property.status === "Available"
        ? "available-status"
        : "rented-status"
    }
  >
    {property.status}
  </span>
</p>

<p>{property.description}</p>
            <div className="property-buttons">

  <Link to={`/properties/${property._id}`}>
    <button className="view-btn">
      View Details
    </button>
  </Link>

  <button
    className="edit-btn"
    onClick={() => handleEdit(property)}
  >
    Edit
  </button>

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