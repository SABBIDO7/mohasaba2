import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Table from 'react-bootstrap/Table';

function MyModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header className='d-flex justify-content-center'>
      <Modal.Header closeButton className="border-0 position-absolute start-0"></Modal.Header>
        <Modal.Title className='ms-5 me-5'>
        {props.sinfo["ItemName"]}
        </Modal.Title>
       
      </Modal.Header>
      <Modal.Body>
      <div className=" flex items-center flex-col">
      <p className="font-semibold m-0 text-gray-500 text-center border-b-2">Item Name 2:    {props.sinfo["ItemName2"]} </p>
      <p className="font-semibold m-0 text-gray-500 text-center border-b-2">Item Number:  {props.sinfo["ItemNo"]} </p>
      <p className="font-semibold m-0 text-gray-500 text-center ">Main Number:  {props.sinfo["MainNo"]} </p>
      </div>

      <div className=' flex flex-row justify-evenly'>

      <Table bordered responsive striped="columns">
      {props.sinfo["SetG"] == ""?
        null
      :
      <thead className=' whitespace-nowrap'>
        <tr className="hover:bg-slate-500" >
          <th>Set</th>
          <th>{props.sinfo["SetG"]}</th>
        </tr>
      </thead>
      }
      {props.sinfo["Category"] == ""?
        null
      :
      <thead className=' whitespace-nowrap'>
        <tr className="hover:bg-slate-500" >
          <th>Cat.</th>
          <th>{props.sinfo["Category"]}</th>
        </tr>
      </thead>
      }
      {props.sinfo["Unit"] == ""?
        null
      :
      <thead className=' whitespace-nowrap'>
        <tr className="hover:bg-slate-500" >
          <th>Unit</th>
          <th>{props.sinfo["Unit"]}</th>
        </tr>
      </thead>
      }
      {props.sinfo["Brand"] == ""?
        null
      :
      <thead className=' whitespace-nowrap'>
        <tr className="hover:bg-slate-500" >
          <th>Brand</th>
          <th>{props.sinfo["Brand"]}</th>
        </tr>
      </thead>}
      {props.sinfo["Origin"] == ""?
        null
      :
      <thead className=' whitespace-nowrap'>
        <tr className="hover:bg-slate-500" >
          <th>Origin</th>
          <th>{props.sinfo["Origin"]}</th>
        </tr>
      </thead>}
      {props.sinfo["Supplier"] == ""?
        null
      :
      <thead className=' whitespace-nowrap'>
        <tr className="hover:bg-slate-500" >
          <th>SUPP</th>
          <th>{props.sinfo["Supplier"]}</th>
        </tr>
      </thead>}

          
      </Table>
      <Table striped="columns" bordered responsive>
      {props.sinfo["Sizeg"] == ""?
        null
      :
      <thead className=' whitespace-nowrap'>
        <tr className="hover:bg-slate-500" >
          <th>Size</th>
          <th>{props.sinfo["Sizeg"]}</th>
        </tr>
      </thead>}
      {props.sinfo["Color"] == ""?
        null
      :
      <thead className=' whitespace-nowrap'>
        <tr className="hover:bg-slate-500" >
          <th>Color</th>
          <th>{props.sinfo["Color"]}</th>
        </tr>
      </thead>}
      {props.sinfo["Groupg"] == ""?
        null
      :
      <thead className=' whitespace-nowrap'>
        <tr className="hover:bg-slate-500" >
          <th>Group</th>
          <th>{props.sinfo["Groupg"]}</th>
        </tr>
      </thead>}
      {props.sinfo["Family"] == ""?
        null
      :
      <thead className=' whitespace-nowrap'>
        <tr className="hover:bg-slate-500" >
          <th>Family</th>
          <th>{props.sinfo["Family"]}</th>
        </tr>
      </thead>}
      {props.sinfo["Tax"] == ""?
        null
      :
      <thead className=' whitespace-nowrap'>
        <tr className="hover:bg-slate-500" >
          <th>Tax</th>
          <th>{props.sinfo["Tax"]}</th>
        </tr>
      </thead>}

   

    

    
  

          
      </Table>
      </div>
    
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
