import React,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

function MyModal(props) {


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.sinfo["ItemName"]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Title>Item Details</Card.Title>
            <Card.Text>
              <div className="row">
                <div className="col-6">
                  <p><strong>Item Number:</strong> {props.sinfo["ItemNo"]?props.sinfo["ItemNo"]:"--"}</p>
                  <p><strong>Qty:</strong> {props.sinfo["Qty"] ? props.sinfo["Qty"] : "--"}</p>
                </div>
                <div className="col-6">
                  <p><strong>Item Name 2:</strong> {props.sinfo["ItemName2"] ? props.sinfo["ItemName2"]:"--"}</p>
                  <p><strong>Main Number:</strong> {props.sinfo["MainNo"] ? props.sinfo["MainNo"]:"--"}</p>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
        <Card>
          <Card.Body>
            <Card.Title>
              Additional Details
            </Card.Title>
      
              <Card.Text>
                <div className="row">
                  <div className="col-6">
                    {<p><strong>Set:</strong> {props.sinfo["SetG"] ? props.sinfo["SetG"]:"--"}</p>}
                    {<p><strong>Category:</strong> {props.sinfo["Category"] ? props.sinfo["Category"]:"--"}</p>}
                    {<p><strong>Unit:</strong> {props.sinfo["Unit"] ? props.sinfo["Unit"]:"--"}</p>}
                    {<p><strong>Brand:</strong> {props.sinfo["Brand"] ? props.sinfo["Brand"]:"--"}</p>}
                    {<p><strong>Origin:</strong> {props.sinfo["Origin"] ? props.sinfo["Origin"]:"--"}</p>}
                    {<p><strong>Size:</strong> {props.sinfo["Sizeg"] ? props.sinfo["Sizeg"]:"--"}</p>}
                    {<p><strong>Color:</strong> {props.sinfo["Color"] ?  props.sinfo["Color"]:"--"}</p>}
                    {<p><strong>SUPP:</strong> {props.sinfo["Supplier"] ?  props.sinfo["Supplier"]:"--"}</p>}
                  </div>
                  <div className="col-6">
                    {<p><strong>Group:</strong> {props.sinfo["Groupg"] ?  props.sinfo["Groupg"]:"--"}</p>}
                    {<p><strong>Family:</strong> {props.sinfo["Family"] ? props.sinfo["Family"]:"--"}</p>}
                    {<p><strong>Tax:</strong> {props.sinfo["Tax"] ? props.sinfo["Tax"]:"--"}</p>}
                    {<p><strong>BPUnit:</strong> {props.sinfo["BPUnit"] ? props.sinfo["BPUnit"]:"--"}</p>}
                    {<p><strong>PQty:</strong> {props.sinfo["PQty"] ? props.sinfo["PQty"]:"--"}</p>}
                    {<p><strong>PUnit:</strong> {props.sinfo["PUnit"] ? props.sinfo["PUnit"]:"--"}</p>}
                    {<p><strong>PQUnit:</strong> {props.sinfo["PQUnit"] ? props.sinfo["PQUnit"]:"--"}</p>}
                    {<p><strong>BPUnit:</strong> {props.sinfo["SPUnit"] ? props.sinfo["SPUnit"]:"--"}</p>}
                  </div>
                </div>
              </Card.Text>
        
          </Card.Body>
        </Card>
</Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Info(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className="w-[107px] ml-[0.6rem]" variant="primary" onClick={() => setModalShow(true)}>
        Profile
      </Button>

      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        sinfo={props.sinfo}
      />
    </>
  );
}
