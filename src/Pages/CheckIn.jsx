import React, { useState, useEffect, ReactDOM } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Html5QrcodeScanner } from "html5-qrcode";
import Scanner from "../components/CheckIn/Scanner";
import { getCompanyInfo } from "../components/BackendEndPoints/Endpoint1";
export default function CheckIn(props) {
  useState(() => {
    getCompanyInfo();
  }, []);
  return (
    <div className="h-[90vh] overscroll-contain bg-fourth flex  flex-column justify-between items-center">
      <div className="flex justify-start">
        <h1>QR Code Scanner</h1>
      </div>
      <div className="flex justify-around flex-grow">
        <div className="">
          <Scanner></Scanner>
        </div>
      </div>
    </div>
  );
}
