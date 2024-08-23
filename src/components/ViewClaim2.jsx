import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewClaim2.css";
import Logo from './back.png';
import { useNavigate } from "react-router-dom";

function ViewClaim2() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [customerID, setCustomerID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedInsurance = sessionStorage.getItem("loggedInUser");
    if (storedInsurance) {
      const parsedInsurance = JSON.parse(storedInsurance);
      setCustomerID(parsedInsurance.customer_id);
    } else {
      setError("No customer ID found in session storage.");
    }
  }, []);

  useEffect(() => {
    if (customerID) {
      const fetchCustomerClaims = async () => {
        try {
          const response = await axios.get("http://localhost:8051/claim/all");
          const allClaims = response.data;

          const filteredClaims = allClaims.filter(claim => claim.carinsurance?.customer?.customer_id === customerID);

          if (filteredClaims.length > 0) {
            setRecords(filteredClaims);
          } else {
            setError("No claims found for the customer.");
          }
        } catch (err) {
          console.error("Error fetching customer claims: ", err);
          setError("Error fetching claims.");
        }
      };

      fetchCustomerClaims();
    }
  }, [customerID]);

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div id="body">
      <div className="container-fluid">
      <header className="view-cars-banner bg-info">
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <h1 className="banner-title text-dark">Applied for Insurance Claim</h1>
      </header>

      {error && <p className="error-message">{error}</p>}

      <div className="card-container">
        {records.map((claim, index) => (
          <div className="card" key={index}>
            <h2 className="card-title">{claim.claim_issue}</h2>
            <div className="card-content">
              <div className="card-item">
                <span className="card-label">Customer Name:</span>
                <span className="card-value">{claim.carinsurance?.customer?.customer_name}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Customer Email:</span>
                <span className="card-value">{claim.carinsurance?.customer?.customer_email}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Customer Mobile:</span>
                <span className="card-value">{claim.carinsurance?.customer?.customer_mobile}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Car Brand:</span>
                <span className="card-value">{claim.car_make}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Car Name:</span>
                <span className="card-value">{claim.car_name}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Car Model:</span>
                <span className="card-value">{claim.car_model}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Car Year:</span>
                <span className="card-value">{claim.car_year}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Car Registered On:</span>
                <span className="card-value">{claim.car_buyingdate}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Car Number:</span>
                <span className="card-value">{claim.car_number}</span>
              </div>
              <div className={`card-status-button ${claim.claim_status.toLowerCase()}`}>
                {claim.claim_status}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>
  );
}

export default ViewClaim2;