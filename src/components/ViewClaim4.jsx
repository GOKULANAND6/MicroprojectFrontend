import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewClaim4.css";
import Logo from './back.png';

function ViewClaim4() {
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

  const handleSettlementClick = (id, claim) => {
    const claimJson = JSON.stringify(claim);
    navigate(`/settlement/${id}`, { state: { claimJson } });
  };

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
            <div className="claim-card-header">
              <h2>Claim ID: {d.claim_id}</h2>
            </div>
            <div className="claim-card-body">
              <div className="claim-detail">
                <strong>Claim Issue:</strong> {d.claim_issue}
              </div>
              <div className="claim-detail">
                <strong>Customer Name:</strong> {d.carinsurance?.customer?.customer_name}
              </div>
              <div className="claim-detail">
                <strong>Customer Email:</strong> {d.carinsurance?.customer?.customer_email}
              </div>
              <div className="claim-detail">
                <strong>Customer Mobile:</strong> {d.carinsurance?.customer?.customer_mobile}
              </div>
              <div className="claim-detail">
                <strong>Car Brand:</strong> {d.car_make}
              </div>
              <div className="claim-detail">
                <strong>Car Name:</strong> {d.car_name}
              </div>
              <div className="claim-detail">
                <strong>Car Model:</strong> {d.car_model}
              </div>
              <div className="claim-detail">
                <strong>Car Year:</strong> {d.car_year}
              </div>
              <div className="claim-detail">
                <strong>Car Registered On:</strong> {d.car_buyingdate}
              </div>
              <div className="claim-detail">
                <strong>Car Number:</strong> {d.car_number}
              </div>
              <div className="claim-detail">
                <strong>Claim Status:</strong> {d.claim_status}
              </div>
            </div>
            <div className="claim-card-footer">
              <button
                className="btn btn-success"
                onClick={() => handleSettlementClick(d.claim_id, d)}
                disabled={d.claim_status === "credited" || d.claim_status === "approved"}
              >
                {d.claim_status === "credited" ? "Amount Settled" : "Settle Amount"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewClaim4;
