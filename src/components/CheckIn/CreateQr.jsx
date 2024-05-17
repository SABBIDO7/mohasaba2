import Modals from "../Modals/Modals";
import { QRCodeCanvas } from "qrcode.react";

import React, { useState, useEffect, ReactDOM, useRef } from "react";

export default function CreateQr(props) {
  const [showQr, setShowQr] = useState(false);
  const [modelsShowPage, setModelsShowPage] = useState(false);
  const [qrData, setQrData] = useState("");
  const modalsChildRef = useRef();

  const handleClick = () => {
    setQrData(props.accNo); // Set the QR code data
    openQrShowModel();
  };
  const openQrShowModel = () => {
    // Update modelsShowPage state directly
    //setModelsShowPage(true);
    // Pass data directly without setting it in state
    modalsChildRef.current.setQrShowModel({ show: true, qrData: qrData });
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
      {showQr && (
        <div className="qr-code-container">
          <QRCodeCanvas value={props.accNo} />
        </div>
      )}

      <Modals
        modelsShowPage={modelsShowPage.show}
        setModelsShowPage={setModelsShowPage}
        ref={modalsChildRef}
      />
    </div>
  );
}
