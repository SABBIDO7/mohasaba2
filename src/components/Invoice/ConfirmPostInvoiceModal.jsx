import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ConfirmPostInvoiceModal(props) {
    return (
        <>
            <Modal
                show={props.modalShow}
                onHide={() => props.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">Confirm Invoice?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex flex-row justify-around w[100%]">
                        <Button variant="danger" onClick={() => props.setModalShow(false)}>No</Button>
                        <Button onClick={() =>onYesPress()
                         }>Yes</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
    function onYesPress() {
        if (props.accno == ""){

        }else if(props.items.length == 0){

        }else{
            props.setModalShow(false)
            props.postInvoice(props.type,props.Client,props.items);
            console.log("/*/*/*/*/*/*/*/**/");
            console.log(props.type,props.Client,props.items);
        }
    }
}
