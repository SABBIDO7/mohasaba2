import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import plus from "../../media/plus.png";
import minus from "../../media/minus.png";

export default function IdSelect(props) {
    const [modalShow, setModalShow] = useState(false);

    const [modalItems, setModalItems] = useState(false);

    const [sItemNo, setsItemNo] = useState("");
    const [sItemName, setsItemName] = useState("");
    const [sItemQty, setsItemQty] = useState("");
    const [sItemPrice, setsItemPrice] = useState("");
    const [sItemTax, setsItemTax] = useState();
    const [sItemDiscount, setsItemDiscount] = useState();
    const [sItemBranch, setsItemBranch] = useState("");
    const [sItemPQty, setsItemPQty] = useState("");
    const [sItemPUnit, setsItemPUnit] = useState("");

    return (
        <>
            {/* <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button> */}

            <Modal
                show={props.show}
                onHide={() => props.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Choose</Modal.Title>
                </Modal.Header>
                <Modal.Body className="h-[43rem] overflow-y-auto">
                    {props.options.map((io, idx) => {
                        let temptax = io[14] == "" || undefined ? 0 : io[14];

                        return (
                            <div
                                key={idx}
                                className=" bg-gradient-to-br from-gray-300 to-zinc-200 shadow-sm p-2 rounded my-2"
                                onClick={(e) => {
                                    selectHandler(io, idx);
                                    setsItemNo(io[0]);
                                    setsItemName(io[1]);
                                    setsItemQty(1);
                                    setsItemTax(temptax);
                                    setsItemDiscount(0);
                                    setsItemPQty(io[26]);
                                    setsItemPUnit(io[27]);
                                   
                                }}>
                                <div>{io[0]}</div>
                                <div>{io[1]}</div>
                                <div>{io[2]}</div>
                            </div>
                        );
                    })}
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer> */}
            </Modal>
            <Modal
                show={modalItems}
                onHide={() => {
                    setModalItems(false);
                    props.setModalShow(true);
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{sItemNo}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-around mb-2">
                            <input
                                type={"text"}
                                className="block rounded-md w-[40%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[2px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder={"Item Name"}
                                value={sItemName}
                                disabled
                                onChange={(e) => {
                                    setsItemName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-row justify-between my-2 align-middle items-center ">
                            <div>Qty:</div>
                            <img
                                src={minus}
                                alt={"minus"}
                                className="h-6"
                                onClick={() => {
                                    setsItemQty(sItemQty - 1);
                                }}
                            />
                            <img
                                src={plus}
                                alt={"plus"}
                                className="h-6"
                                onClick={() => {
                                    setsItemQty(sItemQty + 1);
                                }}
                            />
                            <input
                                type={"number"}
                                className="block rounded-md w-[40%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[2px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder={"Quantity"}
                                value={sItemQty}
                                onChange={(e) => {
                                    setsItemQty(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-row justify-between my-2">
                            <div>Branch:</div>
                            <select
                                className="block rounded-md w-[40%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[2px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={sItemBranch}
                                onChange={(e) => {
                                    setsItemBranch(e.target.value);
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
                        <div className="flex flex-row justify-between my-2">
                            <div>Uprice:</div>
                            <input
                                type={"number"}
                                className="block rounded-md w-[40%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[2px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder={"Unit Price"}
                                value={sItemPrice}
                                onChange={(e) => {
                                    setsItemPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-row justify-between my-2">
                            <div>% Tax:</div>
                            <input
                                type={"number"}
                                className="block rounded-md w-[40%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[2px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder={"Tax"}
                                value={sItemTax}
                                onChange={(e) => {
                                    setsItemTax(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-row justify-between my-2">
                            <div>% Discount:</div>
                            <input
                                type={"number"}
                                className="block rounded-md w-[40%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[2px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder={"Discount"}
                                value={sItemDiscount}
                                onChange={(e) => {
                                    setsItemDiscount(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            addItem();
                        }}>
                        Add Item
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
    function selectHandler(e, idx) {
        if (props.sOption == "Accounts") {

            console.log("ll");
            const currentDate = new Date();
            const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
            const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
            
            props.setClient({
                id: e[0],
                name: e[1],
                date: formattedDate,
                time: formattedTime,
            });
            
            props.setModalShow(false);
            props.setsOption("Items");
            props.setvInput("");
            props.setOption([]);
            document.getElementById("tf").focus();
            props.handleSave({
                accName: {
                    id: e[0],
                    name: e[1],
                    date: formattedDate,
                    time: formattedTime
                },

                items: props.si,
            });
        } else if (props.sOption === "Items") {
            let uprice = 0;
            
            if (props.options[idx][15] != "0") {
                uprice = props.options[idx][15];
            } else if (props.options[idx][16] != "0") {
                uprice = props.options[idx][16];
            } else if (props.options[idx][17] != "0") {
                uprice = props.options[idx][17];
            }

            setsItemPrice(uprice);
            setModalItems(true);
            props.setModalShow(false);
            setsItemBranch(props.branches[0]["number"]);
        }
    }
    function addItem() {
        let tempsi = [];
        
        let tax = sItemTax == "" || undefined ? 0 : sItemTax;
        let uprice = sItemPrice == "" || undefined ? 0 : sItemPrice;
        let discount = sItemDiscount == "" || undefined ? 0 : sItemDiscount;
        let tempQty = sItemQty == "" || undefined || 0 ? 1 : sItemQty;
        let Lno=(props.si).length + 1;
        const currentDate = new Date();
        const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
        tempsi = [
            ...props.si,
            {
                no: sItemNo,
                name: sItemName,
                qty: tempQty,
              
                uprice: uprice,
                tax: tax,
                discount: discount,
                branch: sItemBranch,
                lno : Lno,
                PQty: sItemPQty,
                PUnit:sItemPUnit,
                DateT: formattedDate,
                TimeT: formattedTime,
            },
        ];
        console.log("*//////////////////////*");
        console.log(tempsi);
        props.ssi(tempsi);
        setModalItems(false);
        props.handleSave({
            accName: props.Client,
            items: tempsi,
        });
        props.setvInput("");
        props.setOption([]);
        document.getElementById("tf").focus();
    }
}
