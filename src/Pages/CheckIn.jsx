import React, { useState, useEffect, ReactDOM } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Html5QrcodeScanner } from "html5-qrcode";
import Scanner from "../components/CheckIn/Scanner";
import Location from "../components/CheckIn/Location";

export default function CheckIn(props) {
  return (
    <div className="h-[90vh] overscroll-contain bg-fourth flex  flex-column justify-between items-center">
      <div className="flex justify-start h-[50%]">
        <h1>QR Code Scanner</h1>
      </div>
      <div className="flex justify-start h-[50%]">
        <div className="w-[fit]">
          <Scanner></Scanner>
        </div>
        <Location></Location>
      </div>
    </div>
  );
}
