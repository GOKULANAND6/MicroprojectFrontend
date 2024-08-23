import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SignupCustomer from '../components/SignupCustomer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
 
const mock = new MockAdapter(axios);
 
const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);
 
 
it("renders 'BuyCarInsurance page text' " , () =>{
  render(<MemoryRouter><SignupCustomer /></MemoryRouter>);
const linkElement = screen.getByText("Kindly fill up this Registration Form");
expect(linkElement).toBeInTheDocument();
})

it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><SignupCustomer /></MemoryRouter>);
  const linkElement = screen.getByText("Sign Up");
  expect(linkElement).toBeInTheDocument();
  })
  
