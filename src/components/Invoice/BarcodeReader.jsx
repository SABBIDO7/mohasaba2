// import React, {
//   forwardRef,
//   useEffect,
//   useRef,
//   useState,
//   useImperativeHandle,
// } from "react";
// import Quagga from "quagga";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

// const BarcodeReader = forwardRef((props, ref) => {
//   const [scanning, setScanning] = useState(false);
//   const [showModal, setShowModal] = useState(false); // New state variable for modal visibility

//   const scannerRef = useRef(null);
//   const [startScanning, setStartScanning] = useState(false);

//   useImperativeHandle(ref, () => ({
//     setStartScanning,
//   }));

//   useEffect(() => {
//     return () => {
//       if (scanning) {
//         stopScanner();
//       }
//     };
//   }, [scanning]);

//   useEffect(() => {
//     console.log(startScanning, "modal hide?");
//     setShowModal(startScanning); // Update showModal state when startScanning changes

//     if (startScanning) {
//       startScanner();
//     }
//   }, [startScanning]);

//   const startScanner = () => {
//     if (!scannerRef.current) {
//       console.error("Scanner element not found, retrying...");
//       setTimeout(startScanner, 100);
//       return;
//     }

//     Quagga.init(
//       {
//         inputStream: {
//           name: "Live",
//           type: "LiveStream",
//           target: scannerRef.current,
//           constraints: {
//             // width: 1080,
//             // height: 1080,
//             facingMode: "environment",
//           },
//         },
//         frequency: 20, // Adjust as needed
//         decoder: {
//           readers: [
//             "code_128_reader",
//             "ean_reader",
//             "ean_8_reader",
//             "code_39_reader",
//             "code_39_vin_reader",
//             "codabar_reader",
//             "upc_reader",
//             "upc_e_reader",
//             "i2of5_reader",
//           ],
//         },
//         locator: {
//           patchSize: "large", // Adjust as needed
//           halfSample: false, // Adjust as needed
//         },
//         numOfWorkers: navigator.hardwareConcurrency || 4,
//         locate: true,
//         debug: {
//           drawBoundingBox: true,
//           showFrequency: true,
//           drawScanline: true,
//           showPattern: true,
//         },
//       },

//       (err) => {
//         if (err) {
//           console.error(err);
//           alert("Error starting Quagga: " + err);
//           return;
//         }

//         Quagga.start();
//         setScanning(true);

//         // Set the willReadFrequently attribute on the canvas context
//         const canvas = document.querySelector("canvas");
//         if (canvas) {
//           const ctx = canvas.getContext("2d", { willReadFrequently: true });
//         }
//       }
//     );

//     Quagga.onDetected((data) => {
//       //alert(`Barcode detected: ${data.codeResult.code}`);
//       // alert(scanning);

//       props.onBarcodeDetected(data.codeResult.code); // Call the function to handle detected barcode

//       stopScanner();
//     });
//   };

//   const stopScanner = async () => {
//     try {
//       // Stop Quagga
//       Quagga.offDetected(); // Clear the onDetected handler
//       Quagga.stop();

//       // Stop media tracks
//       //       const video = document.querySelector("video");
//       //       if (video && video.srcObject) {
//       //         await stopMediaTracks(video.srcObject);
//       // 2      }
//     } catch (err) {
//       console.error("Error stopping Quagga:", err);
//     }
//     setScanning(false);
//     setStartScanning(false);
//   };

//   const stopMediaTracks = async (stream) => {
//     console.log("aambinadifff");
//     if (stream) {
//       await stream.getTracks().forEach((track) => {
//         track.stop();
//       });
//     }
//   };

//   return (
//     <Modal
//       show={startScanning}
//       onHide={stopScanner}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       keyboard={false}
//       backdrop="static"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Barcode Scanner</Modal.Title>
//       </Modal.Header>
//       <Modal.Body className="flex justify-center">
//         <div
//           id="scanner"
//           ref={scannerRef}
//           style={{
//             width: "80%",
//             height: "fit",
//             display: scanning ? "block" : "none",
//             margin: "auto",
//           }}
//         ></div>
//       </Modal.Body>

//       <Modal.Footer className="flex justify-center">
//         <Button
//           variant="secondary"
//           onClick={() => {
//             stopScanner();
//           }}
//         >
//           Stop Scanning
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// });

// export default BarcodeReader;
import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const BarcodeReader = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();
  const [scanning, setScanning] = useState(false);
  const [videoReady, setVideoReady] = useState(false); // New state to check video readiness
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
  useImperativeHandle(ref, () => ({
    setStartScanning: (start) => setScanning(start),
  }));

  useEffect(() => {
    if (scanning) {
      codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result, err) => {
          if (result) {
            //alert(result.text);
            props.onBarcodeDetected(result.text); // Notify parent component of detected barcode
            beep(100, 520, 200); // Beep sound

            setScanning(false); // Stop scanning after a successful scan
          }
          if (err) {
            console.error(err);
          }
        }
      );
    }

    return () => {
      codeReader.reset();
    };
  }, [scanning, videoReady, codeReader]);

  const handleHideModal = () => {
    codeReader.reset();
    setScanning(false);
  };

  return (
    <Modal
      show={scanning}
      onHide={handleHideModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      keyboard={false}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Barcode Scanner</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex justify-center">
        <video
          id="scanner"
          ref={videoRef}
          style={{ width: "100%", height: "100%" }}
          onLoadedData={() => setVideoReady(true)} // Set videoReady to true when video is loaded
        ></video>
      </Modal.Body>
      <Modal.Footer className="flex justify-center">
        <Button variant="secondary" onClick={handleHideModal}>
          Stop Scanning
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default BarcodeReader;
