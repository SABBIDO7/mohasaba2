import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import uuid from "react-uuid";
import StockDouble from "../Stock/StockDouble";
import Accordion from "react-bootstrap/Accordion";
import Select from "react-select";
import axios from "axios";
import FilterIcon from "../../media/FilterIcon.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ItemsSelectFilter from "./ItemsSelectFilter";

export default function ItemsOfAccount(props) {
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
    const [itmOptions, setitmOptions] = useState([]);
    const [sType, setsType] = useState("Any");
    const [sBranch, setsBranch] = useState("Any");
    const [sDisItem, setsDisItem] = useState("");
    const [fLimit, setfLimit] = useState({value:100,label:100});
    const [vLimit, setvLimit] = useState(100);

    function clearFilters() {
        setdFrom("");
        setdTo("");
        setsBranch("Any");
        setsType("Any");
        setsDisItem("");
        setvLimit(100);
    }

  

    async function fetchdata(p, br) {
        setCPage(p);
        // if (br == null) {
        //     br = bSelect[0];
        // }
        fetch(
            props.url +
                "/moh/" +
                localStorage.getItem("compname") +
                "/Accounting/ItemsFromAccount/" +
                props.id.trim() +
                "/" + vLimit + "/"
        )
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Info == "authorized") {
                    if (data.stock != statement) {
                        setStatement(data.stock);
                    }
                    setTypeOptions(data.disType);
                    setBranchOptions(data.dbr);
                    setitmOptions(data.disStock);
                    setLoading(false);
                } else {
                    window.location.href = props.url;
                }
            })
            .catch((err) => {
                window.location.href = props.url;
            });
    }

    function dateFilterHandler(e) {
        // let d = new Date();

        // let month = d.getMonth();
        // let day = d.getDate();
        // let year = d.getFullYear();
        // if(month!==9 && month!==10 && month!==11){
             
        //     month=month+1;
        //     month="0"+month;
         
        // }else{
        //     month=month+1;
        // }
        // Create a new Date object representing the current date
        const currentDate = new Date();

        // Get the year, month, and day components
        const year = currentDate.getFullYear();
        // Months are zero-based, so we add 1 to get the correct month
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        if (e == "Today") {
            console.log("hon day")
            console.log(day);
            setdFrom(year + "-" + (month) + "-" + day);
            setdTo(year + "-" + (month) + "-" + day);
        } else if (e == "Yesterday") {
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate()-1);

            // Get the year, month, and day components for yesterday
            const yYear = yesterday.getFullYear();
            const yMonth = (yesterday.getMonth() + 1).toString().padStart(2, '0');
            const yDay = yesterday.getDate().toString().padStart(2, '0');

            setdFrom(yYear.toString() + "-" + yMonth.toString() + "-" + yDay.toString());
            setdTo(yYear.toString() + "-" + yMonth.toString() + "-" + yDay.toString());
        } else {
            
            setdFrom(year.toString() + "-" + e.toString().split("-")[0].trim() + "-" + "01");
            // if ()
            let lastdate = new Date(year, parseInt(e.toString().split("-")[0].trim()), 0);

            setdTo(year + "-" + e.toString().split("-")[0].trim() + "-" + lastdate.getDate());
            console.log(dFrom);
        }
    }
    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}>
            {children}
            {/* &#x25bc; */}
            <img src={FilterIcon} className="h-[1.5rem]" />
        </a>
    ));

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
            return (
                <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
                    <ul className="list-unstyled" onClick={(e) => dateFilterHandler(e.target.text)}>
                        {React.Children.toArray(children)}
                    </ul>
                </div>
            );
        }
    );

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);

        fetchdata(Cpage);
    }

    // nof = page + "  (rec)";

    // if (Npage != Math.ceil(page / 100)) {
    //     setNPage(Math.ceil(page / 100));
    // }
    let nof = "";
    if (statement.length == 1) {
        nof = statement.length + "  r";
    } else {
        nof = statement.length + "  r";
    }
    return (
        <>
            {modalShow ? (
                <StockDouble
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    data={modalData}
                    key={uuid()}
                    url={props.url}
                    limit={vLimit}
                />
            ) : null}

            {values.map((v, idx) => (
                <Button key={idx} className="me-2 my-1" onClick={() => handleShow(v)}>
                    {"Items"}
                </Button>
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
                    <Modal.Title className="ms-5 me-5">{props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=" flex items-start justify-around">
                        {/* <p className="font-semibold m-0 text-gray-500"> {'props.oData["ItemNo"]'} </p>
                        <span>Qty: {'props.oData["Qty"]'}</span> */}
                    </div>
                    <div className=" text-lg">
                       

                        <span className="font-semibold ml-3"><Button onClick={()=>filterStatement("refresh")}>Refresh</Button></span>
                    </div>
                    <div className="max-w-[30rem]">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header id="sfl" className=" border-4">
                                    Filters
                                </Accordion.Header>
                                <Accordion.Body className="p-1">
                                    <div className="flex flex-col">
                                        <div className="flex flex-row justify-around items-center my-2">
                                            <Button onClick={()=>filterStatement("Apply")}>Apply</Button>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    as={CustomToggle}
                                                    id="dropdown-custom-components"></Dropdown.Toggle>

                                                <Dropdown.Menu as={CustomMenu}>
                                                    <Dropdown.Item eventKey="1">
                                                        Today
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="2">
                                                        Yesterday
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="3">
                                                        01 - JAN
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="4">
                                                        02 - FEB
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="5">
                                                        03 - MAR
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="6">
                                                        04 - APR
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="7">
                                                        05 - MAY
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="8">
                                                        06 - JUN
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="9">
                                                        07 - JUL
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="10">
                                                        08 - AUG
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="11">
                                                        09 - SEP
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="12">
                                                        10 - OCT
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="13">
                                                        11 - NOV
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="14">
                                                        12 - DEC
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="15"></Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Button onClick={clearFilters} variant="secondary">
                                                Clear
                                            </Button>
                                        </div>
                                        <div className="flex flex-col bg-neutral-200 p-1 mb-1 rounded">
                                            <div className=" w-[100%] mx-auto flex flex-col">
                                                <div className="flex flex-row justify-between items-center align-center">
                                                    <input
                                                        type={"date"}
                                                        className="block rounded-md min-w-[44%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder={"Start Date"}
                                                        value={dFrom}
                                                        onChange={(e) => {
                                                            // Check if dTo is before dFrom, update dTo if needed
        if (new Date(e.target.value) > new Date(dTo)) {
            setdTo(e.target.value);
        }
                                                            setdFrom(e.target.value);
                                                        }}
                                                    />
                                                    <div>To</div>
                                                    <input
                                                        type={"date"}
                                                        className="block rounded-md min-w-[44%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder={"End Date"}
                                                        value={dTo}
                                                        onChange={(e) => {
                                                            if (new Date(e.target.value) < new Date(dFrom)) {
                                                                setdFrom(e.target.value);
                                                            }
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
                                                        <div className="mx-2">Branch</div>
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
                                                <div className="w-[100%] flex flex-row ">
                                                    <div className="flex flex-col w-[50%] align-center">
                                                        <div className="mx-2">Item</div>
                                                        <div className="flex flex-row">
                                                            <Select
                                                                className="basic-single w-[90%] mx-auto"
                                                                classNamePrefix="select"
                                                                isSearchable={true}
                                                                isClearable={false}
                                                                name="color"
                                                                placeholder="Item"
                                                                options={itmOptions}
                                                                value={{
                                                                    value: sDisItem,
                                                                    label: sDisItem,
                                                                }}
                                                                onChange={(e) => {
                                                                    setsDisItem(e.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="justify-end flex flex-col">
                                                        <img
                                                            className="h-8 w-8 mb-1"
                                                            src="https://pssapi.net:444/media/xicon.png"
                                                            onClick={() => {
                                                                setsDisItem("");
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="flex flex-col bg-neutral-200 mt-1 p-1 rounded">
                                        <div className="flex flex-row w-[100%] justify-center px-2 py-1 align-middle">
                    <div className="w-[95%] max-w-[50rem] flex flex-row items-center align-middle justify-center">
                        <div className="font-semibold text-lg">Limit:</div>
                        <Select
                            className="basic-single w-[50%] mx-1"
                            classNamePrefix="select"
                            isSearchable={false}
                            isClearable={false}
                            name="color"
                            defaultValue={{ value: 100, label: 100 }}
                            value={{ value: vLimit, label: vLimit }}
                            options={[
                                { value: 100, label: 100 },
                                { value: 200, label: 200 },
                                { value: 400, label: 400 },
                                { value: 1000, label: 1000 },
                                { value: 2000, label: 2000 },
                                { value: "All", label: "All" },
                            ]}
                            onChange={(e) => {
                                setfLimit(e);
                                setvLimit(e.value);
                            }}
                        />
                    </div>
                
                                    </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className="flex flex-row whitespace-nowrap mt-3 items-center">
                        {/* <span className="underline  w-fit text-2xl">Statement:</span>{" "} */}
                        <span className="text-zinc-600 mx-2 no-underlines italic">{nof}</span>
                        
                        
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="underline  w-fit text-2xl">Items From Account:</span>{" "}
                        {/* <BranchSelect fData={fetchdata} page={Cpage} setActiveBranch={setActiveBranch} selected={bSelect} branches={props.branches} branchSearch={true}/> */}
                    </div>
                    <Table striped bordered className=" mt-2 ">
                        <thead>
                            <tr key={uuid()} className="bg-slate-500">
                                <th>Date</th>
                                <th>Type</th>
                                <th>No</th>
                                <th>Qty</th>
                                <th>UPrice</th>
                                <th>ItemName</th>
                                <th>BR</th>
                                <th>PQty</th>
                                <th>LN</th>
                                <th>ItemNo</th>
                                <th>UFob</th>
                                <th>PQUnit</th>
                                <th>Disc</th>
                                <th>Weight</th>
                                <th>Notes</th>
                                <th>Tax</th>
                                <th>Total</th>
                                <th>Disc100</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statement.map((state) => {
                                return (
                                    <tr
                                        key={uuid()}
                                        className="hover:bg-blue-200 whitespace-nowrap"
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
                                        <td>{state["ItemName"]}</td>
                                        <td>{state["Branch"]}</td>
                                        <td>{state["PQty"]}</td>
                                        <td>{state["LN"]}</td>
                                        <td>{state["ItemNo"]}</td>
                                        <td>{state["UFob"]}</td>
                                        <td>{state["PQUnit"]}</td>
                                        <td>{state["Disc"]}</td>
                                        <td>{state["Weight"]}</td>
                                        <td>{state["Notes"]}</td>
                                        <td>{state["Tax"]}</td>
                                        <td>{state["Total"]}</td>
                                        <td>{state["Disc100"]}</td>
                                        <td>{state["Time"]}</td>


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
    function filterStatement(flag) {
        let data = { dfrom: dFrom, dto: dTo, dtype: sType, db: sBranch, itm: sDisItem };
        
        axios({
            method: "POST",
            url: props.url + "/moh/Accounting/ItemsFromAccount/Filter/",
            data: {
                username: localStorage.getItem("compname"),
                data: data,
                id: props.id.trim(),
                limit:vLimit,
            },
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.data.Info == "authorized") {
                    setStatement(res.data.Statment);
                    if (flag==="Apply"){
                        closeFilter();
                    }
                } else {
                    window.location.href = "/";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
