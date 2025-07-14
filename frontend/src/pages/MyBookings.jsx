

// new working code

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import SecondaryButton from "../components/SecondaryButton";
import Card from "../components/Card";
import Card3 from "../components/Card3"; // Import Card3
import Footermobile from '../components/Footermobile'

export default function MyBookings() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('medicine');
  const [filterStatus, setFilterStatus] = useState('Upcoming');

  const bookingTypes = [
    { label: 'Medicine', type: 'medicine' },
    { label: 'Lab', type: 'lab' },
    { label: 'Home', type: 'home' },
    { label: 'Nursing', type: 'nursing' },
    { label: 'Vaccine', type: 'vaccine' },
    { label: 'Urgent', type: 'urgent' },
  ];

  const statusOptions = ['All', 'Upcoming', 'Completed', 'Cancelled'];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-[16px] sm:px-[120px] px-[20px] sm:pb-0 pb-[140px] overflow-hidden">
        <div className="flex justify-between w-full py-6">
          <p className="text-[#1A1C1F] text-[22px] font-[700] leading-[32px]">My Bookings</p>
          <Link to="/home">
          <div className="text-center px-[24px] py-[14px] rounded-[8px] sm:w-[200px] sm:ml-0 ml-[80px] font-Montserrat font-[600] text-[14px] text-primary01 leading-[116%] bg-primary07">
            <button>+ Book Now</button>
          </div></Link>
        </div>

        <div className="flex justify-between mt-4 border-b">
          <ul className="flex items-start flex-1 space-x-1 font-Montserrat lg:text-[18px] text-[13px] text-[#8D98A4] font-600">
            {bookingTypes.map((booking) => (
              <li
                key={booking.type}
                className={`px-1 lg:px-4 cursor-pointer ${
                  selectedCategory === booking.type ? "border-b-2 pb-2 text-black border-[#E40443]" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(booking.type);
                  setFilterStatus('All'); // Reset filterStatus on category change
                }}
              >
                {booking.label}
              </li>
            ))}
          </ul>

          {/* <div className="flex gap-2 items-center">
            <span>Sort</span>
            <select
              className="outline-none rounded-3 bg-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div> */}
        </div>

        <div className="flex flex-wrap gap-8 mb-8">
          {selectedCategory === 'urgent' ? (
            <Card3
              filterStatus={filterStatus}
              onClickAction={(booking) => {
                let path = `/bookings`;
                if (filterStatus === 'Completed') {
                  path += '-completed';
                } else if (filterStatus === 'Cancelled') {
                  path += '-cancelled';
                }
                navigate(path);
              }}
            />
          ) : (
            <Card
              type={selectedCategory}
              filterStatus={filterStatus}
              onClickAction={(booking) => {
                let path = `/bookings`;
                if (filterStatus === 'Completed') {
                  path += '-completed';
                } else if (filterStatus === 'Cancelled') {
                  path += '-cancelled';
                }
                navigate(path);
              }}
            />
          )}
        </div>
      </div>
      <Footer />
      <Footermobile />
    </div>
  );
}
