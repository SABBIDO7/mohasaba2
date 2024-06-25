import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { ModalHeader, ModalTitle } from "react-bootstrap";
import uuid from "react-uuid";

export default function Quantity(props) {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [statement, setStatement] = useState([]);
  const { t } = props;
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);

    fetch(
      props.url +
        "/moh/" +
        localStorage.getItem("compname") +
        "/Stock/Branch/" +
        props.oData["ItemNo"].trim() +
        "/"
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Info == "authorized") {
          setStatement(data.branch);
        } else {
          //window.location.href = props.url;
        }
      })
      .catch((err) => {});
  }

  let l = props.format;
  const DFormat = () => {
    if (l == "btn") {
      return (
        <Button
          key={uuid()}
          className="me-2 my-1"
          onClick={() => handleShow(true)}
        >
          {t("Qty")}: {props.children}
        </Button>
      );
    } else {
      return (
        <td
          key={uuid()}
          className="me-2 my-1"
          onDoubleClick={() => handleShow(true)}
        >
          {props.children}
        </td>
      );
    }
  };
  return (
    <>
      <DFormat />

      <Modal
        show={show}
        size="lg"
        scrollable={true}
        centered
        onHide={() => setShow(false)}
      >
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Header
            closeButton
            className="border-0 position-absolute start-0"
          ></Modal.Header>
          <Modal.Title className="ms-5 me-5">
            <span className="flex flex-col">{props.oData["ItemName"]}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className=" flex items-start">
            <p className="font-semibold m-0 text-gray-500">
              {" "}
              {props.oData["ItemNo"]}{" "}
            </p>
          </div>
          <h2 className="text-end">Total: {props.oData["Qty"]}</h2>

          <Table striped bordered responsive className=" mt-2 ">
            <thead
              className="bg-secondd text-BgTextColor
"
            >
              <tr>
                <th>Item No</th>
                <th>Item Name</th>
                <th>BR</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {statement.map((state) => {
                return (
                  <tr
                    key={uuid()}
                    className="hover:bg-secondd hover:text-BgTextColor whitespace-nowrap"
                  >
                    <td>{state["ItemNo"]}</td>
                    <td>{state["ItemName"]}</td>
                    <td>{state["BR"]}</td>
                    <td className=" text-right">{state["Qty"]}</td>
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
