import { useEffect, useState } from "react";
import axios from "axios";

function RentalRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/rental-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/rental-requests/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchRequests();

  } catch (error) {
    console.log(error);
    alert("Failed to update request");
  }
};

  return (
    <div className="page">
      <h1>Rental Requests</h1>

      {requests.map((request) => (
        <div key={request._id} className="property-card">
          <h2>{request.property.title}</h2>

          <p>
            <strong>Tenant:</strong> {request.tenant.name}
          </p>

          <p>
            <strong>Email:</strong> {request.tenant.email}
          </p>

          <p>
  <strong>Status:</strong> {request.status}
</p>

<div className="request-buttons">
  <button
    className="approve-btn"
    onClick={() =>
      updateStatus(request._id, "Approved")
    }
  >
    Approve
  </button>

  <button
    className="reject-btn"
    onClick={() =>
      updateStatus(request._id, "Rejected")
    }
  >
    Reject
  </button>
</div>
        </div>
      ))}
    </div>
  );
}

export default RentalRequests;