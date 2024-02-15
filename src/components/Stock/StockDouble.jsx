import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

export default function StockDouble(props) {
    const [isLoading, setLoading] = useState(true);
    const [Double, setDouble] = useState([]);
    const [Date, setDate] = useState("");
 
    useEffect(() => {

        fetch(
            props.url +
                "/moh/" +
                localStorage.getItem("compname") +
                "/Stock/Double/" +
                props.data["type"].trim() +
                "/" +
                props.data["no"] +
                "/"+ props.limit
        )
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Info === "authorized") {
                    setDouble(data.double);
                    setLoading(false);
                    setDate(data.double[0]["TDate"]);
                } else {
                    
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="shadow-2xl drop-shadow-2xl shadow-black">
                <Modal.Header className="d-flex justify-content-center p-1">
                    <Modal.Header
                        closeButton
                        className="border-0 position-absolute start-0"></Modal.Header>
                    <Modal.Title className="ms-5 me-5">
                        {props.data.type}-{props.data.no} | {Date}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=" max-h-[30rem] overflow-y-scroll">
                        <div className=" whitespace-normal text-center text-lg font-bold">
                            {props.data.AccNo} - {props.data.AccName}
                        </div>
                        <div></div>
                        {isLoading ? (
                            <Spinner animation="border" role="status" disabled={true}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <Table striped bordered responsive className=" mt-2 ">
                                <thead>
                                    <tr className="bg-slate-500">
                                        <th>ItemNo</th>
                                        <th>Item Name</th>
                                        <th>Notes</th>
                                        <th>P.Qty</th>
                                        <th>P.Unit</th>
                                        <th>Qty</th>
                                        <th>UPrice</th>
                                        <th>Disc</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Double.map((DB) => {
                                        return (
                                            <tr
                                                key={uuid()}
                                                className="hover:bg-blue-200 whitespace-nowrap">
                                                <td>{DB["ItemNo"]}</td>
                                                <td>{DB["ItemName"]}</td>
                                                <td>{DB["Notes"]}</td>
                                                <td>{DB["PQty"]}</td>
                                                <td>{DB["PQUnit"]}</td>
                                                <td className=" text-center">{DB["Qty"]}</td>
                                                <td className=" text-right">{DB["UPrice"]}</td>
                                                <td className=" text-right">{DB["Disc"]}</td>
                                                <td>{DB["Total"]}</td>
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
