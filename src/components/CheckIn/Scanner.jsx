import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Location from "./Location";
import Modals from "../Modals/Modals";

export default function Scanner() {
  const scannerRef = useRef(null);
  const [scannerVar, setScannerVar] = useState(null); // Store the scanner instance

  const [scanning, setScanning] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [method, setMethod] = useState();
  const [modelsShowPage, setModelsShowPage] = useState(false);

  const modalsChildRef = useRef();

  const audioContext = new AudioContext();
  let scanner = "";
  const beep = (vol, freq, duration) => {
    var v = audioContext.createOscillator();
    var u = audioContext.createGain();
    v.connect(u);
    v.frequency.value = freq;
    v.type = "square";
    u.connect(audioContext.destination);
    u.gain.value = vol * 0.01;
    v.start(audioContext.currentTime);
    v.stop(audioContext.currentTime + duration * 0.001);
  };
  const openNoteModel = () => {
    // Update modelsShowPage state directly
    setModelsShowPage(true);
    // Pass data directly without setting it in state
    modalsChildRef.current.setShowCheckInNoteModal(true);
    //  modalsChildRef.current.setShow(true);
  };

  useEffect(() => {
    if (scanning && !scannerVar) {
      scanner = new Html5Qrcode("reader");
      scanner
        .start(
          { facingMode: "environment" }, // Prefer rear camera, adjust as needed
          {
            fps: 30, // Frames per second
            qrbox: 150, // QR box size
          },
          async (decodedText, decodedResult) => {
            console.log(`Scan result: ${decodedText}`);
            beep(100, 520, 200); // Beep sound
            localStorage.setItem("ScannedAccountId", decodedText);
            setScanning(false);
            setMethod("scan");
            setShowLocation(true); // Show the Location component
            scanner.stop();
            console.log("ddddff");

            // Handle the scan result here...
          },
          (errorMessage) => {
            console.warn(`QR code scan error: ${errorMessage}`);
          }
        )
        .catch((err) => console.warn(`QR code start error: ${err}`));
    } else if (!scanning && scannerVar) {
      setScanning(false);
      console.log("fet hon1");
      // Stop the scanner when scanning is stopped
      setScannerVar(null); // Reset the scanner instance
    }
  }, [scanning, scannerVar]); // Add scanning as a dependency

  return (
    <>
      {!scanning && (
        <div className="flex flex-column justify-around h-[100%]">
          <button
            className="bg-secondd text-BgTextColor h-[fit] p-3 rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md"
            onClick={() => {
              setMethod("showSearchInput");
              console.log("kabas search");
              console.log(showLocation);
              setShowLocation(true);
            }}
          >
            CheckIn Search
          </button>
          <button
            className="bg-secondd text-BgTextColor h-[fit] p-3 rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md"
            onClick={() => {
              setMethod("scan");
              setScanning(true);
            }}
          >
            CheckIn Qr
          </button>
          <button
            className="bg-secondd text-BgTextColor h-[fit] p-3 rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md"
            onClick={() => {
              setMethod("Note");
              openNoteModel();
            }}
          >
            CheckIn Note
          </button>
        </div>
      )}
      {showLocation && (
        <Location setShowLocation={setShowLocation} method={method} />
      )}

      {scanning && (
        <>
          <div
            id="reader"
            ref={scannerRef}
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              width: "250px",
              height: "250px",
            }}
          ></div>
          <button
            onClick={() => {
              scanner.stop();
              setScannerVar(true);
              setScanning(false);
            }}
            className="bg-secondd text-BgTextColor h-[fit] p-3 rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md"
          >
            Stop Scanning
          </button>
        </>
      )}
      <Modals
        show={modelsShowPage.show}
        setShow={setModelsShowPage}
        ref={modalsChildRef}
        setShowLocation={setShowLocation}
      />
    </>
  );
}
