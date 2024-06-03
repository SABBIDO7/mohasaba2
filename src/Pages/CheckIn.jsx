import React, { useState, useEffect, ReactDOM } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Html5QrcodeScanner } from "html5-qrcode";
import Scanner from "../components/CheckIn/Scanner";
import CheckInReport from "../components/CheckIn/CheckInReport";
import { useNavigate } from "react-router-dom";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getCompanyInfo } from "../components/BackendEndPoints/Endpoint1";
import CreateQr from "../components/CheckIn/CreateQr";
export default function CheckIn(props) {
  const navigate = useNavigate();

  useState(() => {
    getCompanyInfo();
  }, []);
  return (
    <div className="h-[90vh] w-[100%] overscroll-contain bg-fourth flex flex-col justify-between ">
      <div className="flex justify-center">
        <h1>Check In</h1>
      </div>
      <div className="flex flex-col justify-center items-center flex-grow w-full">
        <div className="w-full flex flex-row justify-around mb-4">
          <Scanner />
        </div>
        <div className="grid grid-cols-2 gap-4 w-[90%] sm:w-[50%]">
          {localStorage.getItem("CheckInReport") === "Y" && (
            <button
              className="bg-secondd text-BgTextColor h-[fit] w-[fit] p-2.5 rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md"
              onClick={() => {
                navigate("/CheckIn/CheckInReport");
              }}
            >
              ChkIn <FontAwesomeIcon icon={faFileAlt}></FontAwesomeIcon>
            </button>
          )}
          <CreateQr flag={"1"} accNo={null} padding={2.5} />
        </div>
      </div>
    </div>
  );
}
