import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DiscardInvoiceModal(props) {
    return (
        <>
            <Modal
                show={props.modalShow}
                onHide={() => props.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Unsaved Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are You Sure You Want To Exit Invoice Without Saving Changes?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex flex-row w-full justify-around">
                        <Button onClick={()=>props.setModalShow(false)}>No</Button>
                        <Button variant="danger" onClick={()=>{
                            props.setModalShow(false);
                            props.callBack();
                            props.exit("");
                        
                        }
                        }
                        >Yes</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
