import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from './back.png';
import "./ViewPolicy.css";

function ViewPolicy() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8051/carinsurance/all")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
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
        <h1 className="banner-title text-dark">Insurance Policy Details</h1>
      </header>

      <div className="policy-cards">
        {records.map((d, i) => (
          <div key={i} className="policy-card">
            <div className="policy-card-header">
              <h2>Policy ID: {d.policy_id}</h2>
            </div>
            <div className="policy-card-body">
              <div className="policy-detail">
                <strong>Policy Name:</strong> {d.policy_name}
              </div>
              <div className="policy-detail">
                <strong>Policy Scheme:</strong> {d.policy_scheme}
              </div>
              <div className="policy-detail">
                <strong>Customer Name:</strong> {d.customer?.customer_name}
              </div>
              <div className="policy-detail">
                <strong>Customer Mobile:</strong> {d.customer?.customer_mobile}
              </div>
              <div className="policy-detail">
                <strong>Customer Email:</strong> {d.customer?.customer_email}
              </div>
              <div className="policy-detail">
                <strong>Car Make:</strong> {d.car_make}
              </div>
              <div className="policy-detail">
                <strong>Car Name:</strong> {d.car_name}
              </div>
              <div className="policy-detail">
                <strong>Car Model:</strong> {d.car_model}
              </div>
              <div className="policy-detail">
                <strong>Year:</strong> {d.car_year}
              </div>
              <div className="policy-detail">
                <strong>Registered On:</strong> {d.car_buyingdate}
              </div>
              <div className="policy-detail">
                <strong>Car Number:</strong> {d.car_number}
              </div>
              <div className="policy-detail">
                <strong>Total Amount Paid:</strong> {d.policy_amount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPolicy;
