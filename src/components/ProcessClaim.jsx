import React, { useState } from 'react';
import ViewClaim3 from './ViewClaim3';
import ViewCars from './ViewCars';
import './ProcessClaim.css';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

function ProcessClaim() {
  const [carNumberFromClaim, setCarNumberFromClaim] = useState('');
  const [carNumbersInViewCars, setCarNumbersInViewCars] = useState([]);
  const [isCarNumberValid, setIsCarNumberValid] = useState(null);
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCarDetails = (car_number) => {
    if (!car_number) {
      console.error('No car number provided');
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8051/car/${car_number}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Car not found');
        }
        return response.json();
      })
      .then(data => {
        console.log('Car Details:', data);
        setSelectedCarDetails(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching car details:', error);
        setSelectedCarDetails(null);
        setLoading(false);
      });
  };

  const handleCarNumberChange = (carNumber) => {
    setCarNumberFromClaim(carNumber.trim());
  };

  const handleCarNumbersFetched = (carNumbers) => {
    setCarNumbersInViewCars(carNumbers.map(num => num.trim()));
  };

  const handleCheck = () => {
    setLoading(true);
    const normalizedCarNumberFromClaim = carNumberFromClaim.toLowerCase();
    const isValid = carNumbersInViewCars.some(num => num.toLowerCase() === normalizedCarNumberFromClaim);

    if (isValid) {
      fetchCarDetails(carNumberFromClaim);
    } else {
      setIsCarNumberValid(false);
      setSelectedCarDetails(null);
      setLoading(false);
    }

    setIsCarNumberValid(isValid);
  };

  return (
    <div className="process-claim-container">
      <ViewCars onCarNumbersFetched={handleCarNumbersFetched} />
      <ViewClaim3 />

      <div className="check-section">
        <label htmlFor="carNumberInput" className="car-number-label">Enter Car Number:</label>
        <div className="check-input">
          <input
            type="text"
            id="carNumberInput"
            value={carNumberFromClaim}
            onChange={(e) => handleCarNumberChange(e.target.value)}
            placeholder="Enter Car Number"
            className="car-number-input"
          />
          <button className='btn btn-primary' onClick={handleCheck} disabled={loading}>
            {loading ? <FaSpinner className="spinner" /> : 'Check'}
          </button>
        </div>
        <div className="status-section">
          {isCarNumberValid === true && (
            <div className="status-valid">
              <FaCheckCircle size={24} />
              <span>Valid Car Number</span>
            </div>
          )}
          {isCarNumberValid === false && (
            <div className="status-invalid">
              <FaTimesCircle size={24} />
              <span>Invalid Car Number</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProcessClaim;
