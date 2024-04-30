import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { checkInEndPoint } from "../BackendEndPoints/Endpoint1";
import { info } from "autoprefixer";
export default function Location(props) {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [infoModal, setInfoModal] = useState({ show: false });
  const [infoSearchModal, setInfoSearchModal] = useState({ show: false });
  const navigate = useNavigate();
  useEffect(() => {
    console.log("an abkl useeffect location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Started");
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(position.coords.latitude);

        saveLongLat(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const saveLongLat = (lat, long) => {
    localStorage.setItem("longitude", long);
    localStorage.setItem("latitude", lat);
    console.log("Started...");
    checkInEndPoint(long, lat).then((response) => {
      console.log("fettt baad");
      console.log(response);

      if (response.status == "authorized") {
        if (response.flag == 1) {
          console.log("fet authorized");
          setInfoModal({
            show: true,
            message: (
              <div>
                {"You Have Been Checked In With The Account : " +
                  response.Account}
              </div>
            ),
            flag: 1,
            title: response.message,
          });

          // navigate("/invoice");
        } else if (response.flag == 0) {
          console.log("mano mawjoud l idddd");
          setInfoSearchModal({
            show: true,
            message: (
              <div>{"No Account Found with ID:" + response.Account}</div>
            ),
            flag: 0,
            title: response.message,
          });
        }
      } else {
        console.log("fet msh authorized");
        console.log(response.message);
      }
    });

    //window.location.href = "/invoice";
  };

  return (
    <div>
      <Modal
        show={infoModal.show}
        onHide={() => setInfoModal({ ...infoModal, show: false })}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {infoModal.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{infoModal.message}</Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button
              variant="danger"
              onClick={() => {
                setInfoModal({ ...infoModal, show: false });
                props.setShowLocation(false);
              }}
            >
              Ok
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={infoSearchModal.show}
        onHide={() => setInfoSearchModal({ ...infoSearchModal, show: false })}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {infoSearchModal.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{infoSearchModal.message}</Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button
              onClick={() => {
                setInfoSearchModal({ ...infoSearchModal, show: false });
                props.setShowLocation(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setInfoSearchModal({ ...infoSearchModal, show: false });
                props.setShowLocation(false);
              }}
            >
              Done
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* {location.latitude && <p>Latitude: {location.latitude}</p>}
      {location.longitude && <p>Longitude: {location.longitude}</p>} */}
    </div>
  );
}
