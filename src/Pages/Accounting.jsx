import React, { useState, useEffect } from "react";
import AccountingInput from "../components/Accounting/AccountingInput";
import AccountingSelect from "../components/Accounting/AccountingSelect";
import Card from "react-bootstrap/Card";
import Statement from "../components/Accounting/Statement";
import uuid from "react-uuid";
import Balance from "../components/Accounting/Balance";
import Spinner from "react-bootstrap/Spinner";
import { useCookies } from "react-cookie";
import Button from "react-bootstrap/Button";
import backimage from "../media/d.png";
import { Table } from "react-bootstrap";
import BranchSelect from "../components/Stock/BranchSelect";
import Modal from "react-bootstrap/Modal";
import FilterIcon from "../media/FilterIcon.png";
import arrowIcon from "../media/arrowimg.png";
import AccFilter from "../components/Accounting/AccountingFilter";
import axios from "axios";
import ItemsOfAccount from "../components/Accounting/ItemsOfAccount";
import Summery from "../components/Accounting/Summery";


export default function Accounting(props) {
    const [vInput, setInput] = useState("");
    const [vSelect, setSelect] = useState({ id: 1, name: "Any" });
    const [vHisab, setHisab] = useState([]);
    const [hisabBranches, sethisabBranches] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [Simplified, setSimplified] = useState(false);
    const [cookies, setCookie] = useCookies(["token"]);
    const [bSelect, setActiveBranch] = useState(["Any"]);
    const [branchSearch, setBranchSearch] = useState(false);
    const [vBranches, setBranches] = useState(["Any"]);
    const [tempSearch, setTempSearch] = useState();
    const [limit, setLimit] = useState(100);

    //Filter Modal State
    const [showFilter, setShowFilter] = useState(false);
    const [jsonFilter, setJsonFilter] = useState({
        branch: false,
        selectedBranch: "Any",
        vAny: "",
        vId: "",
        vName: "",
        vBalance: "0",
        vTax: "",
        vAddress: "",
        vPhone: "",
        vSet: "",
        vCat: "",
        vCur: "",
        vAcc2: "",
        vFax: "",
        sAny: "Contains",
        sId: "Start",
        sName: "Contains",
        sBalance: ">",
        sTax: "Contains",
        sAddress: "Contains",
        sPhone: "Contains",
        sSet: "=",
        sCat: "=",
        sCur: "Start",
        sAcc2: "Contains",
        sFax: "Contains",
    });

    function dataHandler(his, branch, hisbra) {
        setHisab(his);
        if (branch !== vBranches) setBranches(branch);
        if (hisabBranches !== hisbra) sethisabBranches(hisbra);
    }

    function fake(e, f) {
        let k = "here";
    }

    let token = cookies.token;

    const move = (e) => {
        console.log(e);
    };

    useEffect(() => {
        let compname=localStorage.getItem("compname")
        fetch(props.url + "/moh/" + compname + "/Accounting/100/")
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Info == "authorized") {
                    dataHandler(data["hisab"], data["branches"], data["hisabBranches"]);
                    setLoading(false);
                } else {
                   // window.location.href = props.url;
                }
            })
            .catch((err) => {
                // window.location.href = "http://80.81.158.76:9010/"
            });
    }, []);

    function InputHandler(e) {
        setInput(e);
    }
    function SelectHandler(e) {
        setSelect(e);
        if (e["name"] == ">" || e["name"] == "<" || e["name"] == "=" || e["name"] == "<>") {
            InputHandler("0");
            setTempSearch("0");
        } else {
            InputHandler("");
            setTempSearch("");
        }
    }
    function brachFilterHandler(b) {
        if (branchSearch != b) {
            setBranchSearch(b);
        }
    }

    return (
        <>
            <div className="max-w-7xl  mb-5  m-auto flex flex-col justify-center items-center  ">
                <div className="w-full max-w-xl flex flex-row mt-2 items-center justify-start ">
                    <div
                        className=" m-1  flex flex-row items-center align-middle bg-zinc-400 text-lg px-2 py-1 font-semibold rounded-full justify-between"
                        onClick={() => {
                            setShowFilter(true);
                        }}>
                        <div className="flex flex-row items-center align-middle">
                            <img src={FilterIcon} className="h-[1rem]" alt="." />
                            <div className="mx-2">Filters</div>
                        </div>
                        <div>
                            <img src={arrowIcon} className="h-[1rem] -rotate-90" alt="." />
                        </div>
                    </div>
                    <div>
                        {!Simplified ? (
                            <Button
                                key={uuid()}
                                active={true}
                                variant="primary"
                                onClick={() => {
                                    setSimplified(true);
                                }}>
                                List
                            </Button>
                        ) : (
                            <Button
                                key={uuid()}
                                variant="outline-primary"
                                onClick={() => {
                                    setSimplified(false);
                                }}>
                                <img src={backimage} className=" w-6" alt="." />
                            </Button>
                        )}
                    </div>
                </div>

                {isLoading ? (
                    <Spinner
                        className=" absolute top-72"
                        animation="border"
                        role="status"
                        disabled={true}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <>
                        {!Simplified ? (
                            <div className="m-2 mt-1 x rounded-xl max-h-[80vh] overflow-y-scroll min-w-[330px]">
                            {vHisab ? (
                                <>
                                    <Card
                                                key={uuid()}
                                                className=" text-center mb-3 box-sh shadow-xl">
                                                <Card.Header>
                                                    <div className="flex justify-between items-center flex-wrap">
                                                        <Statement
                                                            oData={{'key': 0, 'AccNo': 'ALLDATA', 'AccName': '', 'Cur': '', 'Balance': 0.0, 'set': '', 'category': '', 'Price': '', 'Contact': '', 'TaxNo': '', 'Address': '', 'tel': '', 'Mobile': '', 'AccName2': '', 'Fax': ''}}
                                                            url={props.url}
                                                            token={cookies.token}
                                                            btype={"btn"}
                                                        />
                                                        <ItemsOfAccount
                                                            name={"ALLDATA"}
                                                            id={"ALLDATA"}
                                                            token={props.token}
                                                            url={props.url}
                                                        />
                                                        <Balance //hon
                                                            oData={{'key': 0, 'AccNo': 'ALLDATA', 'AccName': '', 'Cur': '', 'Balance': 0.0, 'set': '', 'category': '', 'Price': '', 'Contact': '', 'TaxNo': '', 'Address': '', 'tel': '', 'Mobile': '', 'AccName2': '', 'Fax': ''}}
                                                            token={props.token}
                                                            url={props.url}
                                                        />
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Title>{"ALLDATA"}</Card.Title>
                                                    {/* <Card.Text> */}
                                                    <div className="border-b-2">
                                                        <div className="font-semibold text-gray-500">
                                                            {''}
                                                        </div>
                                                        <span className="font-semibold">
                                                            Address{" "}
                                                        </span>
                                                        : {''}
                                                    </div>
                                                    <div className="border-b-2">
                                                     
                        
                                                        <span className="font-semibold">
                                                            {" "}
                                                            Set{" "}
                                                        </span>
                                                        : {""} |
                                                        <span className="font-semibold">
                                                            {" "}
                                                            Cat.{" "}
                                                        </span>
                                                        : {""} | {""}
                                                        
                                                    </div>
                                                    <div className="border-b-2">
                                                    <span>
                                                        {"" + " / "} {"" + " / "}{" "}
                                                        {"" + " "}{" "}
                                                    </span>
                                                    </div>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                    <Summery sinfo={{'key': 0, 'AccNo': 'ALLDATA', 'AccName': '', 'Cur': '', 'Balance': 0.0, 'set': '', 'category': '', 'Price': '', 'Contact': '', 'TaxNo': '', 'Address': '', 'tel': '', 'Mobile': '', 'AccName2': '', 'Fax': ''}} token={props.token} url={props.url}/></div>
                                                    {/* </Card.Text> */}
                                                
                                                  
                                                   
                                              
                                                </Card.Body>
                                                <Card.Footer className="text-muted">
                                                    <div className="flex justify-between">
                                                        <span>Contact: {""}</span>
                                                        <div className="vr"></div>
                                                        <span>
                                                            TaxNo:{" "}
                                                            <span className="text-gray-500 pr-3">
                                                                {""}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </Card.Footer>
                                            </Card>
                        
                                    {vHisab.map((cl) => {
                                        return (
                                            <Card
                                                key={uuid()}
                                                className=" text-center mb-3 box-sh shadow-xl">
                                                <Card.Header>
                                                    <div className="flex justify-between items-center flex-wrap">
                                                        <Statement
                                                            oData={cl}
                                                            url={props.url}
                                                            token={cookies.token}
                                                            btype={"btn"}
                                                        />
                                                        <ItemsOfAccount
                                                            name={cl["AccName"]}
                                                            id={cl["AccNo"]}
                                                            token={props.token}
                                                            url={props.url}
                                                        />
                                                        <Balance //hon
                                                            oData={cl}
                                                            token={props.token}
                                                            url={props.url}
                                                        />
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Title>{cl["AccName"]}</Card.Title>
                                                    {/* <Card.Text> */}
                                                    <div className="border-b-2">
                                                        <div className="font-semibold text-gray-500">
                                                            {cl["AccName2"]}
                                                        </div>
                                                        <span className="font-semibold">
                                                            Address{" "}
                                                        </span>
                                                        : {cl["Address"]}
                                                    </div>
                                                    <div className="border-b-2">
                                                        {branchSearch && (
                                                            <>
                                                                <span className="font-semibold">
                                                                    {" "}
                                                                    Br{" "}
                                                                </span>
                                                                : {cl["Branch"]} |
                                                            </>
                                                        )}
                        <div className="border-b-2">
                                                        <span className="font-semibold">
                                                            {" "}
                                                            Set{" "}
                                                        </span>
                                                        : {cl["set"]} |
                                                        <span className="font-semibold">
                                                            {" "}
                                                            Cat.{" "}
                                                        </span>
                                                        : {cl["category"]} | {cl["Price"]}
                                                    </div>
                                                    <span>
                                                        {cl["tel"] + " / "} {cl["Mobile"] + " / "}{" "}
                                                        {cl["Fax"] + " "}{" "}
                                                    </span>
                                                    </div>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                    <Summery sinfo={cl} token={props.token} url={props.url}/></div>
                      
                                                    {/* </Card.Text> */}
                                                </Card.Body>
                                                <Card.Footer className="text-muted">
                                                    <div className="flex justify-between">
                                                        <span>Contact: {cl["Contact"]}</span>
                                                        <div className="vr"></div>
                                                        <span>
                                                            TaxNo:{" "}
                                                            <span className="text-gray-500 pr-3">
                                                                {cl["TaxNo"]}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </Card.Footer>
                                            </Card>
                                        );
                                    })
                                }
                                </>
                            ) : null}
                        </div>
                        ) : (
                            <div className="m-2 bg-red w-[95%] flex justify-center">
                                {!branchSearch ? (
                                    <div className="m-2 rounded-xl max-h-[80vh] overflow-y-scroll w-full max-w-[50rem] bg-white">
                                        <Table striped bordered>
                                            <thead>
                                                <tr
                                                    key={uuid()}
                                                    className=" whitespace-nowrap bg-slate-500">
                                                    <th>Balance</th>
                                                    <th>Cur</th>
                                                    <th>AccName</th>
                                                    <th>AccNo</th>
                                                    <th>AccName2</th>
                                                    <th>Address</th>
                                                    <th>Contact</th>
                                                    <th>Fax</th>
                                                    <th>Mobile</th>
                                                    <th>Price</th>
                                                    <th>TaxNo</th>
                                                    <th>category</th>
                                                    <th>set</th>
                                                    <th>tel</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {vHisab

                                                

                                               
                                                    ? (
                                                        
                                                        <>
                                                         <Statement
                                                                  oData={{'key': 0, 'AccNo': 'ALLDATA', 'AccName': '', 'Cur': '', 'Balance': 0.0, 'set': '', 'category': '', 'Price': '', 'Contact': '', 'TaxNo': '', 'Address': '', 'tel': '', 'Mobile': '', 'AccName2': '', 'Fax': ''}}
                                                                  url={props.url}
                                                                  token={cookies.token}
                                                                  btype={"tr"}>
                                                                  <td className="text-right">
                                                                      {parseFloat("0").toFixed(2)}
                                                                  </td>
                                                                  <td>{""}</td>
                                                                  <td>{""}</td>
                                                                  <td>{"ALLDATA"}</td>
                                                                  <td>{""}</td>
                                                                  <td>{""}</td>
                                                                  <td>{""}</td>
                                                                  <td>{""}</td>
                                                                  <td>{""}</td>
                                                                  <td>{""}</td>
                                                                  <td>{""}</td>
                                                                  <td>{""}</td>
                                                                  <td>{""}</td>
                                                                  <td>{""}</td>
                                                              </Statement>
                                                        {vHisab.map((cl) => {
                                                            

                                                          return (
                                                              <Statement
                                                                  oData={cl}
                                                                  url={props.url}
                                                                  token={cookies.token}
                                                                  btype={"tr"}>
                                                                  <td className="text-right">
                                                                      {parseFloat(cl["Balance"]).toFixed(2)}
                                                                  </td>
                                                                  <td>{cl["Cur"]}</td>
                                                                  <td>{cl["AccName"]}</td>
                                                                  <td>{cl["AccNo"]}</td>
                                                                  <td>{cl["AccName2"]}</td>
                                                                  <td>{cl["Address"]}</td>
                                                                  <td>{cl["Contact"]}</td>
                                                                  <td>{cl["Fax"]}</td>
                                                                  <td>{cl["Mobile"]}</td>
                                                                  <td>{cl["Price"]}</td>
                                                                  <td>{cl["TaxNo"]}</td>
                                                                  <td>{cl["category"]}</td>
                                                                  <td>{cl["set"]}</td>
                                                                  <td>{cl["tel"]}</td>
                                                              </Statement>
                                                          );
                                                      })}
                                                    </>
                                                      
                                                      
                                                    )
                                                     
                                                    : null
                                                    }

                                                 
                                            </tbody>
                                        </Table>
                                    </div>
                                ) : (
                                    <div className="m-2 rounded-xl max-h-[80vh] overflow-y-scroll w-full max-w-[50rem] bg-white">
                                        <Table striped bordered>
                                            <thead>
                                                <tr
                                                    key={uuid()}
                                                    className=" whitespace-nowrap bg-slate-500">
                                                    <th>AccNo</th>
                                                    <th>Branch</th>
                                                    <th>Balance</th>
                                                    <th>Cur</th>
                                                    <th>AccName</th>
                                                    <th>tel</th>
                                                    <th>Address</th>
                                                    <th>Fax</th>
                                                    <th>Mobile</th>
                                                    <th>Contact</th>
                                                    <th>set</th>
                                                    <th>category</th>
                                                    <th>Price</th>
                                                    <th>TaxNo</th>
                                                    <th>AccName2</th>
                                                    <th>DB</th>
                                                    <th>CR</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {hisabBranches.map((cl) => {
                                                    return (
                                                        <Statement
                                                            oData={cl}
                                                            url={props.url}
                                                            token={props.token}
                                                            btype={"tr"}>
                                                            <td>{cl["AccNo"]}</td>
                                                            <td>{cl["Branch"]}</td>
                                                  <td>{parseFloat(cl["Balance"]).toFixed(2)}</td>
                                                            <td>{cl["Cur"]}</td>
                                                            <td>{cl["AccName"]}</td>
                                                            <td>{cl["tel"]}</td>
                                                            <td>{cl["Address"]}</td>
                                                            <td>{cl["Fax"]}</td>
                                                            <td>{cl["Mobile"]}</td>
                                                            <td>{cl["Contact"]}</td>
                                                            <td>{cl["set"]}</td>
                                                            <td>{cl["category"]}</td>
                                                            <td>{cl["Price"]}</td>
                                                            <td>{cl["TaxNo"]}</td>
                                                            <td>{cl["AccName2"]}</td>
                                                            <td>{cl["DB"]}</td>
                                                            <td>{cl["CR"]}</td>
                                                        </Statement>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            <AccFilter
                filter={jsonFilter}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                getData={getData}
                vBranches={vBranches}
            />
        </>
    );
    function getData(e, filters, limit) { //will be called from AccountingFilter
        setJsonFilter(e);
        setBranchSearch(e.branch);
        let data = {
            token: props.token,
            data: e,
            filters: filters,
        };
        console.log(data);

        axios({
            method: "POST",
            url: props.url + "/accounting/filter/" + limit + "/",
            data: {
                username: localStorage.getItem("compname"),
                data: data,
            },
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.data.Info == "authorized") {
                    setHisab(res.data.hisab);
                    sethisabBranches(res.data.hisabBranches);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setShowFilter(false);
    }
}
