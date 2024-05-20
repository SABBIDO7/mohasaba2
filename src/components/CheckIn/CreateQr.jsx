import Modals from "../Modals/Modals";
import { QRCodeCanvas } from "qrcode.react";

import React, { useState, useEffect, ReactDOM, useRef } from "react";

export default function CreateQr(props) {
  const [showQr, setShowQr] = useState(false);
  const [modelsShowPage, setModelsShowPage] = useState(false);
  const [qrData, setQrData] = useState(null);
  const modalsChildRef = useRef();

  const handleClick = () => {
    if (props.accNo) {
      console.log(props.accNo, "ppppp");
      openQrShowModel(props.accNo);
    } else {
      console.log("fett bl nullll");
      modalsChildRef.current.setCreateQrInputValueModal({
        show: true,
        title: "Enter Qr Value",
      });
    }
  };
  const openQrShowModel = (accNo) => {
    // Update modelsShowPage state directly
    //setModelsShowPage(true);
    // Pass data directly without setting it in state
    console.log(accNo, "qrDataaaaa");
    modalsChildRef.current.setQrShowModal({
      show: true,
      qrData: accNo,
      title: "Scan Or Dowload Qr Code",
    });
    //  modalsChildRef.current.setShow(true);
  };
  return (
    <div>
      <button
        className={`bg-secondd text-BgTextColor h-[fit] w-[140px]  p-${props.padding} rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md`}
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
