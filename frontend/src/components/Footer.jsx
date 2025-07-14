import React from "react";
import dooper from "../assets/Dooper-white-logo.svg";
import phone from "../assets/icons/phone-footer-icon.svg";
import mail from "../assets/icons/mail-footer-icon.svg";
import insta from "../assets/icons/instagram-footer-icon.svg";
import fc from "../assets/icons/facebook-footer-icon.svg";
import linkedin from "../assets/icons/linkedin-footer-icon.svg";

const Footer = () => {
  return (
    <div className="min-h-[390px] bg-[#B60336] hidden sm:block">
      <div className="w-full">
        <div className="flex gap-[30px] max-w-[1200px] mx-auto pt-[48px] px-[12px]">
          {/* 1 */}
          <div className="">
            <img src={dooper} alt="dooper" className="" />
            {/* contact */}
            <div className="flex mt-[32px] ">
              <img src={phone} alt="" className="h-[40px] w-[40px]" />
              <h1 className="font-Montserrat font-[500] text-[14px] leading-[16.24px] ml-[12px] text-white">
                Phone
              </h1>
              <h2 className="font-Montserrat font-[500] text-[16px] leading-[16.24px] -ml-[46px] mt-[22px] text-white">
                +91 6375596006
              </h2>
            </div>
            <div className="flex mt-[24px]">
              <img src={mail} alt="" className="h-[40px] w-[40px]" />
              <h1 className="font-Montserrat font-[500] text-[14px] leading-[16.24px] ml-[12px] text-white">
                Mail
              </h1>
              <h2 className="font-Montserrat font-[500] text-[16px] leading-[16.24px] -ml-[29px] mt-[22px] text-white">
                help@dooper.com
              </h2>
            </div>
          </div>

          {/* 2 */}
          <div className="font-Montserrat font-[600] text-[18px] text-white pt-[24px]">
            <h1>Quick Links</h1>
            <ul className="text-white text-[16px] font-medium list-disc space-y-[14px] h-[170px] pl-6">
              <li className="mt-6">Pricing</li>
              <li className="">Doctors</li>
              <li className="">Services</li>
              <li className="">Testimonials</li>
              <li className="">FAQ's</li>
            </ul>
          </div>

          {/* 3 */}
          <div className="font-Montserrat font-[600] text-[18px] text-white pt-[24px]">
            <h2>Other</h2>
            <ul className="text-white text-[16px] font-medium list-disc space-y-[14px] h-[170px] pl-6">
              <li className="mt-6">Make Appointment</li>
              <li className="">Emergency Call</li>
              <li className="">Testimonials</li>
            </ul>
          </div>

          {/* 4 */}
          <div className="font-Montserrat font-[600] text-[18px] text-white pt-[24px]">
            <h3>Links</h3>
            <ul className="text-white text-[16px] font-medium list-disc space-y-[14px] h-[170px] pl-[23px]">
              <li className="mt-6">Blogs</li>
              <li className="">Privacy Policy</li>
              <li className="">Terms and Conditions</li>
            </ul>
          </div>
          {/* 5 */}
          <div className="font-Montserrat font-[600] text-[18px] text-white pt-[24px]">
            <h4>Connect with us</h4>
            <ul className="text-white text-[16px] font-medium flex flex-row space-x-2 h-[170px] ">
              <li className="mt-6">
                <img src={insta} alt="" />
              </li>
              <li className="pt-6">
                <img src={fc} alt="" />
              </li>
              <li className="pt-6">
                <img src={linkedin} alt="" />
              </li>
            </ul>
          </div>
        </div>
        <hr className="w-full mt-[40px]"/>
        <h5 className="text-center mx-auto pt-[20px] font-Montserrat text-[14px] font-[500] text-white">
          Copyright © 2023 | All rights reserved by dooper
        </h5>
      </div>
    </div>
  );
};

export default Footer;
