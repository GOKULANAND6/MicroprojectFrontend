import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewSettlement.css";
import { useNavigate } from "react-router-dom";
import Logo from './back.png';

function ViewSettlement() {
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
      const fetchCustomerSettlements = async () => {
        try {
          const response = await axios.get("http://localhost:8051/settlement/all");
          const allSettlements = response.data;

          const filteredSettlements = allSettlements.filter(settlement => settlement?.insuranceclaim?.carinsurance?.customer?.customer_id === customerID);

          if (filteredSettlements.length > 0) {
            setRecords(filteredSettlements);
          } else {
            setError("No settlements found for the customer.");
          }
        } catch (err) {
          console.error("Error fetching settlements: ", err);
          setError("Error fetching settlements.");
        }
      };

      fetchCustomerSettlements();
    }
  }, [customerID]);

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="container">
                  <header className="view-cars-banner bg-info">
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <h1 className="banner-title text-dark">Amount Received</h1>
      </header>

      <div className="card-container">
        {records.map((d, i) => (
          <div key={i} className="card">
            <h2 className="card-title">{d.insuranceclaim?.carinsurance?.policy_name}</h2>
            <div className="card-content">
              <div className="card-item">
                <span className="card-label">Car Brand:</span>
                <span className="card-value">{d.insuranceclaim?.car_make}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Car Name:</span>
                <span className="card-value">{d.insuranceclaim?.car_name}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Settlement Amount:</span>
                <span className="card-value amount">{d.settlement_amount}</span>
              </div>
              <div className="card-item">
                <span className="card-label">Settlement Status:</span>
                <span className="card-value status">{d.settlement_status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewSettlement;
