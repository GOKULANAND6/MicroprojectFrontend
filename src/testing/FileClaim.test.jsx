import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import FileClaim from '../components/FileClaim';
 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
 
const mock = new MockAdapter(axios);
 
const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);
 
 
it("renders 'BuyCarInsurance page text' " , () =>{
  render(<MemoryRouter><FileClaim /></MemoryRouter>);
const linkElement = screen.getByText("Fill the Claim Detail Form");
expect(linkElement).toBeInTheDocument();
})

it("renders 'BuyCarInsurance page text' " , () =>{
    render(<MemoryRouter><FileClaim /></MemoryRouter>);
  const linkElement = screen.getByText("Submit");
  expect(linkElement).toBeInTheDocument();
  })