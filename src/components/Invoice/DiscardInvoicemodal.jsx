import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DiscardInvoiceModal(props) {
  const { t } = props;
  return (
    <>
      <Modal
        show={props.modalShow}
        onHide={() => props.setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {`${t("p6")}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{`${t("p28")}`}</h4>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button onClick={() => props.setModalShow(false)}>{`${t(
              "No"
            )}`}</Button>
            <Button
              variant="danger"
              onClick={() => {
                props.setModalShow(false);
                props.callBack();
                props.exit("");
              }}
            >
              {`${t("Yes")}`}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
