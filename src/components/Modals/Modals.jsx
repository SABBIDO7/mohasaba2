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

import {
  checkInEndPoint,
  handleCheckInSearch,
  Notify,
} from "../BackendEndPoints/Endpoint1";
const Modals = forwardRef((props, ref) => {
  const [checkInSeachAccountsShow, setCheckInSeachAccountsShow] =
    useState(false);
  const [data, setData] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const [showCheckInNoteModal, setShowCheckInNoteModal] = useState(false);
  const [checkInNoteInput, setCheckInNoteInput] = useState();
  const [method, setMethod] = useState();
  useImperativeHandle(ref, () => ({
    setCheckInSeachAccountsShow, // Expose the function via ref
    setData,
    setShowCheckInNoteModal,
  }));

  useEffect(() => {});
  const checkInFromSeach = (accountId) => {
    setMethod("search");
    setCheckInSeachAccountsShow(false);
    setData([]);

    localStorage.setItem("ScannedAccountId", accountId);

    setShowLocation(true);
  };

  const checkInFromNote = () => {
    setMethod("Note");
    setData([]);
    setShowCheckInNoteModal(false);
    localStorage.setItem("ScannedAccountId", checkInNoteInput);
    setCheckInNoteInput();
    props.setShowLocation(true);
  };

  return (
    <>
      <Modal
        show={checkInSeachAccountsShow}
        onHide={() => {
          props.setShowLocation(true);
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

      {showLocation && (
        <Location setShowLocation={setShowLocation} method={method} />
      )}

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
    </>
  );
});
export default Modals;
