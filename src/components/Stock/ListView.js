import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import uuid from 'react-uuid'

export default function ListView() {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);


  return (
    <>
    
        <Button key={uuid()} onClick={() =>setShow(true)}>
          Simplified
        </Button>
   
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
      </Modal>
    </>
  );
}