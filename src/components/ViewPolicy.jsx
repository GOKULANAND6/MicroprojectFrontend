import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Logo from './back.png';
import "./ViewPolicy.css";

function ViewPolicy() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [records, setRecords] = useState([]); // Keep records as an array
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get("http://localhost:8051/carinsurance/all");
        const profiles = response.data; 
        // Filter policies based on customer_id
        const userPolicies = profiles.filter(prod => prod.customer.customer_id === parseInt(id));
        if (userPolicies.length > 0) {
          setRecords(userPolicies);
        } else {
          setError("No policies found for this customer");
        }
      } catch (err) {
        console.error("Error fetching policies:", err);
        setError("Error fetching policies");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [id]);

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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          records.length > 0 ? (
            records.map((record, index) => (
              <div key={index} className="policy-card">
                <div className="policy-card-header">
                  <h2>Policy ID: {record.policy_id}</h2>
                </div>
                <div className="policy-card-body">
                  <div className="policy-detail">
                    <strong>Policy Name:</strong> {record.policy_name}
                  </div>
                  <div className="policy-detail">
                    <strong>Policy Scheme:</strong> {record.policy_scheme}
                  </div>
                  <div className="policy-detail">
                    <strong>Customer Name:</strong> {record.customer?.customer_name}
                  </div>
                  <div className="policy-detail">
                    <strong>Customer Mobile:</strong> {record.customer?.customer_mobile}
                  </div>
                  <div className="policy-detail">
                    <strong>Customer Email:</strong> {record.customer?.customer_email}
                  </div>
                  <div className="policy-detail">
                    <strong>Car Make:</strong> {record.car_make}
                  </div>
                  <div className="policy-detail">
                    <strong>Car Name:</strong> {record.car_name}
                  </div>
                  <div className="policy-detail">
                    <strong>Car Model:</strong> {record.car_model}
                  </div>
                  <div className="policy-detail">
                    <strong>Year:</strong> {record.car_year}
                  </div>
                  <div className="policy-detail">
                    <strong>Registered On:</strong> {record.car_buyingdate}
                  </div>
                  <div className="policy-detail">
                    <strong>Car Number:</strong> {record.car_number}
                  </div>
                  <div className="policy-detail">
                    <strong>Total Amount Paid:</strong> {record.policy_amount}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No policies found for this customer</p>
          )
        )}
      </div>
    </div>
  );
}

export default ViewPolicy;
