import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './BuyCarInsurance.css';

function SettleAmount() {
  const location = useLocation();
  const {id} = useParams();
  const claimJson = location.state?.claimJson || '{}';
  const claim = JSON.parse(claimJson);
  console.log(claim);
  
  const [record, setRecord] = useState(claim);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputData, setInputData] = useState({
    settlement_amount: "",
    settlement_status: "",
    insuranceclaim: 
    {
      claim_id: "",
      claim_issue: "",
      car_make: "",
      car_name: "",
      car_model: "",
      car_year: "",
      car_buyingdate: "",
      car_number: "",
      claim_status: "",
      carinsurance: 
          {
            policy_id: "",
            policy_name: "",
            policy_scheme: "",
            car_make: "",
            car_name: "",
            car_model: " ",
            car_year: "",
            car_buyingdate: "",
            car_number: "",
            policy_amount: "" ,
            customer: 
            {
                customer_id: "",
                customer_name: "",
                customer_email: "",
                customer_mobile: "",
                customer_address: "",
                customer_pincode: "",
                customer_dob: "",
                customer_age: "",
                customer_gender: "",
                customer_password: ""
            }
      }
    }  
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8051/claim/${id}`)
      .then((response) => {
        setRecord(response.data);
        console.log(response.data)
      })
      .catch((err) => {
        console.log("Error fetching claims:", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateValues(inputData);

    if (result) {
      axios.post("http://localhost:8051/settlement", {
        settlement_amount: inputData.settlement_amount,
        settlement_status: inputData.settlement_status,
        insuranceclaim: { 
          claim_id: record.claim_id,
          claim_issue: record.claim_issue,
          car_make: record.car_make,
          car_name: record.car_name,
          car_model: record.car_model,
          car_year: record.car_year,
          car_buyingdate: record.car_buyingdate,
          car_number: record.car_number,
          claim_status: record.claim_status,
          carinsurance:{
            policy_id: record.carinsurance.policy_id,
            policy_name: record.carinsurance.policy_name,
            policy_scheme: record.carinsurance.policy_scheme,
            car_make: record.carinsurance.car_make,
            car_name: record.carinsurance.car_name,
            car_model: record.carinsurance.car_model,
            car_year: record.carinsurance.car_year,
            car_buyingdate: record.carinsurance.car_buyingdate,
            car_number: record.carinsurance.car_number,
            policy_amount: record.carinsurance.policy_amount,
            customer: 
            {
              customer_id: record.carinsurance.customer.customer_id,
              customer_name: record.carinsurance.customer.customer_name,
              customer_email: record.carinsurance.customer.customer_email,
              customer_mobile: record.carinsurance.customer.customer_mobile,
              customer_address: record.carinsurance.customer.customer_address,
              customer_pincode: record.carinsurance.customer.customer_pincode,
              customer_dob: record.carinsurance.customer.customer_dob,
              customer_age: record.carinsurance.customer.customer_age,
              customer_gender: record.carinsurance.customer.customer_gender,
              customer_password: record.carinsurance.customer.customer_password
            }
          }
         }
      })
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem('Settlement', JSON.stringify(res.data)); 
        alert("Successfully Credited the Amount to the Customer");
        navigate("/landingpage3");
      })
      .catch((err) => console.error('Error submitting the form:', err));
    } else {
      alert("Please enter valid inputs!!!");
    }
  };

  const validateValues = (data) => {
    if (!data.settlement_status) {
      alert("Please select the Status !!!");
      return false;
    } else {
      return true;
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error}</div>;

  return (
    <div id="add2" className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <h1>Fill the following details</h1>
          <br />

          <div>
            <label htmlFor="claim_id">Claim Id:</label>
            <input
              type="number"
              name="claim_id"
              className="form-control"
              value={record.claim_id}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="customer_name">Customer Name:</label>
            <input
              type="text"
              name="customer_name"
              className="form-control"
              value={record.carinsurance?.customer.customer_name}
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
