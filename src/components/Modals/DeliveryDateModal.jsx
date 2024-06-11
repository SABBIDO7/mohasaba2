import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DeliveryDatePicker from "../Invoice/DeliveryDatePicker"; // Adjust the import path as necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTruck } from "@fortawesome/free-solid-svg-icons";

const DeliveryDateModal = (props) => {
  const [show, setShow] = useState(false);
  const [listOffs, setListOffs] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className=""
        onClick={() => {
          if (props.Client["id"] != "" && props.Client["id"] != undefined) {
            handleShow();
          }
        }}
      >
        <FontAwesomeIcon icon={faTruck} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select Delivery Date
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col justify-around items-center">
            <DeliveryDatePicker
              Client={props.Client}
              setClient={props.setClient}
              setListOffs={setListOffs}
              oldInvoice={props.oldInvoice}
              setpropertiesAreEqual={props.setpropertiesAreEqual}
            />
            {listOffs.length != 0 && (
              <div className="">
                <h3>Skipped Days:</h3>
                <ul className="text-BgTextColor">
                  {listOffs.map((off, index) => (
                    <li key={index}>
                      {off.name}: {off.date}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeliveryDateModal;
