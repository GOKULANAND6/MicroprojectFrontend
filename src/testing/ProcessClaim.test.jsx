import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ProcessClaim from '../components/ProcessClaim';
 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
 
const mock = new MockAdapter(axios);
 
const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);
 
 
it("renders 'BuyCarInsurance page text' " , () =>{
  render(<MemoryRouter><ProcessClaim /></MemoryRouter>);
const linkElement = screen.getByText("Enter Car Number:");
expect(linkElement).toBeInTheDocument();
})

it("renders 'ProcessClaim page text' " , () =>{
    render(<MemoryRouter><ProcessClaim /></MemoryRouter>);
  const linkElement = screen.getByText("Check");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'ProcessClaim page text' " , () =>{
    render(<MemoryRouter><ProcessClaim /></MemoryRouter>);
  const linkElement = screen.getByText("Applied Claim Details");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'ProcessClaim page text' " , () =>{
    render(<MemoryRouter><ProcessClaim /></MemoryRouter>);
  const linkElement = screen.getByText("Vehicle Details");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'ProcessClaim page text' " , () =>{
    render(<MemoryRouter><ProcessClaim /></MemoryRouter>);
  const linkElement = screen.getByText("Car Id");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'ProcessClaim page text' " , () =>{
    render(<MemoryRouter><ProcessClaim /></MemoryRouter>);
  const linkElement = screen.getByText("Claim Id");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'ProcessClaim page text' " , () =>{
    render(<MemoryRouter><ProcessClaim /></MemoryRouter>);
  const linkElement = screen.getByText("Action");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'ProcessClaim page text' " , () =>{
    render(<MemoryRouter><ProcessClaim /></MemoryRouter>);
  const linkElement = screen.getByText("Claim Status");
  expect(linkElement).toBeInTheDocument();
  })

