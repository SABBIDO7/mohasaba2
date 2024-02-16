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
import FilterItem from "../components/Accounting/FilterItem";
import axios from "axios";

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
    const [tempSearch, setTempSearch] = useState("");

    //Filter Modal State
    const [showFilter, setShowFilter] = useState(false);
    const [jsonFilter, setJsonFilter] = useState({
        branch: false,
        list: false,
        vAny: "",
        vId: "",
        vName: "",
        vBalance: "",
        vTax: "",
        vAddress: "",
        vPhone: "",
        vSet: "",
        vCat: "",
        vCur: "",
        vAcc2: "",
        vFax: "",
        sAny: "start",
        sId: "start",
        sName: "start",
        sBalance: "start",
        sTax: "start",
        sAddress: "start",
        sPhone: "start",
        sSet: "start",
        sCat: "start",
        sCur: "start",
        sAcc2: "start",
        sFax: "start",
    });

   

  

    let token = cookies.token;

    useEffect(() => {
        axios.get(props.url+"/moh/"+cookies.token + "/Accounting/200/")
        .then((data)=>{
            
        })
    }, []);
   

   

    return (
        <>
            <div className="max-w-7xl  mb-5  m-auto flex flex-col justify-center items-center  ">
                <div
                    className="w-[15rem] m-1 mt-2 flex flex-row items-center align-middle bg-zinc-400 text-lg px-2 font-semibold rounded-full justify-between"
                    onClick={() => {
                        setShowFilter(true);
                    }}>
                    <div className="flex flex-row items-center align-middle">
                        <img src={FilterIcon} className="h-[1rem]" />
                        <div className="ml-2">Filters</div>
                    </div>
                    <div>
                        <img src={arrowIcon} className="h-[1rem] -rotate-90" />
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
                    
                       null
                )}
            </div>

            <FilterItem
                filter={jsonFilter}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                setJsonFilter={setJsonFilter}
            />
        </>
    );
}
