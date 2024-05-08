import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Modals from "../Modals/Modals";

import {
  checkInEndPoint,
  handleCheckInSearch,
} from "../BackendEndPoints/Endpoint1";
import { info } from "autoprefixer";
export default function Location(props) {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [infoModal, setInfoModal] = useState({ show: false });
  const [infoSearchModal, setInfoSearchModal] = useState({ show: false });
  const [infoSearchShowModal, setInfoSearchShowModal] = useState({
    show: false,
  });

  const [searchValue, setSearchValue] = useState(
    infoSearchModal.accountId || ""
  ); // Default value is infoModal.accountId
  const [modelsVar, setmodelsVar] = useState("");
  const [modelsToSetVar, setmodelsToSetVar] = useState("");
  const [modelsShowPage, setModelsShowPage] = useState(false);

  const modalsChildRef = useRef();

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
        if (props.method == "scan") {
          CheckInSaveLongLat(
            position.coords.latitude,
            position.coords.longitude
          );
        } else if (props.method == "search") {
          SearchSaveLongLat(
            position.coords.latitude,
            position.coords.longitude
          );
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const CheckInSaveLongLat = (lat, long) => {
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
          setSearchValue(response.Account);

          setInfoSearchModal({
            show: true,
            message: (
              <div>{"No Account Found with ID:" + response.Account}</div>
            ),
            flag: 0,
            accounntId: response.Account,
            title: response.message,
          });
        }
      } else {
        setInfoModal({
          show: true,
          message: <div>{response.message}</div>,
          flag: -1,
          title: "Error Occured",
        });
      }
    });

    //window.location.href = "/invoice";
  };
  const SearchSaveLongLat = (lat, long) => {
    localStorage.setItem("longitude", long);
    localStorage.setItem("latitude", lat);
    setInfoSearchModal({
      show: true,
      message: <div>Search By ID, Name, PhoneNumber,Address: </div>,
      flag: 0,
      accounntId: "",
      title: "Search Account",
    });
  };
  const openSearchModel = (message) => {
    // Update modelsShowPage state directly
    setModelsShowPage(true);
    // Pass data directly without setting it in state
    modalsChildRef.current.setCheckInSeachAccountsShow(true);
    //  modalsChildRef.current.setShow(true);
    modalsChildRef.current.setData(message);
    props.setShowLocation(true);
  };

  return (
    <div>
      <Modal
        show={infoModal.show}
        onHide={() => {
          props.setShowLocation(false);
          setInfoModal({ ...infoModal, show: false });
        }}
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
        <Modal.Body>
          <div className="flex flex-column justify-between">
            <div>{infoSearchModal.message}</div>
            <div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-between">
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
                let data = {
                  option: "Accounts",
                  value: searchValue,
                  username: localStorage.getItem("compname"),
                  SATFromBranch: "N",
                  SATToBranch: "N",
                  groupName: "",
                  groupType: "",
                };
                handleCheckInSearch(data).then((response) => {
                  console.log("fettt baad");
                  console.log(response);
                  setInfoSearchModal({ ...infoSearchModal, show: false });

                  if (response.flag == 1) {
                    //setmodelsVar("checkInSeachAccountsShow");
                    //setmodelsToSetVar("setCheckInSeachAccountsShow");
                    console.log("searchhh valueeeeeeeeeee");
                    console.log(response.message);
                    // setModelsShowPage({
                    //   data: response.message,
                    //   show: true,
                    //   var: "checkInSeachAccountsShow",
                    //   varToSet: "setCheckInSeachAccountsShow",
                    // });
                    setModelsShowPage(true);
                    // Pass data directly without setting it in state
                    modalsChildRef.current.setCheckInSeachAccountsShow(true);
                    //  modalsChildRef.current.setShow(true);
                    modalsChildRef.current.setData(response.message);
                    props.setShowLocation(true);
                    //openSearchModel(response.message);
                  } else if (response.flag == -1) {
                    console.log("mano mawjoud l idddd");

                    setInfoModal({
                      show: true,
                      flag: -1,
                      message: (
                        <div>
                          There Is No Account Matches Your Search <br></br>{" "}
                          Please Try a Different Account .
                        </div>
                      ),
                      title: "Empty Account",
                    });
                  } else if (response.flag == -2) {
                    setInfoModal({
                      show: true,
                      flag: -2,
                      message: <div>{response.message}</div>,
                      title: "Error Occured",
                    });
                  } else if (response.flag == -3) {
                    setInfoModal({
                      show: true,
                      flag: -3,
                      message: <div>{response.message}</div>,
                      title: "Error Occured",
                    });
                  }
                });
              }}
            >
              Search
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={infoSearchShowModal.show}
        onHide={() =>
          setInfoSearchShowModal({ ...infoSearchShowModal, show: false })
        }
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {infoSearchShowModal.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{infoSearchShowModal.message}</Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button
              variant="danger"
              onClick={() => {
                setInfoSearchShowModal({ ...infoSearchShowModal, show: false });
                props.setShowLocation(false);
              }}
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* <Modals
        show={modelsShowPage.show}
        setShow={setModelsShowPage}
        ref={modalsChildRef}
        var={modelsShowPage.var}
        varToSet={modelsShowPage.varToSet}
        data={modelsShowPage.data}
        close={props.setShowLocation}
      /> */}
      <Modals show={modelsShowPage} setShowLocation={props.setShowLocation} />
    </div>
  );
}
