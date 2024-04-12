import Select from "react-select";
import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FilterIcon from "../../media/FilterIcon.png";
import Form from "react-bootstrap/Form";
import backimg from "../../media/d.png";
import resetimg from "../../media/R.png";

export default function FilterItem(props) {
  const filtersOptions = [
    { value: "Start", label: "Start" },
    { value: "Contains", label: "Contains" },
    { value: "Not Equal", label: "Not Equal" },
    { value: "=", label: "=" },
    { value: ">", label: ">" },
    { value: "<", label: "<" },
    { value: "<=", label: "<=" },
    { value: ">=", label: ">=" },
  ];

  const [bBranch, setbBranch] = useState(props.filter.branch);
  const [sBranch, setsBranch] = useState(props.filter.selectedBranch);

  const [vAny, setvAny] = useState(props.filter.vAny);
  const [vId, setvId] = useState(props.filter.vId);
  const [vName, setvName] = useState(props.filter.vName);
  const [vBalance, setvBalance] = useState(props.filter.vBalance);
  const [vTax, setvTax] = useState(props.filter.vTax);
  const [vAddress, setvAddress] = useState(props.filter.vAddress);
  const [vPhone, setvPhone] = useState(props.filter.vPhone);
  const [vSet, setvSet] = useState(props.filter.vSet);
  const [vCat, setvCat] = useState(props.filter.vCat);
  const [vCur, setvCur] = useState(props.filter.vCur);
  const [vAcc2, setvAcc2] = useState(props.filter.vAcc2);
  const [vFax, setvFax] = useState(props.filter.vFax); //input value
  const [sAny, setsAny] = useState(props.filter.sAny);
  const [sId, setsId] = useState(props.filter.sId);
  const [sName, setsName] = useState(props.filter.sName);
  const [sBalance, setsBalance] = useState(props.filter.sBalance);
  const [sTax, setsTax] = useState(props.filter.sTax); //select value
  const [sAddress, setsAddress] = useState(props.filter.sAddress);
  const [sPhone, setsPhone] = useState(props.filter.sPhone);
  const [sSet, setsSet] = useState(props.filter.sSet);
  const [sCat, setsCat] = useState(props.filter.sCat);
  const [sCur, setsCur] = useState(props.filter.sCur);
  const [sAcc2, setsAcc2] = useState(props.filter.sAcc2);
  const [sFax, setsFax] = useState(props.filter.sFax);

  const [fLimit, setfLimit] = useState({ value: 100, label: 100 });
  const [vLimit, setvLimit] = useState(100);

  const filterItems = [
    {
      pl: "Any",
      vVar: vAny,
      sVar: sAny,
      vFun: setvAny,
      sFun: setsAny,
      FOStart: 0,
      FOEnd: 6,
      dv: "Contains",
    },
    {
      pl: "Acc Number",
      vVar: vId,
      sVar: sId,
      vFun: setvId,
      sFun: setsId,
      FOStart: 0,
      FOEnd: 4, //bas byekhod awal 4 men l filteroptions
      dv: "Start",
    },
    {
      pl: "Name ",
      vVar: vName,
      sVar: sName,
      vFun: setvName,
      sFun: setsName,
      FOStart: 0,
      FOEnd: 3,
      dv: "Contains",
    },
    {
      pl: "Balance",
      vVar: vBalance,
      sVar: sBalance,
      vFun: setvBalance,
      sFun: setsBalance,
      FOStart: 2,
      FOEnd: 8,
      dv: ">",
    },
    {
      pl: "Tax Number",
      vVar: vTax,
      sVar: sTax,
      vFun: setvTax,
      sFun: setsTax,
      FOStart: 0,
      FOEnd: 4,
      dv: "Contains",
    },
    {
      pl: "Address",
      vVar: vAddress,
      sVar: sAddress,
      vFun: setvAddress,
      sFun: setsAddress,
      FOStart: 0,
      FOEnd: 4,
      dv: "Contains",
    },
    {
      pl: "Phone",
      vVar: vPhone,
      sVar: sPhone,
      vFun: setvPhone,
      sFun: setsPhone,
      FOStart: 0,
      FOEnd: 4,
      dv: "Contains",
    },
    {
      pl: "Set",
      vVar: vSet,
      sVar: sSet,
      vFun: setvSet,
      sFun: setsSet,
      FOStart: 0,
      FOEnd: 4,
      dv: "=",
    },
    {
      pl: "Category",
      vVar: vCat,
      sVar: sCat,
      vFun: setvCat,
      sFun: setsCat,
      FOStart: 0,
      FOEnd: 4,
      dv: "=",
    },
    {
      pl: "Currency",
      vVar: vCur,
      sVar: sCur,
      vFun: setvCur,
      sFun: setsCur,
      FOStart: 0,
      FOEnd: 4,
      dv: "Start",
    },
    {
      pl: "AccName2",
      vVar: vAcc2,
      sVar: sAcc2,
      vFun: setvAcc2,
      sFun: setsAcc2,
      FOStart: 0,
      FOEnd: 4,
      dv: "Contains",
    },
    {
      pl: "Fax",
      vVar: vFax,
      sVar: sFax,
      vFun: setvFax,
      sFun: setsFax,
      FOStart: 0,
      FOEnd: 4,
      dv: "Contains",
    },
  ];

  function clearFilters() {
    setbBranch(false);
    setsBranch("Any");
    setvAny("");
    setvId("");
    setvName("");
    setvBalance("");
    setvTax("");
    setvAddress("");
    setvPhone("");
    setvSet("");
    setvCat("");
    setvCur("");
    setvAcc2("");
    setvFax("");
    setsAny("Contains");
    setsId("Start");
    setsName("Contains");
    setsBalance(">");
    setsTax("Contains");
    setsAddress("Contains");
    setsPhone("Contains");
    setsSet("=");
    setsCat("=");
    setsCur("Start");
    setsAcc2("Contains");
    setsFax("Contains");
    setvLimit(100);
  }
  function bBranchHandler() {
    setbBranch(!bBranch);
  }

  return (
    <Modal
      show={props.showFilter}
      onHide={() => props.setShowFilter(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      fullscreen
    >
      <Modal.Header>
        <Modal.Title id="example-custom-modal-styling-title">
          <div className="flex flex-row items-center">
            <img src={FilterIcon} className="h-[1rem]" alt="." />
            <div className="ml-1">Accounting Filters</div>
          </div>
        </Modal.Title>
        <Button id="done-btn" className="mx-2" onClick={setFilters}>
          Search
        </Button>
        <img
          src={backimg}
          className="h-[2rem]"
          onClick={() => {
            props.setShowFilter(false);
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <div className=" bg-fourth rounded-2xl w-[100%] h-[85vh] overflow-y-scroll flex flex-col max-w-xl mx-auto">
          <div className=" border-b-2 p-2 flex flex-row justify-between max-h-[3.7rem]">
            <Button
              onClick={(e) => {
                bBranchHandler();
              }}
              variant={bBranch ? "outline-primary" : "primary"}
              className="mx-2 select-none"
            >
              Branch
            </Button>

            {bBranch ? (
              <>
                <div className="flex flex-row w-[100%] justify-center  align-middle">
                  <div className="w-[88%] max-w-[50rem] flex flex-row">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => {
                        setsBranch(e.target.value);
                      }}
                      defaultValue={sBranch}
                    >
                      {props.vBranches.map((br) => {
                        return (
                          <option value={br["key"]}>
                            {br["key"]}
                            {br["split"]}
                            {br["val"]}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </div>
                </div>
              </>
            ) : null}
            <Button
              onClick={() => {
                clearFilters();
              }}
              variant="light"
              className="mx-2 select-none "
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-col w-[100%]">
            <div className="flex flex-row w-[100%] justify-center px-2 py-1 align-middle">
              <div className="w-[95%] max-w-[50rem] flex flex-row items-center align-middle justify-center">
                <div className=" font-semibold text-lg">Limit:</div>
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

            {filterItems.map((fi) => {
              return (
                <>
                  <div className="flex flex-row w-[100%] justify-center px-2 py-1 align-middle">
                    <div className="w-[95%] max-w-[50rem] flex flex-row items-center">
                      <Select
                        className="basic-single w-[50%] mx-1"
                        classNamePrefix="select"
                        isSearchable={false}
                        isClearable={false}
                        name="color"
                        value={{ value: fi["sVar"], label: fi["sVar"] }}
                        defaultValue={{
                          value: fi["sVar"],
                          label: fi["sVar"],
                        }}
                        options={filtersOptions.slice(
                          fi["FOStart"],
                          fi["FOEnd"]
                        )}
                        onChange={(e) => {
                          fi.sFun(e.value);
                        }}
                      />
                      <input
                        type={"text"}
                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={fi.pl}
                        value={fi.vVar}
                        onChange={(e) => {
                          fi.vFun(e.target.value);
                        }}
                      />
                      <img
                        src={resetimg}
                        className="ml-2 h-[1rem]"
                        onClick={() => {
                          fi.vFun("");
                          fi.sFun(fi.dv);
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
  function setFilters() {
    let ffilters = [
      {
        name: "AccNo",
        value: vId,
        type: sId,
      },
      {
        name: "AccName",
        value: vName,
        type: sName,
      },
      {
        name: "Cur",
        value: vCur,
        type: sCur,
      },

      {
        name: "SETA",
        value: vSet,
        type: sSet,
      },
      {
        name: "Category",
        value: vCat,
        type: sCat,
      },
      {
        name: "TaxNo",
        value: vTax,
        type: sTax,
      },
      {
        name: "Address",
        value: vAddress,
        type: sAddress,
      },
      {
        name: "Tel",
        value: vPhone,
        type: sPhone,
      },
      {
        name: "AccName2",
        value: vAcc2,
        type: sAcc2,
      },
      {
        name: "Fax",
        value: vFax,
        type: sFax,
      },
      {
        name: "Balance",
        value: vBalance,
        type: sBalance,
      },
    ];
    props.getData(
      {
        branch: bBranch,
        selectedBranch: sBranch,
        vAny: vAny,
        vId: vId,
        vName: vName,
        vBalance: vBalance,
        vTax: vTax,
        vAddress: vAddress,
        vPhone: vPhone,
        vSet: vSet,
        vCat: vCat,
        vCur: vCur,
        vAcc2: vAcc2,
        vFax: vFax,
        sAny: sAny,
        sId: sId,
        sName: sName,
        sBalance: sBalance,
        sTax: sTax,
        sAddress: sAddress,
        sPhone: sPhone,
        sSet: sSet,
        sCat: sCat,
        sCur: sCur,
        sAcc2: sAcc2,
        sFax: sFax,
      },
      ffilters,
      vLimit
    );
  }
}
