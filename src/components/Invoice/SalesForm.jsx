import backbutton from "../../media/backbutton.png";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import searchico from "../../media/searchnbg.png";
import IdSelect from "./IdSelect";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import plus from "../../media/plus.png";
import minus from "../../media/minus.png";
import axios from "axios";
import ConfirmPostInvoiceModal from "./ConfirmPostInvoiceModal";
import DiscardInvoiceModal from "./DiscardInvoicemodal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function SalesForm(props) {
    const [Client, setClient] = useState("");
    const [vInput, setvInput] = useState("");

    const [sOption, setsOption] = useState("Accounts");

    //idselect modal props
    const [modalShow, setModalShow] = useState(false);

    const [IdOptions, setIdOptions] = useState([]);

    const [SelectedItems, setSelectedItems] = useState([]);

    const [show, setShow] = useState(false);

    const [EditItem, setEditItem] = useState({});
    const [EditQty, setEditQty] = useState("");
    const [EditPrice, setEditPrice] = useState("");
    const [EditBranch, setEditBranch] = useState("");
    const [EditTax, setEditTax] = useState("");
    const [EditDiscount, setEditDiscount] = useState("");

    const [EditIdx, setEditIdx] = useState(0);

    //confirm modal state
    const [confirmModalShow, setConfirmModalShow] = useState(false);

    //discard Modal
    const [discardModalShow, setDiscardModalShow] = useState(false);

    let final = 0;
    let fTax = 0;

    const handleSave = (e) => {
        const jsonString = JSON.stringify(e);
        localStorage.setItem("sales", jsonString);
    };

    const handleRetrieve = () => {
        const jsonString = localStorage.getItem("sales");
        const retrievedJson = JSON.parse(jsonString);
        setClient(retrievedJson["accName"]);
        setSelectedItems(retrievedJson["items"]);
    };

    useEffect(() => {
        try {
            handleRetrieve();
        } catch (error) {
            
        }
    }, []);

    return (
        <>
            <div className="w-[99vw] h-[85vh] m-auto flex flex-col pt-2  ">
                <div className="flex flex-row w-full h-fit">
                    <img
                        src={backbutton}
                        alt="Back"
                        className="h-8 mr-2"
                        onClick={() => props.inv("")}
                    />
                    <h3>Sales Invoice</h3>
                </div>
                <div className="my-2 px-2 flex flex-row items-center max-w-[60rem] mx-auto">
                    <div className=" font-semibold text-lg ">Search:</div>
                    <input
                        type={"text"}
                        className="block rounded-md w-[8rem] h-[2.3rem] border-black mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={"Value"}
                        value={vInput}
                        onChange={(e) => {
                            setvInput(e.target.value);
                        }}
                        id={"tf"}
                    />
                    <select
                        className="p-[0.39rem] rounded border-black border-[1px]"
                        value={sOption}
                        onChange={(e) => {
                            setsOption(e.target.value);
                            document.getElementById("tf").focus();
                            setvInput("");
                            
                        }}>
                        <option>Accounts</option>
                        <option>Items</option>
                    </select>
                    <img
                        src={searchico}
                        alt="Search"
                        className="h-[2rem] ml-3"
                        onClick={() => {
                            getInvoiceOptions();
                            setModalShow(true);
                        }}
                    />
                </div>
                <div className=" w-[95%] shadow-lg mx-auto h-[40rem] rounded p-2 max-w-[60rem]">
                    <div className="flex flex-col justify-between h-[38.5rem]">
                        <h3 className="text-center">Sales Form</h3>
                        <div className=" flex flex-row align-middle items-center mb-2 justify-between">
                            <div className=" text-xl font-semibold">Client ID:</div>
                            <div>
                                <input
                                    type={"text"}
                                    className="block rounded-md w-[80%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder={"Client Id"}
                                    value={Client["id"]}
                                    disabled
                                    // onChange={(e) => {
                                    //     setClient(e.target.value);
                                    //     document.getElementById("tf").focus()
                                    // }}
                                />
                            </div>
                        </div>
                        <div className=" flex flex-row align-middle items-center mb-2 justify-between">
                            <div className=" text-xl font-semibold mr-3"> Name:</div>
                            <div>
                                {Client["name"]}
                                {/* <input
                                type={"text"}
                                className="block rounded-md w-[80%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder={"Client Id"}
                                value={Client["name"]}
                                disabled
                                onChange={(e) => {
                                    setClient(e.target.value);
                                }}
                            /> */}
                            </div>
                        </div>
                        <div className="h-[20rem] overflow-auto">
                            <Table bordered striped responsive>
                                <thead className=" bg-slate-500">
                                    <tr className=" whitespace-nowrap ">
                                        <th>LNO</th>
                                        <th>ItemNo</th>
                                        <th>Name</th>
                                        <th>Br</th>
                                        <th>QTY</th>
                                        <th>UPrice</th>
                                        <th>Discount</th>
                                        <th>Tax</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {SelectedItems.map((si, idx) => {
                                        let total =
                                            si["qty"] * si["uprice"] -
                                            (si["qty"] * si["uprice"] * si["discount"]) / 100;

                                        let tax = si["tax"] == "" ? 0 : si["tax"];

                                        let taxAmount = (total * tax) / 100;
                                        final = final + total;
                                        fTax = fTax + taxAmount;
                                        return (
                                            <tr
                                                key={idx}
                                                className=" whitespace-nowrap hover:bg-blue-200 select-none "
                                               >
                                                <td>{si["no"]}</td>
                                                <td>{si["name"]}</td>
                                                <td>{si["qty"]}</td>
                                                <td>{si["branch"]}</td>
                                                <td>{si["uprice"]}</td>
                                                <td>{si["discount"]}%</td>
                                                <td>{total.toFixed(3)}</td>
                                                <td>{tax}%</td>
                                                <td>{taxAmount.toFixed(3)}</td>
                                                <td>
                                                    <button
                                                        className="text-blue-500 hover:text-blue-700"
                                                        onClick={() => {
                                                            setShow(true);
                                                            setEditItem(si);
                                                            setEditQty(si["qty"]);
                                                            setEditPrice(si["uprice"]);
                                                            setEditIdx(idx);
                                                            setEditTax(tax);
                                                            setEditBranch(si["branch"]);
                                                            setEditDiscount(si["discount"]);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                        <div className="flex flex-col justify-start ">
                            <div className=" font-semibold text-xl ">
                                <div>
                                    {final.toFixed(3)} + {fTax.toFixed(3)}
                                </div>
                                Total: {final + fTax}
                            </div>
                            <div className="flex flex-row justify-between max-w-[60rem]">
                                <Button className="my-2" variant="danger" onClick={() => {
                                    setDiscardModalShow(true)
                                }}>
                                    Discard
                                </Button>
                                <Button
                                    className="my-2"
                                    variant="primary"
                                    onClick={() => {
                                        setConfirmModalShow(true);
                                    }}>
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <IdSelect
                options={IdOptions}
                setOption={setIdOptions}
                show={modalShow}
                setModalShow={setModalShow}
                sOption={sOption}
                setsOption={setsOption}
                setClient={setClient}
                Client={Client}
                si={SelectedItems}
                ssi={setSelectedItems}
                setvInput={setvInput}
                branches={props.branches}
                handleSave={handleSave}
            />
            <Modal
                show={show}
                onHide={() => {
                    setShow(false);
                    setIdOptions([]);
                }}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>{EditItem["name"]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="flex flex-row justify-between align-middle items-center my-1">
                            <div>Qty:</div>
                            <img
                                src={minus}
                                alt={"minus"}
                                className="h-6"
                                onClick={() => {
                                    setEditQty(EditQty - 1);
                                }}
                            />
                            <img
                                src={plus}
                                alt={"plus"}
                                className="h-6"
                                onClick={() => {
                                    setEditQty(EditQty + 1);
                                }}
                            />
                            <input
                                type={"number"}
                                className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder={"Qty"}
                                value={EditQty}
                                onChange={(e) => {
                                    setEditQty(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-row justify-between align-middle items-center my-1">
                            <div>Uprice:</div>
                            <input
                                type={"number"}
                                className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder={"Uprice"}
                                value={EditPrice}
                                onChange={(e) => {
                                    setEditPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-row justify-between align-middle items-center my-1">
                            <div>Branch:</div>
                            <select
                                className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={EditBranch}
                                onChange={(e) => {
                                    setEditBranch(e.target.value);
                                }}>
                                {props.branches.map((br) => {
                                    return (
                                        <option key={br.number} value={br.number}>
                                        {br.number} - {br.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-row justify-between align-middle items-center my-1">
                            <div>%Tax:</div>
                            <input
                                type={"number"}
                                className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder={"Tax"}
                                value={EditTax}
                                onChange={(e) => {
                                    setEditTax(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-row justify-between align-middle items-center my-1">
                            <div>%Discount:</div>
                            <input
                                type={"number"}
                                className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder={"Discount"}
                                value={EditDiscount}
                                onChange={(e) => {
                                    setEditDiscount(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex flex-row-reverse justify-between w-[100%]">
                        <div className="flex flex-row align-middle justify-between">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setShow(false);
                                    setIdOptions([]);
                                }}>
                                Close
                            </Button>
                            <div className="w-3"></div>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setShow(false);
                                    setIdOptions([]);
                                    let tempa = SelectedItems;

                                    let tempQty;
                                    if (EditQty === 0) {
                                        tempQty = 1;
                                    } else {
                                        tempQty = EditQty;
                                    }

                                    tempa[EditIdx] = {
                                        no: EditItem.no,
                                        name: EditItem.name,
                                        qty: tempQty,
                                        uprice: EditPrice,
                                        branch: EditBranch,
                                        tax: EditTax,
                                        discount: EditDiscount,
                                    };
                                    setSelectedItems(tempa);
                                }}>
                                Apply
                            </Button>
                        </div>
                        <div className="flex flex-row align-middle justify-between">
                            <Button
                                variant="danger"
                                onClick={() => {
                                    setShow(false);

                                    let tempa = SelectedItems;

                                    tempa.pop(EditIdx);

                                    setSelectedItems(tempa);
                                }}>
                                Remove
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
            <ConfirmPostInvoiceModal
                modalShow={confirmModalShow}
                setModalShow={setConfirmModalShow}
                postInvoice={props.postInvoice}
                token={props.token}
                type={"SAOL"}
                Client={Client}
                items={SelectedItems}
            />
            <DiscardInvoiceModal modalShow={discardModalShow} setModalShow={setDiscardModalShow} callBack={discardInvoice} />
        </>
    );
    function getInvoiceOptions() {
        let data = {
            token: props.token,
            option: sOption,
            value: vInput,
            username: localStorage.getItem("compname")
        };
        axios({
            method: "POST",
            url: props.url + "/INVOICE_DATA_SELECT/",
            data: data,
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.data.Info == "authorized") {
                    setIdOptions(res.data.opp);
                    //02/24/2024
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function discardInvoice(){
        setClient({
            id:"",
            name:""
        })
        setSelectedItems([])
        localStorage.setItem("sales", "")
    }
}
