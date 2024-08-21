import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ViewClaim3.css";

function ViewClaim3() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => { 
    axios
      .get("http://localhost:8051/claim/all")
      .then((response) => {
        setColumns(Object.keys(response.data[0]));
        setRecords(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="view-cars-container" ide="viewclaim3">
        <header className="view-cars-banner bg-info">
        <h1 className="banner-title text-dark center">Applied Claim Details</h1>
      </header>
        <div className="container">
        <table className="cars-table">
          <thead>
            <tr>
              <th>Claim Id</th>
              <th>Car Brand</th>
              <th>Car Name</th>
              <th>Car Model</th>
              <th>Car Year</th>
              <th>Car Registered On</th>
              <th>Car Number</th>
              <th>Claim Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.claim_id}</td>
                <td>{d.car_make}</td>
                <td>{d.car_name}</td>
                <td>{d.car_model}</td>
                <td>{d.car_year}</td>
                <td>{d.car_buyingdate}</td>
                <td>{d.car_number}</td>
                <td>{d.claim_status}</td>
                <td>
                  <Link to={`/viewclaim1/${d.claim_id}`}>
                    <button className="btn btn-info">Process</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            
      </div>
    </div>
  );
}

export default ViewClaim3;
