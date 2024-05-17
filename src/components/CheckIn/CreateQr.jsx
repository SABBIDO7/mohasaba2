import Modals from "../Modals/Modals";
import { QRCodeCanvas } from "qrcode.react";

import React, { useState, useEffect, ReactDOM, useRef } from "react";

export default function CreateQr(props) {
  const [showQr, setShowQr] = useState(false);
  const [modelsShowPage, setModelsShowPage] = useState(false);
  const [qrData, setQrData] = useState("");
  const modalsChildRef = useRef();

  const handleClick = () => {
    if (props.accNo) {
      setQrData(props.accNo); // Set the QR code data
      openQrShowModel();
    } else {
      console.log("fett bl nullll");
      modalsChildRef.current.setCreateQrInputValueModal({
        show: true,
        title: "Enter Qr Value",
      });
    }
  };
  const openQrShowModel = () => {
    // Update modelsShowPage state directly
    //setModelsShowPage(true);
    // Pass data directly without setting it in state
    modalsChildRef.current.setQrShowModal({
      show: true,
      qrData: qrData,
      title: "Scan Or Dowload Qr Code",
    });
    //  modalsChildRef.current.setShow(true);
  };
  return (
    <div>
      <button
        className="bg-secondd text-BgTextColor h-[fit] w-[140px]  p-3 rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md"
        onClick={handleClick}
      >
        Create Qr
      </button>

      <Modals
        modelsShowPage={modelsShowPage.show}
        setModelsShowPage={setModelsShowPage}
        ref={modalsChildRef}
      />
    </div>
  );
}
