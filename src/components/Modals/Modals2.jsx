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
const Modals2 = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    setRestrictionModal,
  }));
  const [restrictionModal, setRestrictionModal] = useState({
    show: false,
  });

  return (
    <>
      <Modal
        show={restrictionModal.show}
        onHide={() => {
          setRestrictionModal({ ...restrictionModal, show: false });
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {restrictionModal.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{restrictionModal.message}</Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button
              variant="danger"
              onClick={() => {
                setRestrictionModal({ ...restrictionModal, show: false });
              }}
            >
              Ok
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
});
export default Modals2;
