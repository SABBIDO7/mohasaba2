import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import uuid from "react-uuid";
import StockDouble from "./StockDouble";
import BranchSelect from "./BranchSelect";
import Accordion from "react-bootstrap/Accordion";
import Select from "react-select";
import axios from "axios";

export default function Statement(props) {
    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [statement, setStatement] = useState([]);
    const [page, setPage] = useState(1);
    const [Npage, setNPage] = useState(1);
    const [Cpage, setCPage] = useState(1);
    const [isLoading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState({
        type: "",
        no: "",
    });
    const [bSelect, setActiveBranch] = useState(props.fil);

    //filter State
    const [dFrom, setdFrom] = useState("");
    const [dTo, setdTo] = useState("");
    const [typeOptions, setTypeOptions] = useState([]);
    const [branchOptions, setBranchOptions] = useState([]);
    const [sType, setsType] = useState("Any");
    const [sBranch, setsBranch] = useState("Any");

    function clearFilters() {
        setdFrom("");
        setdTo("");
        setsBranch("Any");
        setsType("Any");
    }

    let nof = "";

    async function fetchdata(p, br) {
        setCPage(p);
        if (br == null) {
            br = bSelect[0];
        }
        fetch(
            props.url +
                "/moh/" +
                props.token +
                "/Stock/Statement/" +
                props.oData["ItemNo"].trim() +
                "/"
        )
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Info == "authorized") {
                    if (data.stock != statement) {
                        setStatement(data.stock);
                    }
                    setTypeOptions(data.disType);
                    setBranchOptions(data.dbr);
                    setLoading(false);
                } else {
                    window.location.href = props.url;
                }
            })
            .catch((err) => {
                window.location.href = props.url;
            });
    }

    // async function cpageHandler(i) {
    //     setCPage(i);
    //     setLoading(true);
    //     fetchdata(i);
    // }

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);

        fetchdata(Cpage);
    }

    // nof = page + "  (rec)";

    // if (Npage != Math.ceil(page / 100)) {
    //     setNPage(Math.ceil(page / 100));
    // }

    return (
        <>
            {modalShow ? (
                <StockDouble
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    data={modalData}
                    key={uuid()}
                    url={props.url}
                />
            ) : null}

            {values.map((v, idx) => (
                <td key={uuid()} onDoubleClick={() => handleShow(v)}>
                    {props.show}
                </td>
            ))}
            {/* <Modal show={show} className="w-[90vw]" dialogClassName="modal-90w" onHide={() => setShow(false)}> */}
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                size="xl
        "
                scrollable={true}>
                <Modal.Header className="d-flex justify-content-center ">
                    <Modal.Header
                        closeButton
                        className="border-0 position-absolute start-0"></Modal.Header>
                    <Modal.Title className="ms-5 me-5">{props.oData["ItemName"]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=" flex items-start justify-around">
                        <p className="font-semibold m-0 text-gray-500"> {props.oData["ItemNo"]} </p>
                        <span>Qty: {props.oData["Qty"]}</span>
                    </div>
                    <div className="max-w-[30rem]">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header id="sfl">Filters</Accordion.Header>
                                <Accordion.Body>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row justify-around my-2">
                                            <Button onClick={filterStatement}>Apply</Button>
                                            <Button onClick={clearFilters} variant="light">
                                                Clear
                                            </Button>
                                            <Button onClick={closeFilter} variant="danger">
                                                Cancel
                                            </Button>
                                        </div>
                                        <div className="flex flex-col bg-neutral-200 p-1 mb-1 rounded">
                                            <div className=" w-[100%] mx-auto flex flex-col">
                                                <div className="flex flex-row justify-between items-center align-center">
                                                    <input
                                                        type={"date"}
                                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder={"Start Date"}
                                                        value={dFrom}
                                                        onChange={(e) => {
                                                            setdFrom(e.target.value);
                                                        }}
                                                    />
                                                    <div>To</div>
                                                    <input
                                                        type={"date"}
                                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder={"End Date"}
                                                        value={dTo}
                                                        onChange={(e) => {
                                                            setdTo(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col bg-neutral-200 mt-1 p-1 rounded">
                                            <div className=" w-[100%] mx-auto flex flex-col">
                                                <div className="w-[100%] flex flex-row ">
                                                    <div className="flex flex-col w-[50%] align-center">
                                                        <div className="mx-2">Type</div>
                                                        <Select
                                                            className="basic-single w-[90%] mx-auto"
                                                            classNamePrefix="select"
                                                            isSearchable={false}
                                                            isClearable={false}
                                                            name="color"
                                                            placeholder="Type"
                                                            options={typeOptions}
                                                            value={{ value: sType, label: sType }}
                                                            onChange={(e) => {
                                                                setsType(e.value);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col w-[50%]  align-center">
                                                        <div className="mx-2">branch</div>
                                                        <Select
                                                            className="basic-single w-[90%] mx-auto"
                                                            classNamePrefix="select"
                                                            isSearchable={false}
                                                            isClearable={false}
                                                            name="color"
                                                            placeholder="Branch"
                                                            options={branchOptions}
                                                            value={{
                                                                value: sBranch,
                                                                label: sBranch,
                                                            }}
                                                            onChange={(e) => {
                                                                setsBranch(e.value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="underline  w-fit text-2xl">Statement:</span>{" "}
                        {/* <BranchSelect fData={fetchdata} page={Cpage} setActiveBranch={setActiveBranch} selected={bSelect} branches={props.branches} branchSearch={true}/> */}
                    </div>
                    <Table striped bordered hover className=" mt-2 ">
                        <thead>
                            <tr key={uuid()} className="bg-slate-500">
                                <th>Date</th>
                                <th>Type</th>
                                <th>No</th>
                                <th>Qty</th>
                                <th>UPrice</th>
                                <th>AccName</th>
                                <th>BR</th>
                                <th>PQty</th>
                                <th>LN</th>
                                <th>UFob</th>
                                <th>PQUnit</th>
                                <th>Disc</th>
                                <th>Weight</th>
                                <th>Notes</th>
                                <th>Tax</th>
                                <th>Total</th>
                                <th>AccNo</th>
                                <th>Disc100</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statement.map((state) => {
                                return (
                                    <tr
                                        key={uuid()}
                                        className="hover:bg-blue-200 whitespace-nowrap  "
                                        onDoubleClick={() => {
                                            setModalShow(true);
                                            setModalData({
                                                token: props.token,
                                                type: state["RefType"],
                                                no: state["RefNo"],
                                                AccName: state["AccName"],
                                                AccNo: state["AccNo"],
                                            });
                                        }}>
                                        <td>{state["TDate"]}</td>
                                        <td>{state["RefType"]}</td>
                                        <td>{state["RefNo"]}</td>
                                        <td className=" text-center">{state["Qty"]}</td>
                                        <td className=" text-right">{state["UPrice"]}</td>
                                        <td>{state["AccName"]}</td>
                                        <td>{state["Branch"]}</td>
                                        <td>{state["PQty"]}</td>
                                        <td>{state["LN"]}</td>
                                        <td>{state["UFob"]}</td>
                                        <td>{state["PQUnit"]}</td>
                                        <td>{state["Disc"]}</td>
                                        <td>{state["Weight"]}</td>
                                        <td>{state["Notes"]}</td>
                                        <td>{state["Tax"]}</td>
                                        <td>{state["Total"]}</td>
                                        <td>{state["AccNo"]}</td>
                                        <td>{state["Disc100"]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    {isLoading ? (
                        <Spinner animation="border" role="status" disabled={true}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <span></span>
                    )}

                    {/* <Pagination>
              <Pagination.First onClick={()=>{
                cpageHandler(1);
              
              }}/>
              <Pagination.Prev onClick={()=>{
                if(Cpage>1){
                  cpageHandler(Cpage - 1);
                }
              
              }}/>

              <Pagination.Item>{Cpage}</Pagination.Item>

              <Pagination.Next onClick={()=>{
                if(Cpage<Npage){
                  cpageHandler(Cpage + 1);
                }
               
              }}/>
              <Pagination.Last onClick={()=>{
                cpageHandler(Npage);
                
               
              }}/>
            </Pagination> */}
                </Modal.Footer>
            </Modal>
        </>
    );
    function closeFilter() {
        document.getElementById("sfl").firstChild.click();
    }
    function filterStatement() {
        let data = { dfrom: dFrom, dto: dTo, dtype: sType, db: sBranch };
       
        axios({
            method: "POST",
            url: props.url + "/moh/Stock/Statement/Filter/",
            data: {
                token: props.token,
                data: data,
                id: props.oData["ItemNo"].trim(),
            },
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
              
                if (res.data.Info == "authorized") {
                    setStatement(res.data.Statment);

                    closeFilter();
                } else {
                    window.location.href = "/";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
