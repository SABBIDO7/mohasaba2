import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import uuid from "react-uuid";

export default function Summery(props) {
  const values = [true];
  const [show, setShow] = useState(false);
  const [summery, setSummery] = useState([]);

  function handleShow(breakpoint) {
    setShow(true);

    fetch(
      props.url +
        "/moh/" +
        localStorage.getItem("compname") +
        "/Stock/Summery/" +
        props.sinfo["ItemNo"].trim() +
        "/" +
        props.branch +
        "/" +
        props.branchSearch
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Info === "authorized") {
          setSummery(data.summery);
        } else {
          // window.location.href = props.url;
        }
      })
      .catch((err) => {
        //window.location.href = props.url
        console.log(err);
      });
  }

  return (
    <>
      {values.map((v, idx) => (
        <Button
          key={idx}
          className="me-2 my-1 w-[107px]"
          onClick={() => handleShow(v)}
        >
          {typeof v === "string" && `below ${v.split("-")[0]}`}
          Summery
        </Button>
      ))}
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
            <span className="flex flex-col">{props.sinfo["ItemName"]}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className=" flex items-start">
            <p className="font-semibold m-0 text-gray-500">
              {" "}
              {props.sinfo["ItemNo"]}{" "}
            </p>
          </div>

          <Table striped bordered responsive className=" mt-2 ">
            <thead
              className="bg-secondd text-BgTextColor
"
            >
              <tr>
                <th>BR</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Tax</th>
              </tr>
            </thead>
            <tbody>
              {summery.map((state) => {
                return (
                  <tr key={uuid()} className="hover:bg-secondd hover:text-BgTextColor whitespace-nowrap">
                    <td>{state["Branch"]}</td>
                    <td>{state["InvType"]}</td>
                    <td className=" text-center">{state["Qty"]}</td>
                    <td className=" text-right">{state["Total"]}</td>
                    <td>{state["Tax"]}</td>
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
