import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewClaim.css";
import Logo from './back.png';
import { useNavigate } from "react-router-dom";

function ViewClaim() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:8051/claim/all")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((err) => {
        console.log("Error fetching claims:", err);
      });
  }, []);

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div id="body" className="container">
      <header className="view-cars-banner bg-info">
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <h1 className="banner-title text-dark">Applied for Insurance Claim</h1>
      </header>

      <div className="claims-list">
        {records.map((d, i) => (
          <div key={i} className="claim-card">
            <table>
              <div className="claim-row">
                <div className="claim-label">Claim Id:</div>
                <div className="claim-value">{d.claim_id}</div>
              </div>
              <div className="claim-row">
                <div className="claim-label">Claim Issue:</div>
                <div className="claim-value">{d.claim_issue}</div>
              </div>
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
                <div className="claim-value">{d.claim_status}</div>
              </div>
              </table>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewClaim;
