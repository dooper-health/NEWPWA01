import React from "react";
import Profile from "../assets/images/Testimonials-sample-user-picture.svg";
import star from "../assets/icons/star-filled-icon.svg";

const SideBar = () => {
  return (
    <div className="flex flex-col justify-around w-[480px] rounded-[16px] p-[56px] bg-primary-darker min-h-full max-h-[1024px] hidden sm:block">
      <h1 className="text-white font-Montserrat text-base font-semibold">
        DOOPER
      </h1>
      <div className="flex flex-col gap-[32px]">
        {/* Headings */}
        <h2 className="text-white text-[40px] font-montserrat font-[700] w-[326px]">
          Start your journey with us
        </h2>
        <h3 className="text-[#FFF] font-Montserrat text-2xl font-normal w-[357px] pr-12">
          Discover the world’s best community of doctors and DHAs
        </h3>
      </div>
      <div className="mt-24">
        {/* Card */}
        <div className="w-full p-[32px] bg-white rounded-[16px] ">
          <div className="font-Montserrat text-[#1A1C1F] w-full text-[16px] font-normal mb-4">
            Simply unbelievable! I am really satisfied with the doctor who
            treated me. This is absolutely wonderful!
          </div>
          <div className="flex">
            <img
              src={Profile}
              alt="profile"
              className="w-[56px] rounded-[8px]"
            />
            <div className="ml-2">
              <div className="font-Montserrat text-[18px] font-[600] text-black">
                Timson K
              </div>
              <ul className="mt-[9px] flex gap-1">
                <li>
                  <img src={star} alt="" className="h-[16px] w-[16px]" />
                </li>
                <li>
                  <img src={star} alt="" className="h-[16px] w-[16px]" />
                </li>
                <li>
                  <img src={star} alt="" className="h-[16px] w-[16px]" />
                </li>
                <li>
                  <img src={star} alt="" className="h-[16px] w-[16px]" />
                </li>
                <li>
                  <img src={star} alt="" className="h-[16px] w-[16px]" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
