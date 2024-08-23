import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Navbar3 from '../components/Navbar3';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
 
const mock = new MockAdapter(axios);
 
const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);
 
 
it("renders 'BuyCarInsurance page text' " , () =>{
  render(<MemoryRouter><Navbar3 /></MemoryRouter>);
const linkElement = screen.getByText("Go Claim Insurance Pvt. Ltd");
expect(linkElement).toBeInTheDocument();
})

it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><Navbar3 /></MemoryRouter>);
  const linkElement = screen.getByText("View Customer Detail");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><Navbar3 /></MemoryRouter>);
  const linkElement = screen.getByText("Process the Claim");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><Navbar3 /></MemoryRouter>);
  const linkElement = screen.getByText("Settle Amount");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><Navbar3 /></MemoryRouter>);
  const linkElement = screen.getByText("Buy Insurance");
  expect(linkElement).toBeInTheDocument();
  })
  
  it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><Navbar3 /></MemoryRouter>);
  const linkElement = screen.getByText("Car Insurance");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><Navbar3 /></MemoryRouter>);
  const linkElement = screen.getByText("Bike Insurance");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><Navbar3 /></MemoryRouter>);
  const linkElement = screen.getByText("Health Insurance");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><Navbar3 /></MemoryRouter>);
  const linkElement = screen.getByText("10,00,000+ Successful Customers");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><Navbar3 /></MemoryRouter>);
  const linkElement = screen.getByText("Why Insurance ?");
  expect(linkElement).toBeInTheDocument();
  })