import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ViewClaim1 from '../components/ViewClaim1';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
 
const mock = new MockAdapter(axios);
 
const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);
 
 
it("renders 'BuyCarInsurance page text' " , () =>{
  render(<MemoryRouter><ViewClaim1 /></MemoryRouter>);
const linkElement = screen.getByText("Update Claim Details");
expect(linkElement).toBeInTheDocument();
})

 
it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><ViewClaim1 /></MemoryRouter>);
  const linkElement = screen.getByText("Claim Id:");
  expect(linkElement).toBeInTheDocument();
  })

  
   
it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><ViewClaim1 /></MemoryRouter>);
  const linkElement = screen.getByText("Claim Issue:");
  expect(linkElement).toBeInTheDocument();
  })

  it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><ViewClaim1 /></MemoryRouter>);
  const linkElement = screen.getByText("Car Number:");
  expect(linkElement).toBeInTheDocument();
  })
