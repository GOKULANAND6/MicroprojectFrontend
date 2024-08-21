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

  // Fetch customer ID from session storage
  useEffect(() => {
    const storedInsurance = sessionStorage.getItem("loggedInUser");
    if (storedInsurance) {
      const parsedInsurance = JSON.parse(storedInsurance);
      setCustomerID(parsedInsurance.customer_id); // Adjust based on how customer ID is stored
    } else {
      setError("No customer ID found in session storage.");
    }
  }, []);

  // Fetch and filter claims
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

        <div className="claims-container">
          {error && <p className="error-message">{error}</p>}
          {records.map((d, i) => (
            <div className="claim-card" key={i}>
              <h2 className="claim-title">Claim Issue: {d.claim_issue}</h2>
              <div className="claim-details">
                <div className="claim-row">
                  <div className="claim-label">Customer Name:</div>
                  <div className="claim-value">{d.carinsurance?.customer?.customer_name}</div>
                </div>
                <div className="claim-row">
                  <div className="claim-label">Customer Email:</div>
                  <div className="claim-value">{d.carinsurance?.customer?.customer_email}</div>
                </div>
                <div className="claim-row">
                  <div className="claim-label">Customer Mobile:</div>
                  <div className="claim-value">{d.carinsurance?.customer?.customer_mobile}</div>
                </div>
                <div className="claim-row">
                  <div className="claim-label">Car Brand:</div>
                  <div className="claim-value">{d.car_make}</div>
                </div>
                <div className="claim-row">
                  <div className="claim-label">Car Name:</div>
                  <div className="claim-value">{d.car_name}</div>
                </div>
                <div className="claim-row">
                  <div className="claim-label">Car Model:</div>
                  <div className="claim-value">{d.car_model}</div>
                </div>
                <div className="claim-row">
                  <div className="claim-label">Car Year:</div>
                  <div className="claim-value">{d.car_year}</div>
                </div>
                <div className="claim-row">
                  <div className="claim-label">Car Registered On:</div>
                  <div className="claim-value">{d.car_buyingdate}</div>
                </div>
                <div className="claim-row">
                  <div className="claim-label">Car Number:</div>
                  <div className="claim-value">{d.car_number}</div>
                </div>
                <div className="claim-row">
                  <div className="claim-label">Claim Status:</div>
                  <div className="claim-value">
                    <span className="claim-status-button">{d.claim_status}</span>
                  </div>
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
