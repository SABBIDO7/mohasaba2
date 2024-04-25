import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import uuid from "react-uuid";
import Summery from "../Accounting/Summery";

export default function InitialSummery(props) {
  const values = [true];
  const [show, setShow] = useState(false);
  const [summery, setSummery] = useState([]);

  function handleShow(breakpoint) {
    setShow(true);
    console.log("Ana bel initialSummery handle");

    fetch(
      props.url +
        "/moh/" +
        localStorage.getItem("compname") +
        "/Accounting/InitialSummery/" +
        props.sinfo["AccNo"].trim() +
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
          //window.location.href = props.url;
        }
      })
      .catch((err) => {
        //window.location.href = props.url
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
            <span className="flex flex-col">{}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="flex items-center space-x-4">
            <p className="font-semibold m-0 text-gray-500">
              {" "}
              {props.sinfo["AccNo"]}{" "}
            </p>
            {summery.length > 0 && props.sinfo["AccNo"] !== "ALLDATA" && (
              <p className="font-semibold m-0 text-gray-500">
                {summery[0]["Name"] !== null ? summery[0]["Name"] : ""}
              </p>
            )}
            <Summery
              sinfo={props.sinfo}
              token={props.token}
              url={props.url}
              branch={props.branch}
              branchSearch={props.branchSearch}
              setShow={setShow}
            />
          </div>

          <Table striped bordered responsive className=" mt-2 ">
            <thead className="bg-secondd text-BgTextColor">
              <tr>
                <th>Type</th>
                <th>BR</th>
                <th>DB</th>
                <th>CR</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {summery.map((state) => {
                return (
                  <tr
                    key={uuid()}
                    className="hover:bg-secondd hover:text-BgTextColor whitespace-nowrap"
                  >
                    <td>{state["InvType"]}</td>
                    <td>{state["BR"]}</td>
                    <td className=" text-center">
                      {
                        state["DB"] !== null
                          ? state["DB"].toLocaleString()
                          : "" /* toFixed(2)*/
                      }
                    </td>
                    <td className=" text-center">
                      {state["CR"] !== null ? state["CR"].toLocaleString() : ""}
                    </td>
                    <td className=" text-right">
                      {state["Balance"] !== null
                        ? state["Balance"].toLocaleString() /*toFixed(2) */
                        : ""}
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
