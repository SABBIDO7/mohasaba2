import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

export default function ItemStockDetails(props) {
  const [isLoading, setLoading] = useState(true);
  const [Double, setDouble] = useState([]);

  useEffect(() => {
    if (props.show == true) {
      fetch(
        props.url +
          "/moh/" +
          localStorage.getItem("compname") +
          "/ItemStockDetails/Double/" +
          props.data["ItemNo"] +
          "/"
      )
        .then((resp) => resp.json())
        .then((data) => {
          if (data.Info === "authorized") {
            setDouble(data.stockDetails);
            setLoading(false);
            console.log("ccoonnsss", data.stockDetails);
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.data]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="shadow-2xl drop-shadow-2xl shadow-black"
      >
        <Modal.Header className="d-flex justify-content-center p-1">
          <Modal.Header
            closeButton
            className="border-0 position-absolute start-0"
          ></Modal.Header>
          <Modal.Title className="ms-5 me-5">
            {props.data["ItemName"]}-WareHouse
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" max-h-[30rem] overflow-y-scroll">
            {isLoading ? (
              <Spinner animation="border" role="status" disabled={true}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Table striped bordered responsive className=" mt-2 ">
                <thead className="bg-secondd text-BgTextColor">
                  <tr className="">
                    <th>Branch</th>
                    <th>BranchName</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {Double.map((DB) => {
                    return (
                      <tr
                        key={DB["key"]}
                        className="hover:bg-secondd hover:text-BgTextColor whitespace-nowrap"
                      >
                        <td>{DB["Branch"]}</td>
                        <td>{DB["BranchName"]}</td>
                        <td>{DB["Qty"]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
      </Modal>
    </>
  );
}
