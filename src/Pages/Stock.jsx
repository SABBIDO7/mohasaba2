import React, { useState, useEffect } from "react";
import StockInput from "../components/Stock/StockInput";
import StockSelect from "../components/Stock/StockSelect";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Statement from "../components/Stock/ItemStatement";
import Info from "../components/Stock/Info";
import Dropdown from "react-bootstrap/Dropdown";
import Quantity from "../components/Stock/Quantity";
import Form from "react-bootstrap/Form";
import BranchSelect from "../components/Stock/BranchSelect";
import Spinner from "react-bootstrap/Spinner";
import uuid from "react-uuid";
import Summery from "../components/Stock/Summery";
import backimage from "../media/d.png";
import { Table } from "react-bootstrap";
import SimplifiedStatment from "../components/Stock/SimplifiedStatment";
import { useCookies } from "react-cookie";
import StockFilter from "../components/Stock/StockFilter";
import axios from "axios";
import FilterIcon from "../media/FilterIcon.png";
import arrowIcon from "../media/arrowimg.png";

export default function Stock(props) {
  const [vInput, setInput] = useState("");
  const [vSelect, setSelect] = useState({ id: 1, name: "Any" });
  const [bSelect, setActiveBranch] = useState(["Any"]);
  const [vStock, setStock] = useState([]);
  const [branchStock, setBranchstock] = useState([]);
  const [vBranches, setBranches] = useState(["Any"]);
  const [limit, setLimit] = useState(100);
  const [branchSearch, setBranchSearch] = useState(false);
  const [showBranch, setshowBranch] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [Simplified, setSimplified] = useState(false);
  const [show, setShow] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const [tempSearch, settempSearch] = useState("");

  //Filter Modal State
  const [showFilter, setShowFilter] = useState(false);
  const [jsonFilter, setJsonFilter] = useState({
    branch: false,
    selectedBranch: "Any",

    vAny: "",
    vItemNumber: "",
    vName: "",
    vQuantity: "0",
    vOriginalNumber: "",
    vSet: "",
    vCat: "",
    vUnit: "",
    vBrand: "",
    vOrigin: "",
    vSuplier: "",
    vSize: "",
    vColor: "",
    vFamily: "",
    vGroup: "",

    sAny: "Contains",
    sItemNumber: "Start",
    sName: "Contains",
    sQuantity: "Not Equal",
    sOriginalNumber: "Start",
    sSet: "=",
    sCat: "=",
    sUnit: "=",
    sBrand: "=",
    sOrigin: "=",
    sSuplier: "=",
    sSize: "=",
    sColor: "=",
    sFamily: "=",
    sGroup: "=",
  });
  const { t } = props; // Get t from props

  function dataHandler(Stck) {
    if (Stck != vStock) {
      setStock(Stck);
    }
  }
  function branchHandler(brnch) {
    if (brnch != vBranches) {
      setBranches(brnch);
    }
  }
  function brachFilterHandler(b) {
    if (branchSearch != b) {
      setBranchSearch(b);
    }
  }
  function showBranchHandler(b) {
    setshowBranch(b);
  }
  function baranchStockHandler(b) {
    if (b != branchStock) {
      setBranchstock(b);
    }
  }
  let token = cookies.token;

  useEffect(() => {
    let compname = localStorage.getItem("compname");
    fetch(props.url + "/moh/" + compname + "/Stock/100/") //honn
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Info == "authorized") {
          dataHandler(data["stock"]);
          baranchStockHandler(data["branchStock"]);

          branchHandler(data["branches"]); //honb
          setLoading(false);
        } else {
          window.location.href = props.url;
        }
      })
      .catch((err) => {
        window.location.href = props.url;
      });
  }, []);
  let flist = [];
  function InputHandler(e) {
    setInput(e);
  }
  function SelectHandler(e) {
    setSelect(e);

    if (
      e["name"] == "<" ||
      e["name"] == ">" ||
      e["name"] == "=" ||
      e["name"] == "<>"
    ) {
      if (!showBranch) {
        showBranchHandler(true);
      }
      InputHandler("0");
      settempSearch("0");
    } else {
      if (showBranch) {
        showBranchHandler(false);
        brachFilterHandler(false);
      }
      InputHandler("");
      settempSearch("");
    }
  }
  if (!branchSearch && bSelect != "Any") {
    setActiveBranch("Any");
  }
  function fake(e, f) {
    let k = "here";
  }

  return (
    <>
      <div className="max-w-7xl  mb-5  m-auto flex flex-col justify-center items-center  ">
        <div className="w-full max-w-xl flex flex-row mt-2 items-center justify-start ">
          <div
            className=" m-1  flex flex-row items-center align-middle bg-zinc-400 text-lg px-2 py-1 font-semibold rounded-full justify-between"
            onClick={() => {
              setShowFilter(true);
            }}
          >
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
                }}
              >
                {t("List")}
              </Button>
            ) : (
              <Button
                key={uuid()}
                variant="outline-primary"
                onClick={() => {
                  setSimplified(false);
                }}
              >
                <img src={backimage} className=" w-6" alt="." />
              </Button>
            )}
          </div>
          <div></div>
        </div>
        {isLoading ? (
          <Spinner
            className=" absolute top-72"
            animation="border"
            role="status"
            disabled={true}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <div className=" w-full flex justify-center">
            {!Simplified ? (
              //this is the card view
              <div className="m-2 rounded-xl max-h-[80vh] overflow-y-scroll w-full max-w-[50rem]">
                <Card
                  key={uuid()}
                  className=" text-center mb-3 box-sh shadow-xl"
                >
                  <Card.Header>
                    <div className="flex justify-between items-center flex-wrap">
                      <div className="flex flex-col justify-between items-center flex-wrap">
                        <Statement
                          oData={{
                            key: 0,
                            ItemNo: "ALLDATA",
                            ItemName: "",
                            ItemName2: "",
                            MainNo: "",
                            SetG: "",
                            Category: "",
                            Unit: "",
                            Brand: "",
                            Origin: "",
                            Supplier: "",
                            Sizeg: "",
                            Color: "",
                            Family: "",
                            Groupg: "",
                            Tax: "",
                            SPrice1: "",
                            SPrice2: "",
                            SPrice3: "",
                            Disc1: "",
                            Disc2: "",
                            Disc3: "",
                            CostPrice: "",
                            FobCost: "",
                            AvPrice: "",
                            BPUnit: "",
                            PQty: "",
                            PUnit: "",
                            PQUnit: "",
                            SPUnit: "",
                            Qty: 0,
                            branch: [("ALLDATA", "", "", 0.0)],
                          }}
                          token={props.token}
                          fil={bSelect}
                          branches={vBranches}
                          url={props.url}
                        />
                      </div>
                      <Quantity
                        url={props.url}
                        oData={{
                          key: 0,
                          ItemNo: "ALLDATA",
                          ItemName: "",
                          ItemName2: "",
                          MainNo: "",
                          SetG: "",
                          Category: "",
                          Unit: "",
                          Brand: "",
                          Origin: "",
                          Supplier: "",
                          Sizeg: "",
                          Color: "",
                          Family: "",
                          Groupg: "",
                          Tax: "",
                          SPrice1: "",
                          SPrice2: "",
                          SPrice3: "",
                          Disc1: "",
                          Disc2: "",
                          Disc3: "",
                          CostPrice: "",
                          FobCost: "",
                          AvPrice: "",
                          BPUnit: "",
                          PQty: "",
                          PUnit: "",
                          PQUnit: "",
                          SPUnit: "",
                          Qty: 0,
                          branch: [("ALLDATA", "", "", 0.0)],
                        }}
                        token={props.token}
                        format={"btn"}
                        t={t}
                      >
                        {""}
                      </Quantity>
                    </div>
                  </Card.Header>
                  <Card.Body className="py-1">
                    {/* <Card.Text> */}
                    <div className="border-b-2 flex items-start">
                      <p className="font-semibold m-0 text-gray-500"> {""} </p>
                    </div>
                    <div className="border-b-2">
                      <h2 className="font-semibold"> {""} </h2>
                    </div>
                    <div className="border-b-2">
                      <h6 className=""> {""} </h6>
                    </div>
                    <div className="flex border-b-2 flex-row justify-between">
                      <div className=" w-[33%]">
                        <div>Set</div>
                        <div>{""}</div>
                      </div>
                      <div className=" w-[33%]">
                        <div>Category</div>
                        <div> {""}</div>
                      </div>
                      <div className=" w-[33%]">
                        <div>Brand</div>
                        <div>{""}</div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center w-[100%] m-auto">
                      <Info
                        sinfo={{
                          key: 0,
                          ItemNo: "ALLDATA",
                          ItemName: "",
                          ItemName2: "",
                          MainNo: "",
                          SetG: "",
                          Category: "",
                          Unit: "",
                          Brand: "",
                          Origin: "",
                          Supplier: "",
                          Sizeg: "",
                          Color: "",
                          Family: "",
                          Groupg: "",
                          Tax: "",
                          SPrice1: "",
                          SPrice2: "",
                          SPrice3: "",
                          Disc1: "",
                          Disc2: "",
                          Disc3: "",
                          CostPrice: "",
                          FobCost: "",
                          AvPrice: "",
                          BPUnit: "",
                          PQty: "",
                          PUnit: "",
                          PQUnit: "",
                          SPUnit: "",
                          Qty: 0,
                          branch: [("ALLDATA", "", "", 0.0)],
                        }}
                        url={props.url}
                        t={t}
                      />
                      <Summery
                        sinfo={{
                          key: 0,
                          ItemNo: "ALLDATA",
                          ItemName: "",
                          ItemName2: "",
                          MainNo: "",
                          SetG: "",
                          Category: "",
                          Unit: "",
                          Brand: "",
                          Origin: "",
                          Supplier: "",
                          Sizeg: "",
                          Color: "",
                          Family: "",
                          Groupg: "",
                          Tax: "",
                          SPrice1: "",
                          SPrice2: "",
                          SPrice3: "",
                          Disc1: "",
                          Disc2: "",
                          Disc3: "",
                          CostPrice: "",
                          FobCost: "",
                          AvPrice: "",
                          BPUnit: "",
                          PQty: "",
                          PUnit: "",
                          PQUnit: "",
                          SPUnit: "",
                          Qty: 0,
                          branch: [("ALLDATA", "", "", 0.0)],
                        }}
                        token={props.token}
                        url={props.url}
                        branch={jsonFilter.selectedBranch}
                        branchSearch={jsonFilter.branch}
                        t={t}
                      />
                    </div>

                    {/* </Card.Text> */}
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <div className="flex justify-between">
                      <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle id="dropdown-autoclose-true">
                          {t("Cost")} {t("Price")}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <div className="pl-3 border-b-2">Last Cost: {""}</div>
                          <div className="pl-3 border-b-2">FOB: {""}</div>
                          <div className="pl-3">Av.Cost: {""}</div>
                        </Dropdown.Menu>
                      </Dropdown>

                      <div className="vr"></div>

                      <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle id="dropdown-autoclose-true">
                          Sale Price
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <div className="px-3 py-1 border-b-2 flex flex-row justify-between">
                            <div>P1: {""}</div>
                            <div className="flex flex-row">
                              <div className="px-1">|</div>
                              <div>-{""}%</div>
                            </div>
                          </div>
                          <div className="px-3 py-1 border-b-2 flex flex-row justify-between">
                            <div>P2: {""}</div>
                            <div className="flex flex-row">
                              <div className="px-1">|</div>
                              <div>-{""}%</div>
                            </div>
                          </div>
                          <div className="px-3 py-1 flex flex-row justify-between">
                            <div>P3: {""}</div>
                            <div className="flex flex-row">
                              <div className="px-1">|</div>
                              <div>-{""}%</div>
                            </div>
                          </div>
                          <div className="px-3 py-1 border-b-2 flex flex-row justify-between">
                            <div>P4: {""}</div>
                            <div className="flex flex-row">
                              <div className="px-1">|</div>
                              <div>-{""}%</div>
                            </div>
                          </div>
                          <div className="px-3 py-1 border-b-2 flex flex-row justify-between">
                            <div>P5: {""}</div>
                            <div className="flex flex-row">
                              <div className="px-1">|</div>
                              <div>-{""}%</div>
                            </div>
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Card.Footer>
                </Card>
                {vStock.map((cl) => {
                  return (
                    <Card
                      key={uuid()}
                      className=" text-center mb-3 box-sh shadow-xl"
                    >
                      <Card.Header>
                        <div className="flex justify-between items-center flex-wrap">
                          <div className="flex flex-col justify-between items-center flex-wrap">
                            <Statement
                              oData={cl}
                              token={props.token}
                              fil={bSelect}
                              branches={vBranches}
                              url={props.url}
                            />
                          </div>
                          <div>
                            {branchSearch && (
                              <span className="font-semibold">
                                {" "}
                                Br {cl["BR"] ? cl["BR"] : "-"}{" "}
                              </span>
                            )}
                            <Quantity
                              url={props.url}
                              oData={cl}
                              token={props.token}
                              format={"btn"}
                              t={t}
                            >
                              {cl["Qty"]}
                            </Quantity>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body className="py-1">
                        {/* <Card.Text> */}
                        <div className="border-b-2 flex items-start">
                          <p className="font-semibold m-0 text-gray-500">
                            {" "}
                            {cl["MainNo"]}{" "}
                          </p>
                        </div>
                        <div className="border-b-2">
                          <h2 className="font-semibold"> {cl["ItemName"]} </h2>
                        </div>
                        <div className="border-b-2">
                          <h6 className=""> {cl["ItemName2"]} </h6>
                        </div>
                        <div className="flex border-b-2 flex-row justify-between">
                          {/* {branchSearch && (
                                                            <div className=" w-[33%]">
                                                            <div>BR: </div>
                                                            <div>{cl["BR"]}</div>
                                                        </div>
                                                        )} */}
                          <div className=" w-[33%]">
                            <div>Set</div>
                            <div>{cl["SetG"]}</div>
                          </div>
                          <div className=" w-[33%]">
                            <div>Category</div>
                            <div> {cl["Category"]}</div>
                          </div>
                          <div className=" w-[33%]">
                            <div>Brand</div>
                            <div>{cl["Brand"]}</div>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center w-[100%] m-auto">
                          <Info sinfo={cl} url={props.url} t={t} />
                          <Summery
                            sinfo={cl}
                            token={props.token}
                            url={props.url}
                            branch={jsonFilter.selectedBranch}
                            branchSearch={jsonFilter.branch}
                            t={t}
                          />
                        </div>

                        {/* </Card.Text> */}
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        <div className="flex justify-between">
                          <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle id="dropdown-autoclose-true">
                              {t("Cost")} {t("Price")}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <div className="pl-3 border-b-2">
                                Last Cost: {cl["CostPrice"]}
                              </div>
                              <div className="pl-3 border-b-2">
                                FOB: {cl["FobCost"]}
                              </div>
                              <div className="pl-3">
                                Av.Cost: {cl["AvPrice"]}
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>

                          <div className="vr"></div>

                          <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle id="dropdown-autoclose-true">
                              Sale Price
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <div className="px-3 py-1 border-b-2 flex flex-row justify-between">
                                <div>P1: {cl["SPrice1"]}</div>
                                <div className="flex flex-row">
                                  <div className="px-1">|</div>
                                  <div>-{cl["Disc1"]}%</div>
                                </div>
                              </div>
                              <div className="px-3 py-1 border-b-2 flex flex-row justify-between">
                                <div>P2: {cl["SPrice2"]}</div>
                                <div className="flex flex-row">
                                  <div className="px-1">|</div>
                                  <div>-{cl["Disc2"]}%</div>
                                </div>
                              </div>
                              <div className="px-3 py-1 flex flex-row justify-between">
                                <div>P3: {cl["SPrice3"]}</div>
                                <div className="flex flex-row">
                                  <div className="px-1">|</div>
                                  <div>-{cl["Disc3"]}%</div>
                                </div>
                              </div>
                              <div className="px-3 py-1 border-b-2 flex flex-row justify-between">
                                <div>P4: {cl["SPrice4"]}</div>
                                <div className="flex flex-row">
                                  <div className="px-1">|</div>
                                  <div>-{cl["Disc4"]}%</div>
                                </div>
                              </div>
                              <div className="px-3 py-1 border-b-2 flex flex-row justify-between">
                                <div>P5: {cl["SPrice5"]}</div>
                                <div className="flex flex-row">
                                  <div className="px-1">|</div>
                                  <div>-{cl["Disc5"]}%</div>
                                </div>
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Card.Footer>
                    </Card>
                  );
                })}
              </div>
            ) : (
              //branchStock !== "" ? (vStock=branchStock):null
              <div className="m-2 rounded-xl max-h-[80vh] overflow-y-scroll w-full max-w-[50rem] bg-white">
                {/* this is the table view  */}
                <Table striped bordered>
                  {!branchSearch ? (
                    <>
                      <thead
                        className="bg-secondd text-BgTextColor
"
                      >
                        <tr key={uuid()} className="">
                          <th>ItemNo</th>
                          <th>Qty</th>
                          <th>Item Name</th>
                          <th>SP1</th>
                          <th>SP2</th>
                          <th>SP3</th>
                          <th>Tax%</th>
                          <th>Disc1</th>
                          <th>Disc2</th>
                          <th>Disc3</th>
                          <th>Last Cost</th>
                          <th>FOB</th>
                          <th>Av.Cost</th>
                          <th>MainNo</th>
                          <th>SetG</th>
                          <th>Category</th>
                          <th>Unit</th>
                          <th>Brand</th>
                          <th>Origin</th>
                          <th>Supplier</th>
                          <th>Size</th>
                          <th>Color</th>
                          <th>Family</th>
                          <th>Groupg</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          key={uuid()}
                          className=" hover:bg-secondd hover:text-BgTextColor whitespace-nowrap"
                          style={{ userSelect: "none" }}
                        >
                          <SimplifiedStatment
                            oData={{
                              key: 0,
                              ItemNo: "ALLDATA",
                              ItemName: "",
                              ItemName2: "",
                              MainNo: "",
                              SetG: "",
                              Category: "",
                              Unit: "",
                              Brand: "",
                              Origin: "",
                              Supplier: "",
                              Sizeg: "",
                              Color: "",
                              Family: "",
                              Groupg: "",
                              Tax: "",
                              SPrice1: "",
                              SPrice2: "",
                              SPrice3: "",
                              Disc1: "",
                              Disc2: "",
                              Disc3: "",
                              CostPrice: "",
                              FobCost: "",
                              AvPrice: "",
                              BPUnit: "",
                              PQty: "",
                              PUnit: "",
                              PQUnit: "",
                              SPUnit: "",
                              Qty: 0,
                              branch: [("ALLDATA", "", "", 0.0)],
                            }}
                            token={props.token}
                            show={"ALLDATA"}
                            fil={bSelect}
                            branches={vBranches}
                            url={props.url}
                          />

                          <Quantity
                            oData={{
                              key: 0,
                              ItemNo: "ALLDATA",
                              ItemName: "",
                              ItemName2: "",
                              MainNo: "",
                              SetG: "",
                              Category: "",
                              Unit: "",
                              Brand: "",
                              Origin: "",
                              Supplier: "",
                              Sizeg: "",
                              Color: "",
                              Family: "",
                              Groupg: "",
                              Tax: "",
                              SPrice1: "",
                              SPrice2: "",
                              SPrice3: "",
                              Disc1: "",
                              Disc2: "",
                              Disc3: "",
                              CostPrice: "",
                              FobCost: "",
                              AvPrice: "",
                              BPUnit: "",
                              PQty: "",
                              PUnit: "",
                              PQUnit: "",
                              SPUnit: "",
                              Qty: 0,
                              branch: [("ALLDATA", "", "", 0.0)],
                            }}
                            token={props.token}
                            url={props.url}
                            format={"td"}
                            t={t}
                          >
                            {"0"}
                          </Quantity>

                          <SimplifiedStatment
                            oData={{
                              key: 0,
                              ItemNo: "ALLDATA",
                              ItemName: "",
                              ItemName2: "",
                              MainNo: "",
                              SetG: "",
                              Category: "",
                              Unit: "",
                              Brand: "",
                              Origin: "",
                              Supplier: "",
                              Sizeg: "",
                              Color: "",
                              Family: "",
                              Groupg: "",
                              Tax: "",
                              SPrice1: "",
                              SPrice2: "",
                              SPrice3: "",
                              Disc1: "",
                              Disc2: "",
                              Disc3: "",
                              CostPrice: "",
                              FobCost: "",
                              AvPrice: "",
                              BPUnit: "",
                              PQty: "",
                              PUnit: "",
                              PQUnit: "",
                              SPUnit: "",
                              Qty: 0,
                              branch: [("ALLDATA", "", "", 0.0)],
                            }}
                            token={props.token}
                            show={""}
                            fil={bSelect}
                            branches={vBranches}
                            url={props.url}
                          />

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
                          <td>{""}</td>
                        </tr>

                        {vStock.map((cl) => {
                          return (
                            <>
                              <tr
                                key={uuid()}
                                className=" hover:bg-secondd hover:text-BgTextColor whitespace-nowrap"
                                style={{ userSelect: "none" }}
                              >
                                <SimplifiedStatment
                                  oData={cl}
                                  token={props.token}
                                  show={cl["ItemNo"]}
                                  fil={bSelect}
                                  branches={vBranches}
                                  url={props.url}
                                />

                                <Quantity
                                  oData={cl}
                                  token={props.token}
                                  url={props.url}
                                  format={"td"}
                                  t={t}
                                >
                                  {cl["Qty"]}
                                </Quantity>

                                <SimplifiedStatment
                                  oData={cl}
                                  token={props.token}
                                  show={cl["ItemName"]}
                                  fil={bSelect}
                                  branches={vBranches}
                                  url={props.url}
                                />

                                <td>{cl["SPrice1"]}</td>
                                <td>{cl["SPrice2"]}</td>
                                <td>{cl["SPrice3"]}</td>
                                <td>{cl["Tax"]}</td>
                                <td>{cl["Disc1"]}</td>
                                <td>{cl["Disc2"]}</td>
                                <td>{cl["Disc3"]}</td>
                                <td>{cl["CostPrice"]}</td>
                                <td>{cl["FobCost"]}</td>
                                <td>{cl["AvPrice"]}</td>
                                <td>{cl["MainNo"]}</td>
                                <td>{cl["SetG"]}</td>
                                <td>{cl["Category"]}</td>
                                <td>{cl["Unit"]}</td>
                                <td>{cl["Brand"]}</td>
                                <td>{cl["Origin"]}</td>
                                <td>{cl["Supplier"]}</td>
                                <td>{cl["Sizeg"]}</td>
                                <td>{cl["Color"]}</td>
                                <td>{cl["Family"]}</td>
                                <td>{cl["Groupg"]}</td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </>
                  ) : (
                    <>
                      <thead>
                        <tr
                          key={uuid()}
                          className=" whitespace-nowrap bg-slate-500"
                        >
                          <th>ItemNo</th>
                          <th>BR</th>
                          <th>Qty</th>
                          <th>Item Name</th>
                          <th>BR Name</th>
                          <th>SP1</th>
                          <th>SP2</th>
                          <th>SP3</th>
                          <th>Tax%</th>
                          <th>Disc1</th>
                          <th>Disc2</th>
                          <th>Disc3</th>
                          <th>Last Cost</th>
                          <th>FOB</th>
                          <th>Av.Cost</th>
                          <th>MainNo</th>
                          <th>SetG</th>
                          <th>Category</th>
                          <th>Unit</th>
                          <th>Brand</th>
                          <th>Origin</th>
                          <th>Supplier</th>
                          <th>Size</th>
                          <th>Color</th>
                          <th>Family</th>
                          <th>Groupg</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          key={uuid()}
                          className=" whitespace-nowrap hover:bg-blue-200"
                          style={{ userSelect: "none" }}
                        >
                          <SimplifiedStatment
                            oData={{
                              key: -9,
                              BR: "ALLDATA",
                              BRName: "",
                              Qty: 0,
                              ItemNo: "ALLDATA",
                              ItemName: "",
                              ItemName2: "",
                              MainNo: "",
                              SetG: "",
                              Category: "",
                              Unit: "",
                              Brand: "",
                              Origin: "",
                              Supplier: "",
                              Sizeg: "",
                              Color: "",
                              Family: "",
                              Groupg: "",
                              Tax: "",
                              SPrice1: "",
                              SPrice2: "",
                              SPrice3: "",
                              Disc1: "",
                              Disc2: "",
                              Disc3: "",
                              CostPrice: "",
                              FobCost: "",
                              AvPrice: "",
                              BPUnit: "PIECE",
                              PQty: "",
                              PUnit: "",
                              PQUnit: "",
                              SPUnit: "",
                            }}
                            token={props.token}
                            show={"ALLDATA"}
                            fil={bSelect}
                            branches={vBranches}
                            url={props.url}
                          />

                          <Quantity
                            oData={{
                              key: -9,
                              BR: "ALLDATA",
                              BRName: "",
                              Qty: 0,
                              ItemNo: "ALLDATA",
                              ItemName: "",
                              ItemName2: "",
                              MainNo: "",
                              SetG: "",
                              Category: "",
                              Unit: "",
                              Brand: "",
                              Origin: "",
                              Supplier: "",
                              Sizeg: "",
                              Color: "",
                              Family: "",
                              Groupg: "",
                              Tax: "",
                              SPrice1: "",
                              SPrice2: "",
                              SPrice3: "",
                              Disc1: "",
                              Disc2: "",
                              Disc3: "",
                              CostPrice: "",
                              FobCost: "",
                              AvPrice: "",
                              BPUnit: "PIECE",
                              PQty: "",
                              PUnit: "",
                              PQUnit: "",
                              SPUnit: "",
                            }}
                            token={props.token}
                            url={props.url}
                            format={"td"}
                            t={t}
                          >
                            {""}
                          </Quantity>
                          <Quantity
                            oData={{
                              key: -9,
                              BR: "ALLDATA",
                              BRName: "",
                              Qty: 0,
                              ItemNo: "ALLDATA",
                              ItemName: "",
                              ItemName2: "",
                              MainNo: "",
                              SetG: "",
                              Category: "",
                              Unit: "",
                              Brand: "",
                              Origin: "",
                              Supplier: "",
                              Sizeg: "",
                              Color: "",
                              Family: "",
                              Groupg: "",
                              Tax: "",
                              SPrice1: "",
                              SPrice2: "",
                              SPrice3: "",
                              Disc1: "",
                              Disc2: "",
                              Disc3: "",
                              CostPrice: "",
                              FobCost: "",
                              AvPrice: "",
                              BPUnit: "PIECE",
                              PQty: "",
                              PUnit: "",
                              PQUnit: "",
                              SPUnit: "",
                            }}
                            token={props.token}
                            url={props.url}
                            format={"td"}
                            t={t}
                          >
                            {""}
                          </Quantity>
                          <SimplifiedStatment
                            oData={{
                              key: -9,
                              BR: "ALLDATA",
                              BRName: "",
                              Qty: 0,
                              ItemNo: "ALLDATA",
                              ItemName: "",
                              ItemName2: "",
                              MainNo: "",
                              SetG: "",
                              Category: "",
                              Unit: "",
                              Brand: "",
                              Origin: "",
                              Supplier: "",
                              Sizeg: "",
                              Color: "",
                              Family: "",
                              Groupg: "",
                              Tax: "",
                              SPrice1: "",
                              SPrice2: "",
                              SPrice3: "",
                              Disc1: "",
                              Disc2: "",
                              Disc3: "",
                              CostPrice: "",
                              FobCost: "",
                              AvPrice: "",
                              BPUnit: "PIECE",
                              PQty: "",
                              PUnit: "",
                              PQUnit: "",
                              SPUnit: "",
                            }}
                            token={props.token}
                            show={""}
                            fil={bSelect}
                            branches={vBranches}
                            url={props.url}
                          />

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
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                        </tr>

                        {vStock.map((cl) => {
                          //honb
                          return (
                            <>
                              <tr
                                key={uuid()}
                                className=" whitespace-nowrap hover:bg-slate-500"
                                style={{ userSelect: "none" }}
                              >
                                <SimplifiedStatment
                                  oData={cl}
                                  token={props.token}
                                  show={cl["ItemNo"]}
                                  fil={bSelect}
                                  branches={vBranches}
                                  url={props.url}
                                />
                                <Quantity
                                  oData={cl}
                                  url={props.url}
                                  token={props.token}
                                  format={"td"}
                                  t={t}
                                >
                                  {cl["BR"]}
                                </Quantity>
                                <Quantity
                                  oData={cl}
                                  url={props.url}
                                  token={props.token}
                                  format={"td"}
                                  t={t}
                                >
                                  {cl["Qty"]}
                                </Quantity>
                                <SimplifiedStatment
                                  oData={cl}
                                  token={props.token}
                                  show={cl["ItemName"]}
                                  fil={bSelect}
                                  branches={vBranches}
                                  url={props.url}
                                />

                                <td>{cl["BRName"]}</td>
                                <td>{cl["SPrice1"]}</td>
                                <td>{cl["SPrice2"]}</td>
                                <td>{cl["SPrice3"]}</td>
                                <td>{cl["Tax"]}</td>
                                <td>{cl["Disc1"]}</td>
                                <td>{cl["Disc2"]}</td>
                                <td>{cl["Disc3"]}</td>
                                <td>{cl["CostPrice"]}</td>
                                <td>{cl["FobCost"]}</td>
                                <td>{cl["AvPrice"]}</td>
                                <td>{cl["MainNo"]}</td>
                                <td>{cl["SetG"]}</td>
                                <td>{cl["Category"]}</td>
                                <td>{cl["Unit"]}</td>
                                <td>{cl["Brand"]}</td>
                                <td>{cl["Origin"]}</td>
                                <td>{cl["Supplier"]}</td>
                                <td>{cl["Sizeg"]}</td>
                                <td>{cl["Color"]}</td>
                                <td>{cl["Family"]}</td>
                                <td>{cl["Groupg"]}</td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </>
                  )}
                </Table>
              </div>
            )}
          </div>
        )}
      </div>
      <StockFilter
        filter={jsonFilter}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        getData={getData}
        vBranches={vBranches} //honb1
      />
    </>
  );
  function getData(e, filters, limit) {
    setJsonFilter(e);
    setBranchSearch(e.branch);

    let data = {
      token: props.token,
      data: e,
      filters: filters,
    };

    axios({
      method: "POST",
      url: props.url + "/Stock/Filter/" + limit + "/",
      data: {
        username: localStorage.getItem("compname"),
        data: data,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.data.Info == "authorized") {
          branchHandler(res.data.branches);
          if (res.data.branchStock == "") {
            setStock(res.data.stock);
          } else {
            setStock(res.data.branchStock);
          }

          setBranchstock(res.data.branchStock);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setShowFilter(false);
  }
}
