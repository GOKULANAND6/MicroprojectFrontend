import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import BuyCarInsurance from '../components/BuyCarInsurance';
 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
 
const mock = new MockAdapter(axios);
 
const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);
 
 
it("renders 'BuyCarInsurance page text' " , () =>{
  render(<MemoryRouter><BuyCarInsurance /></MemoryRouter>);
const linkElement = screen.getByText("Fill your Car Insurance Details");
expect(linkElement).toBeInTheDocument();
})

it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><BuyCarInsurance /></MemoryRouter>);
  const linkElement = screen.getByText("Submit");
  expect(linkElement).toBeInTheDocument();
  })