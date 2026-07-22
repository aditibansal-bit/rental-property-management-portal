import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getPropertyById,
  requestRental,
} from "../services/propertyService";
import "../styles/PropertyDetails.css";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const data = await getPropertyById(id);
      setProperty(data);
    } catch (error) {
      console.log(error);
    }
  };

const handleRentalRequest = async () => {
  try {
    const response = await requestRental(property._id);

    alert(response.message);

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to submit rental request"
    );
  }
};
  if (!property) {
    return (
      <div className="details-page">
        <h2>Loading Property...</h2>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-card">

      {property.image && (
  <img
    src={`http://localhost:5000/uploads/${property.image}`}
    alt={property.title}
    className="details-image"
  />
)}  
        <h1>{property.title}</h1>

        <h3>📍 {property.location}</h3>

        <h2>₹ {property.rent} / month</h2>

        <p>{property.description}</p>

        <div className="details-buttons">

          <button
  className="request-btn"
  onClick={handleRentalRequest}
>
  Request Rental
</button>

          <Link to="/properties">
            <button className="back-btn">
              Back to Properties
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default PropertyDetails;