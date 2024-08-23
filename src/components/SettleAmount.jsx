import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './BuyCarInsurance.css';

function SettleAmount() {
  const location = useLocation();
  const { id } = useParams();
  const claimJson = location.state?.claimJson || '{}';
  const claim = JSON.parse(claimJson);
  const [record, setRecord] = useState();

  const [inputData, setInputData] = useState({
    settlement_amount: "",
    settlement_status: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8051/claim/${id}`)
      .then((response) => {
        setRecord(response.data.carinsurance.customer.customer_name)
        setInputData(prev => ({
          ...prev,
          settlement_amount: response.data.settlement_amount || "",
          settlement_status: response.data.settlement_status || ""
        }));
      })
      .catch((err) => {
        console.log("Error fetching claims:", err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputData.settlement_amount || !inputData.settlement_status) {
      alert("Please fill all fields.");
      return;
    }

    axios.post("http://localhost:8051/settlement", {
      claim_id: id,
      settlement_amount: inputData.settlement_amount,
      settlement_status: inputData.settlement_status
    })
    .then(() => {
      alert("Successfully Credited the Amount to the Customer");
      navigate("/viewclaim4"); 
    })
    .catch((err) => console.error('Error submitting the form:', err));
  };

  return (
    <div id="add2" className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <h1>Update Settlement Status </h1>
          <br />
          <div>
            <label htmlFor="customer_name">Customer Name:</label>
            <input
              type="text"
              name="customer_name"
              className="form-control"
              value={record}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="settlement_amount">Settlement Amount:</label>
            <input
              type="number"
              name="settlement_amount"
              className="form-control"
              value={inputData.settlement_amount}
              onChange={(e) =>
                setInputData({ ...inputData, settlement_amount: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="settlement_status">Settlement Status:</label>
            <select
              name="settlement_status"
              className="form-control"
              value={inputData.settlement_status}
              onChange={(e) =>
                setInputData({ ...inputData, settlement_status: e.target.value })
              }
            >
              <option value="" disabled>Select Status</option>
              <option value="Credited">Credited</option>
              <option value="Fake Reports">Fake Reports</option>
            </select>
          </div>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SettleAmount;
