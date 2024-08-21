import { useState } from 'react';
import './Navbar.css';
import image from './image.jpg';
import logo from './logo.jpg';
import carimage from './thar.jpeg';
import bikeimage from './honda.png';
import healthimage from './health.jpg';
import { Link } from 'react-router-dom';
import About from './About';
import Footer from './Footer';

import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const products = [
  { name: 'File new Claim', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Claim Status', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'email: goclaim@yahoo.com', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'toll free: 1800-528-528', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" id="navbar">
        <div className="flex lg:flex-1">
          <Link to="/">
            <img alt="Company Logo" src={logo} className="h-11 w-auto cursor-pointer" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm font-semibold leading-6 text-gray-900" id="nav-text">
            Home
          </Link>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 bg-white border-none py-2 px-4" id="claim">
              Claim
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button onClick={openModal} className="text-sm font-semibold leading-6 text-gray-900 bg-white"  id="nav-text">
            Login
          </button>
        </div>
      </nav>

      <div className="relative">
        <div className="absolute inset-x-0 top-4 text-center">
          <p className="text-xl font-bold">
            <span className="text-dark">Important Announcement:</span> 
            <span className="text-white"> Your claims are processed faster with our new system!</span>
          </p>
        </div>

        <div className="absolute" id="images">
          <Link to="/logincustomer">
            <img src={carimage} alt="Car" style={{height: '100px', width: '100px'}} className="rounded-full border-4 border-white shadow-lg" />
            <br></br>
            <div className='text-white text-lg'>Car Insurance</div>
          </Link>
          <Link to="/logincustomer">
            <img src={bikeimage} alt="Bike" style={{height: '100px', width: '100px'}} className="rounded-full border-4 border-white shadow-lg" />
            <br></br>
            <div className='text-white text-lg'>Bike Insurance</div>      
          </Link>
          <Link to="/logincustomer">
            <img src={healthimage} alt="Health" style={{height: '100px', width: '100px'}} className="rounded-full border-4 border-white shadow-lg" />
            <br></br>
            <div className='text-white text-lg'>Health Insurance</div>      
          </Link>
        </div>

        <div className='content'>
            <h1>Everything is for your <span id="gold">Home & Future</span> </h1>
            <p>10,00,000+ Successful Customers</p>
        </div>

        <img src={image} alt="Insurance Claim" className="w-full object-cover" id="image1" />
      </div>

      {/* Modal for Login Options */}
      <Dialog open={modalOpen} onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <XMarkIcon className="h-6 w-6 bg-white" aria-hidden="true"  />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Select Login Type</h2>
            <div className="flex flex-col space-y-4">
              <Link to="/logincustomer" className="block text-center text-blue-500  text-lg">
                Customer Login
              </Link>
              <Link to="/loginadmin" className="block text-center text-blue-500  text-lg">
                Admin Login
              </Link>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <About />
      <Footer />
    </header>
  );
}
