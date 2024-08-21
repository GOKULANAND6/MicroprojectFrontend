import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewCars.css";
import Logo from './back.png';

function ViewCars({ onCarNumbersFetched }) {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const [carNumbers, setCarNumbers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8051/car/all")
      .then((response) => {
        const fetchedCarNumbers = response.data.map(car => car.car_number);
        setCarNumbers(fetchedCarNumbers);
        onCarNumbersFetched(fetchedCarNumbers);
      })
      .catch((error) => console.error(error));
  }, [onCarNumbersFetched]);

  useEffect(() => { 
    axios
      .get("http://localhost:8051/car/all")
      .then((response) => {
        setColumns(Object.keys(response.data[0]));
        setRecords(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="view-cars-container">
      <header className="view-cars-banner bg-info">
        <button className="go-back-button" onClick={handleGoBack}>
          <img src={Logo} alt="Logo" className="logo" />
        </button>
        <h1 className="banner-title text-dark">Vehicle Details</h1>
      </header>
      <div className="container">
        <table className="cars-table">
          <thead>
            <tr>
              <th>Car Id</th>
              <th>Car Brand</th>
              <th>Car Name</th>
              <th>Car Model</th>
              <th>Car Year</th>
              <th>Car Registered On</th>
              <th>Car Number</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.car_id}</td>
                <td>{d.car_make}</td>
                <td>{d.car_name}</td>
                <td>{d.car_model}</td>
                <td>{d.car_year}</td>
                <td>{d.car_buyingdate}</td>
                <td>{d.car_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewCars;
