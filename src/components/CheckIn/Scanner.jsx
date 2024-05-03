import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Location from "./Location";
export default function Scanner() {
  const scannerRef = useRef(null);
  const [scanner, setScanner] = useState(null); // Store the scanner instance

  const [scanning, setScanning] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const audioContext = new AudioContext();

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

  useEffect(() => {
    if (scanning && !scanner) {
      const scanner = new Html5Qrcode("reader");
      scanner
        .start(
          { facingMode: "environment" }, // Prefer rear camera, adjust as needed
          {
            fps: 15, // Frames per second
            qrbox: 150, // QR box size
          },
          async (decodedText, decodedResult) => {
            console.log(`Scan result: ${decodedText}`);
            beep(100, 520, 200); // Beep sound
            localStorage.setItem("ScannedAccountId", decodedText);
            setScanning(false);
            scanner.stop();
            setShowLocation(true); // Show the Location component

            console.log("ddddff");

            // Handle the scan result here...
          },
          (errorMessage) => {
            console.warn(`QR code scan error: ${errorMessage}`);
          }
        )
        .catch((err) => console.warn(`QR code start error: ${err}`));
    } else if (!scanning && scanner) {
      setScanning(false);

      scanner.stop(); // Stop the scanner when scanning is stopped
      setScanner(null); // Reset the scanner instance
    }
  }, [scanning, scanner]); // Add scanning as a dependency

  return (
    <>
      {!scanning && (
        <button
          className="bg-secondd text-BgTextColor h-[fit] p-3 rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md"
          onClick={() => setScanning(true)}
        >
          Start Scanning
        </button>
      )}
      {showLocation && <Location setShowLocation={setShowLocation} />}

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
              const scanner = new Html5Qrcode("reader");
              console.log("kabas closeeeeeee");
              scanner.stop();
              setScanner(true);
              setScanning(false);
            }}
            className="bg-secondd text-BgTextColor h-[fit] p-3 rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md"
          >
            Stop Scanning
          </button>
        </>
      )}
    </>
  );
}
