import React, { useState, useEffect, ReactDOM } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Html5QrcodeScanner } from "html5-qrcode";
import Scanner from "../components/CheckIn/Scanner";
import CheckInReport from "../components/CheckIn/CheckInReport";
import { useNavigate } from "react-router-dom";

import { getCompanyInfo } from "../components/BackendEndPoints/Endpoint1";
import CreateQr from "../components/CheckIn/CreateQr";
export default function CheckIn(props) {
  const navigate = useNavigate();

  useState(() => {
    getCompanyInfo();
  }, []);
  return (
    <div className="h-[90vh] overscroll-contain bg-fourth flex  flex-column justify-between items-center">
      <div className="flex justify-start">
        <h1>QR Code Scanner</h1>
      </div>
      <div className="flex justify-around flex-grow">
        <div className="flex-row h-[100%] w-[100%]">
          {localStorage.getItem("CheckInReport") == "Y" && (
            <div className="h-1/5 flex items-center justify-center">
              <button
                className="bg-secondd text-BgTextColor h-[fit] w-[140px]  p-3 rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md"
                onClick={() => {
                  navigate("/CheckIn/CheckInReport");
                }}
              >
                CheckIn Report
              </button>
            </div>
          )}
          <div className="h-3/5">
            <Scanner></Scanner>
          </div>
          <div className="h-1/5 flex items-center justify-center">
            <CreateQr flag={"1"} accNo={null} padding={3}></CreateQr>
          </div>
        </div>
      </div>
    </div>
  );
}
