import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DeliveryDatePicker from "../Invoice/DeliveryDatePicker"; // Adjust the import path as necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const DeliveryDateModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="" onClick={handleShow}>
        <FontAwesomeIcon icon={faCalendarAlt} />
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
          <DeliveryDatePicker
            Client={props.Client}
            setClient={props.setClient}
          />
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
