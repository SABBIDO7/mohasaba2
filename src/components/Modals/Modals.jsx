import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Location from "../CheckIn/Location";
import { faEdit, faSave, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QRCodeCanvas } from "qrcode.react";

import {
  checkInEndPoint,
  handleCheckInSearch,
  Notify,
} from "../BackendEndPoints/Endpoint1";

import { downloadQrCode } from "../BackendEndPoints/Internal";
const Modals = forwardRef((props, ref) => {
  const [checkInSeachAccountsShow, setCheckInSeachAccountsShow] =
    useState(false);
  const [data, setData] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const [showCheckInNoteModal, setShowCheckInNoteModal] = useState(false);
  const [checkInNoteInput, setCheckInNoteInput] = useState();
  const [infoModal, setInfoModal] = useState({ show: false });
  const [infoSearchModal, setInfoSearchModal] = useState({ show: false });
  const [searchCheckInValue, setSearchCheckInValue] = useState("");
  const [infoSearchShowModal, setInfoSearchShowModal] = useState({
    show: false,
  });
  const [qrShowModal, setQrShowModal] = useState({ show: false });

  const [createQrInputValue, setCreateQrInputValue] = useState(null);
  const [createQrInputValueModal, setCreateQrInputValueModal] = useState({
    show: false,
  });
  //const [method, setMethod] = useState();
  useImperativeHandle(ref, () => ({
    setCheckInSeachAccountsShow, // Expose the function via ref
    setData,
    setShowCheckInNoteModal,
    setInfoModal,
    setInfoSearchModal,
    setInfoSearchShowModal,
    setQrShowModal,
    setCreateQrInputValueModal,
  }));

  useEffect(() => {
    // props.setShowLocation(false);
    console.log("ANA BL MODEL");
  });
  const checkInFromSeach = (accountId) => {
    console.log("na2 ACCOUNT");
    props.setMethod("search");
    setCheckInSeachAccountsShow(false);
    setData([]);

    localStorage.setItem("ScannedAccountId", accountId);

    props.setShowLocation(true);
  };

  const checkInFromNote = () => {
    props.setMethod("Note");
    setData([]);
    setShowCheckInNoteModal(false);
    localStorage.setItem("ScannedAccountId", checkInNoteInput);
    setCheckInNoteInput();
    props.setShowLocation(true);
  };

  const openCheckInSearchModel = (message) => {
    // Update modelsShowPage state directly
    // Pass data directly without setting it in state
    setCheckInSeachAccountsShow(true);
    //  modalsChildRef.current.setShow(true);
    setData(message);
  };

  return (
    <>
      <Modal
        show={checkInSeachAccountsShow}
        onHide={() => {
          props.setShowLocation(false);
          setCheckInSeachAccountsShow(false);
          setData([]);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Choose Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="h-[43rem] overflow-y-auto">
          {data &&
            data.map((io, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-secondd text-BgTextColor shadow-sm p-2 rounded my-2"
                  onClick={(e) => {
                    checkInFromSeach(io["AccNo"]);

                    // console.log(io);
                    // props.setchangingAccountInvoiceFromDB(props.Client.RefNo);
                    // selectHandler(io, idx);
                  }}
                >
                  <div className="card-body">
                    <div className="flex-wrap">
                      <div className="flex flex-row justify-between">
                        <div>
                          <p className="me-3 mb-0 card-title">
                            {/* <strong>AccNo:</strong>{" "} */}
                            {io["AccNo"] != null && io["AccNo"] != ""
                              ? io["AccNo"]
                              : "--"}
                          </p>
                        </div>
                        <div>
                          <p className="me-3 mb-0">
                            {/* <strong>AccName:</strong> */}
                            {io["AccName"] != null && io["AccName"] != ""
                              ? io["AccName"].slice(0, 40)
                              : "--"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between">
                        <div>
                          <p className="me-3 mb-0">
                            {/* <strong>Address:</strong> */}
                            {io["Address"] != null && io["Address"] != ""
                              ? io["Address"]
                              : "--"}
                          </p>
                        </div>
                        <div>
                          <p className="me-3 mb-0">
                            {/* <strong>Tel:</strong> */}
                            {io["Tel"] != null && io["Tel"] != ""
                              ? io["Tel"]
                              : "--"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="me-3 mb-0">
                          <strong>Bal:</strong>
                          {io["Balance"] != null && io["Balance"] != ""
                            ? " " +
                              io["Balance"].toLocaleString() +
                              " " +
                              io["Cur"]
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Modal.Body>

        {/* <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer> */}
      </Modal>

      {/* {showLocation && (
        <Location setShowLocation={props.setShowLocation} method={method} />
      )} */}

      <Modal
        show={showCheckInNoteModal}
        onHide={() => {
          setShowCheckInNoteModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Account Note (30 characters)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={checkInNoteInput}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setCheckInNoteInput(e.target.value);
              }
            }}
            className="form-control"
            rows={5}
          />
        </Modal.Body>
        <Modal.Footer className="flex  justify-between">
          <div className="flex flex-row justify-between w-[100%]">
            <div>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowCheckInNoteModal(false);
                }}
              >
                Close
              </Button>
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                setCheckInNoteInput("");
              }}
            >
              Clear
            </Button>
            <Button variant="primary" onClick={checkInFromNote}>
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={infoModal.show}
        onHide={() => {
          setInfoModal({ ...infoModal, show: false });
          props.setShowLocation(false);
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
                props.setModelsShowPage(false);
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
        onHide={() => {
          setInfoSearchModal({ ...infoSearchModal, show: false });
          props.setShowLocation(false);
        }}
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
          <div className="flex flex-column justify-between justify-center">
            <div className="flex justify-center">{infoSearchModal.message}</div>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Search Value"
                className="text-lg font-semibold block rounded-md  h-[3rem] border border-secondd bg-white px-4 py-2 focus:outline-none focus:border-secondd focus:ring-1 focus:ring-secondd text-lg w-[50%]"
                value={searchCheckInValue}
                onChange={(e) => setSearchCheckInValue(e.target.value)}
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
                  value: searchCheckInValue,
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
                    openCheckInSearchModel(response.message);
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
      <Modal
        show={createQrInputValueModal.show}
        onHide={() => {
          setCreateQrInputValueModal({
            ...createQrInputValueModal,
            show: false,
          });
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {createQrInputValueModal.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Qr Value"
              className="text-lg font-semibold block rounded-md  h-[3rem] border border-secondd bg-white px-4 py-2 focus:outline-none focus:border-secondd focus:ring-1 focus:ring-secondd text-lg w-[50%]"
              value={createQrInputValue}
              onChange={(e) => setCreateQrInputValue(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button
              variant="danger"
              onClick={() => {
                setCreateQrInputValue({ ...createQrInputValue, show: false });
              }}
            >
              close
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setCreateQrInputValueModal({
                  ...createQrInputValueModal,
                  show: false,
                });
                setQrShowModal({
                  show: true,
                  qrData: createQrInputValue,
                  title: "Scan Or Dowload Qr Code",
                });
                setCreateQrInputValue(null);
              }}
            >
              Create
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={qrShowModal.show}
        onHide={() => setQrShowModal({ ...qrShowModal, show: false })}
        contentLabel="QR Code Modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {qrShowModal.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex justify-center items-center">
          <div id="qrCodeElement" className="p-4 bg-white">
            <QRCodeCanvas value={qrShowModal.qrData} size={200} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-between">
            <button
              className="bg-secondd text-BgTextColor mt-4 p-2 rounded-md hover:bg-seconddfocus:outline-none focus:bg-secondd group hover:shadow-md"
              onClick={() => {
                setQrShowModal({ ...qrShowModal, show: false });
              }}
            >
              Close
            </button>
            <button
              className="bg-secondd text-BgTextColor mt-4 p-2 rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group  hover:shadow-md"
              onClick={() => {
                downloadQrCode(qrShowModal.qrData);
              }}
            >
              Download QR
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
});
export default Modals;
