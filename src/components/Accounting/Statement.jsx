import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import uuid from "react-uuid";
import Spinner from "react-bootstrap/Spinner";
import DoubleStatement from "./DoubleStatement";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import Select from "react-select";
import FilterIcon from "../../media/FilterIcon.png";
import Dropdown from "react-bootstrap/Dropdown";
import Balance from "./Balance";

export default function Statement(props) {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [statement, setStatement] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [db, setdb] = useState(0);
  const [cr, setcr] = useState(0);
  const [tb, settb] = useState(0);
  const [modalData, setModalData] = useState({
    type: "",
    no: "",
  });

  //filter State
  const [dFrom, setdFrom] = useState("");
  const [dTo, setdTo] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [sType, setsType] = useState("Any");
  const [sBranch, setsBranch] = useState("Any");

  const [fLimit, setfLimit] = useState({ value: 100, label: 100 });
  const [vLimit, setvLimit] = useState(100);

  //Filters: Type and Branch
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);

    fetch(
      props.url +
        "/moh/" +
        localStorage.getItem("compname") +
        "/Accounting/Statement/" +
        props.oData["AccNo"].trim() +
        "/" +
        vLimit
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Info == "authorized") {
          setStatement(data.Statment);
          setLoading(false);
          setTypeOptions(data.disType);
          setBranchOptions(data.dbr);
          setdb(data.tdb);
          setcr(data.tcr);
          settb(data.tb);
        } else {
          // window.location.href = props.url;
        }
      })
      .catch((err) => {
        console.log(err);
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
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    if (e == "Today") {
      setdFrom(year + "-" + month + "-" + day);
      setdTo(year + "-" + month + "-" + day);
    } else if (e == "Yesterday") {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      // Get the year, month, and day components for yesterday
      const yYear = yesterday.getFullYear();
      const yMonth = (yesterday.getMonth() + 1).toString().padStart(2, "0");
      const yDay = yesterday.getDate().toString().padStart(2, "0");

      setdFrom(
        yYear.toString() + "-" + yMonth.toString() + "-" + yDay.toString()
      );
      setdTo(
        yYear.toString() + "-" + yMonth.toString() + "-" + yDay.toString()
      );
    } else {
      setdFrom(
        year.toString() + "-" + e.toString().split("-")[0].trim() + "-" + "01"
      );
      // if ()
      let lastdate = new Date(
        year,
        parseInt(e.toString().split("-")[0].trim()),
        0
      );

      setdTo(
        year +
          "-" +
          e.toString().split("-")[0].trim() +
          "-" +
          lastdate.getDate()
      );
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
      }}
    >
      {children}
      {/* &#x25bc; */}
      <img src={FilterIcon} className="h-[1.5rem]" alt="." />
    </a>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul
            className="list-unstyled"
            onClick={(e) => dateFilterHandler(e.target.text)}
          >
            {React.Children.toArray(children)}
          </ul>
        </div>
      );
    }
  );
  let nof = "";
  if (statement.length == 1) {
    nof = statement.length + "  r";
  } else {
    nof = statement.length + "  r";
  }

  return (
    <>
      {modalShow ? (
        <DoubleStatement
          url={props.url}
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={modalData}
          key={uuid()}
        />
      ) : null}

      {props.btype == "btn" ? (
        <Button
          key={uuid()}
          className="me-2 my-1"
          onClick={() => handleShow(true)}
        >
          {props.oData["AccNo"]}
        </Button>
      ) : (
        <tr
          key={uuid()}
          onDoubleClick={() => handleShow(true)}
          className=" hover:bg-secondd hover:text-BgTextColor whitespace-nowrap"
          style={{ userSelect: "none" }}
        >
          {props.children}
        </tr>
      )}

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header className="d-flex justify-content-start">
          <Modal.Header closeButton className="border-0"></Modal.Header>
          <Modal.Title className="pl-3">{props.oData["AccName"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h1 className='underline'>Info:</h1> */}

          <div className=" text-lg">
            <span className="font-semibold">ID </span>: {props.oData["AccNo"]}{" "}
            <div className="vr"></div>{" "}
            <span className="font-semibold">Balance </span>:{" "}
            {tb && tb.toFixed(3)} {props.oData["Cur"]}
            <div className="vr"></div>
            <span className="font-semibold ml-3">
              <Button onClick={() => filterStatement("refresh")}>
                Refresh
              </Button>
            </span>
            <span className="font-semibold ml-3">
              <Balance //hon
                oData={props.oData}
                token={props.token}
                url={props.url}
              />
            </span>
          </div>

          <div className="max-w-[30rem]">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header id="sfl" className="border-4">
                  Filters
                </Accordion.Header>
                <Accordion.Body className=" p-1">
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-around items-center my-2">
                      <Button onClick={() => filterStatement("Apply")}>
                        Apply
                      </Button>

                      <Dropdown>
                        <Dropdown.Toggle
                          as={CustomToggle}
                          id="dropdown-custom-components"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                          <Dropdown.Item eventKey="1">Today</Dropdown.Item>
                          <Dropdown.Item eventKey="2">Yesterday</Dropdown.Item>
                          <Dropdown.Item eventKey="3">01 - JAN</Dropdown.Item>
                          <Dropdown.Item eventKey="4">02 - FEB</Dropdown.Item>
                          <Dropdown.Item eventKey="5">03 - MAR</Dropdown.Item>
                          <Dropdown.Item eventKey="6">04 - APR</Dropdown.Item>
                          <Dropdown.Item eventKey="7">05 - MAY</Dropdown.Item>
                          <Dropdown.Item eventKey="8">06 - JUN</Dropdown.Item>
                          <Dropdown.Item eventKey="9">07 - JUL</Dropdown.Item>
                          <Dropdown.Item eventKey="10">08 - AUG</Dropdown.Item>
                          <Dropdown.Item eventKey="11">09 - SEP</Dropdown.Item>
                          <Dropdown.Item eventKey="12">10 - OCT</Dropdown.Item>
                          <Dropdown.Item eventKey="13">11 - NOV</Dropdown.Item>
                          <Dropdown.Item eventKey="14">12 - DEC</Dropdown.Item>
                          <Dropdown.Item eventKey="15"></Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Button onClick={clearFilters} variant="secondary">
                        Clear
                      </Button>
                    </div>
                    <div className="flex flex-col bg-fourth p-1 mb-1 rounded">
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
                    <div className="flex flex-col bg-fourth mt-1 p-1 rounded">
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
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col bg-fourth mt-1 p-1 rounded">
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
            <span className="text-zinc-600 mx-2 no-underlines italic">
              {nof}
            </span>
            <span className="text-zinc-600 mx-2 no-underlines italic">
              DB:{db && db.toFixed(3)}
            </span>
            <span className="text-zinc-600 mx-2 no-underlines italic">
              CR:{cr && cr.toFixed(3)}
            </span>
            <span className="text-zinc-600 mx-2 no-underlines italic">
              Bal:{tb && tb.toFixed(3)}
            </span>
          </div>
          {isLoading ? (
            <Spinner animation="border" role="status" disabled={true}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Table striped bordered className=" mt-2 ">
              <thead
                className="bg-secondd text-BgTextColor
"
              >
                <tr className="">
                  <th>Date</th>
                  <th>Type</th>
                  <th>No.</th>
                  <th>DB</th>
                  <th>CR</th>
                  <th>BR</th>
                  <th>Discription</th>
                  <th>Job</th>
                  <th>Bank</th>
                  <th>CHQ</th>
                  <th>CHQ2</th>
                  <th>OppAcc</th>
                  <th>LN</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {statement.map((state) => {
                  return (
                    <>
                      <tr
                        key={uuid()}
                        className="hover:bg-secondd hover:text-BgTextColor whitespace-nowrap"
                        onDoubleClick={() => {
                          if (
                            state["RefType"].slice(0, 2).toLowerCase() !=
                              "cr" &&
                            state["RefType"].slice(0, 2).toLowerCase() !=
                              "db" &&
                            state["RefType"].slice(0, 2).toLowerCase() !=
                              "jv" &&
                            state["RefType"].slice(0, 2).toLowerCase() != "ie"
                          ) {
                            setModalShow(true);
                            setModalData({
                              token: props.token,
                              type: state["RefType"],
                              no: state["RefNo"],
                              AccName: state["AccName"],
                              AccNo: state["AccNo"],
                            });
                          }
                        }}
                      >
                        <td>{state["Date"]}</td>
                        <td>{state["RefType"]}</td>
                        <td>{state["RefNo"]}</td>
                        <td className=" text-right">
                          {parseFloat(state["DB"]).toLocaleString()}
                        </td>
                        <td className=" text-right">
                          {parseFloat(state["CR"]).toLocaleString()}
                        </td>
                        <td className=" text-center">{state["Dep"]}</td>
                        <td className=" whitespace-nowrap">{state["Notes"]}</td>
                        <td>{state["job"]}</td>
                        <td>{state["Bank"]}</td>
                        <td>{state["CHQ"]}</td>
                        <td>{state["CHQ2"]}</td>
                        <td>{state["OppAcc"]}</td>
                        <td>{state["LNo"]}</td>
                        <td>{state["Time"]}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
  function closeFilter() {
    document.getElementById("sfl").firstChild.click();
  }
  function clearFilters() {
    setdFrom("");
    setdTo("");
    setsBranch("Any");
    setsType("Any");
    setvLimit(100);
  }
  function filterStatement(flag) {
    let data = { dfrom: dFrom, dto: dTo, dtype: sType, db: sBranch };

    axios({
      method: "POST",
      url: props.url + "/moh" + "/Accounting/Statement" + "/Filter/", //filter in accounting jouwa
      data: {
        username: localStorage.getItem("compname"),
        data: data,
        id: props.oData["AccNo"].trim(),
        limit: vLimit,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.data.Info == "authorized") {
          setStatement(res.data.Statment);
          setdb(res.data.tdb);
          setcr(res.data.tcr);
          settb(res.data.tb);
          if (flag === "Apply") {
            closeFilter();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
