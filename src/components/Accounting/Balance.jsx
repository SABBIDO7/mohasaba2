import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { ModalHeader, ModalTitle } from "react-bootstrap";
import uuid from "react-uuid";

export default function Balance(props) {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [Branch, setBranch] = useState([]);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);

    fetch(
      props.url +
        "/moh/" +
        localStorage.getItem("compname") +
        "/Accounting/Balance/" +
        props.oData["AccNo"].trim() +
        "/"
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Info == "authorized") {
          setBranch(data.Branch);
        } else {
          //window.location.href = props.url;
        }
      })
      .catch((err) => {
        window.location.href = props.url;
      });
  }
  let nof = "";
  if (Branch.length == 1) {
    nof = Branch.length + "  (rec)";
  } else {
    nof = Branch.length + "  (rec)";
  }
  return (
    <>
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 my-1" onClick={() => handleShow(v)}>
          {props.oData["Balance"] !== null
            ? props.oData["Balance"].toFixed(2)
            : "0.00" + " " + props.oData["Cur"]}
          {typeof v === "string" && `below ${v.split("-")[0]}`}
        </Button>
      ))}
      <Modal show={show} centered onHide={() => setShow(false)}>
        <Modal.Header className="d-flex justify-content-start">
          <Modal.Header closeButton className="border-0"></Modal.Header>
          <Modal.Title className="pl-3">{props.oData["AccName"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h1 className='underline'>Info:</h1> */}
          <div className=" text-center">AccNo: {props.oData["AccNo"]}</div>
          <Table striped bordered responsive className=" mt-2 ">
            <thead className="bg-secondd text-BgTextColor">
              <tr>
                <th>BR</th>
                <th className="text-center">DB</th>
                <th className="text-center">CR</th>
              </tr>
            </thead>
            <tbody>
              {Branch.map((Br) => {
                return (
                  <tr
                    key={Br["key"]}
                    className="hover:bg-secondd hover:text-BgTextColor whitespace-nowrap"
                  >
                    <td>{Br["Branch"]}</td>
                    <td className=" text-right">
                      {Br["DB"] !== null ? Br["DB"].toFixed(2) : ""}
                    </td>
                    <td className=" text-right">
                      {Br["CR"] !== null ? Br["CR"].toFixed(2) : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}
