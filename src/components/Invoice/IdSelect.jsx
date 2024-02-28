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
    const [sItemNote, setsItemNote] = useState("");
    const [sItemTaxTotal, setsItemTaxTotal] = useState(0);
    const [sItemTotal, setsItemTotal] = useState(0);
    
    

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
        console.log("Solution")
        console.log(props.sOption);
        let temptax = io["Tax"] == "" || undefined ? 0 : io["Tax"];

        return (
            <>
                {props.sOption === "Items" && (
                    <div
                        key={idx}
                        className="bg-gradient-to-br from-gray-300 to-zinc-200 shadow-sm p-2 rounded my-2"
                        onClick={(e) => {
                            console.log(io);
                            selectHandler(io, idx);
                            setsItemNo(io["ItemNo"]);
                            setsItemName(io["ItemName"]);
                            setsItemQty(1);
                            setsItemTax(temptax);
                            setsItemDiscount(0);
                            setsItemPQty(io["PQty"]);
                            setsItemPUnit(io["PUnit"]);
                        }}
                    >
                        <div className="card-body">
                            <div className="d-flex flex-wrap">
                                <div>
                                    {io["ItemNo"] && <p className="me-3 mb-0 card-title"><strong>ItemNo:</strong> {io["ItemNo"]}</p>}
                                    {io["ItemName"] && <p className="me-3 mb-0"><strong>ItemName:</strong> {io["ItemName"]}</p>}
                                </div>
                                <div>
                                    {/*io["ItemName2"] && <p className="me-3 mb-0"><strong>ItemName2:</strong> {io["ItemName2"]}</p>*/}
                                    {<p className="me-3 mb-0"><strong>QtyBal:</strong> {io["AvQty"] != null && io["AvQty"] != ""? io["AvQty"]:"--"}</p>}
                                    {<p className="me-3 mb-0"><strong>Br:</strong> {io["Branch"]!=null && io["Branch"]!="" ? io["Branch"]:"--"}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {props.sOption === "Accounts" && (
                    <div
                        key={idx}
                        className="bg-gradient-to-br from-gray-300 to-zinc-200 shadow-sm p-2 rounded my-2"
                        onClick={(e) => {
                            console.log(io);
                            selectHandler(io, idx);
                        }}
                    >
                        <div className="card-body">
                            <div className="flex-wrap">
                                <div>
                                    <p className="me-3 mb-0 card-title"><strong>AccNo:</strong> {io["AccNo"] != null && io["AccNo"] != "" ? io["AccNo"] : "--"}</p>
                                </div>
                                <div>
                                    <p className="me-3 mb-0"><strong>AccName:</strong>{io["AccName"] != null && io["AccName"] != "" ? io["AccName"] : "--"}</p>
                                </div>
                                <div>
                                    <p className="me-3 mb-0"><strong>Address:</strong>{io["Address"] != null && io["Address"] != "" ? io["Address"] : "--"}</p>
                                </div>
                                <div>
                                    <p className="me-3 mb-0"><strong>Tel:</strong>{io["Tel"] != null && io["Tel"] != "" ? io["Tel"] : "--"}</p>
                                </div>
                                <div>
                                    <p className="me-3 mb-0"><strong>Balance:</strong>{io["Balance"] != null && io["Balance"] != "" ? io["Balance"] : "--"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
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
    
    aria-labelledby="contained-modal-title-vcenter"
    centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{sItemName}
    <br />
    {sItemNo}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="px-6 py-4">
        <div className="space-y-3">
            {/* <div className="flex items-center">
                <label htmlFor="itemName" className="w-1/4">Item Name:</label>
                <input
                    id="itemName"
                    type="text"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Item Name"
                    value={sItemName}
                    disabled
                    onChange={(e) => {
                        setsItemName(e.target.value);
                    }}
                />
            </div> */}
            
            <div className="flex items-center">
                <label htmlFor="itemBranch" className="w-1/4">Branch:</label>
                <select
                    id="itemBranch"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    value={sItemBranch}
                    onChange={(e) => {
                        setsItemBranch(e.target.value);
                    }}
                >
                    {props.branches.map((br) => (
                        <option key={br.number} value={br.number}>
                            {br.number} - {br.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center">
                <label htmlFor="itemQty" className="w-1/4">Qty:</label>
                <div className="flex items-center space-x-2">
                    <img
                        src={minus}
                        alt="minus"
                        className="h-6 cursor-pointer"
                        onClick={() => {
                            setsItemQty(sItemQty - 1);
                        }}
                    />
                    <input
                        id="itemQty"
                        type="name"
                        className="w-25 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Quantity"
                        value={sItemQty}
                        onChange={(e) => {
                            setsItemQty(e.target.value);
                        }}
                    />
                    <img
                        src={plus}
                        alt="plus"
                        className="h-6 cursor-pointer"
                        onClick={() => {
                            setsItemQty(sItemQty + 1);
                        }}
                    />
                </div>
            </div>
            <div className="flex items-center">
                <label htmlFor="itemPrice" className="w-1/4">Uprice:</label>
                <input
                    id="itemPrice"
                    type="number"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Unit Price"
                    value={sItemPrice}
                    onChange={(e) => {
                        setsItemPrice(e.target.value);
                    }}
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="itemDiscount" className="w-1/4">% Discount:</label>
                <input
                    id="itemDiscount"
                    type="number"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Discount"
                    value={sItemDiscount}
                    onChange={(e) => {
                        setsItemDiscount(e.target.value);
                    }}
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="itemTax" className="w-1/4">% Tax:</label>
                <input
                    id="itemTax"
                    type="number"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Tax"
                    value={sItemTax}
                    onChange={(e) => {
                        setsItemTax(e.target.value);
                    }}
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="itemTotal" className="w-1/4">Total:</label>
                <input
                    id="itemTotal"
                    type="number"
                    readOnly
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Total"
                    value={((sItemPrice* sItemQty)*(1-sItemDiscount/100)*(1 +sItemTax/100)).toFixed(3)}
                    onChange={(e) => {
                        if(sItemPrice=="" || sItemPrice==undefined){
                            
                        }

                        setsItemTotal(((sItemPrice* sItemQty)*(1-sItemDiscount/100)*(1 +sItemTax/100)).toFixed(3));
                        
                    }}
                    
                />
            </div>
        </div>
    </Modal.Body>
    
    <Modal.Footer>
    <div className="flex flex-row-reverse justify-between w-full">
            <Button onClick={addItem}>Add Item</Button>
            <Button
                    
                    onClick={() => {
                        setModalItems(false);
                        props.setModalShow(true);
                    }}
                    variant="danger">
                    Close
            </Button>
                
            
        </div>
    </Modal.Footer>
</Modal>

        </>
    );
    function selectHandler(e, idx) {
        if (props.sOption == "Accounts") {

            console.log("ll");
            const currentDate = new Date();
            const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
            const formattedTime = `T${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
            
            props.setClient({
                id: e["AccNo"],
                name: e["AccName"],
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
                    id: e["AccNo"],
                    name: e["AccName"],
                    date: formattedDate,
                    time: formattedTime
                },

                items: props.si,
            });
        } else if (props.sOption === "Items") {
            let uprice = 0;
            
            // if (e["SPrice1"] != 0) {
            //     uprice = e["SPrice1"];
            // } else if (e["SPrice2"] != 0) {
            //     uprice = e["SPrice2"];
            // } else if (e["SPrice3"] != 0) {
            //     uprice = e["SPrice3"];
            // }
            // else if (e["SPrice4"] != 0) {
            //     uprice = e["SPrice4"];
            // }
            // else if (e["SPrice5"] != 0) {
            //     uprice = e["SPrice5"];
            // }
            let prefix = localStorage.getItem("SalePrice"); //SalePrice number 
            uprice = e[`SPrice${prefix}`];
            if (uprice==""|| uprice ==null || uprice == undefined)
                uprice = 0

            setsItemPrice(uprice);
            setModalItems(true);
            props.setModalShow(false);
            //setsItemBranch(props.branches[0]["number"]);
            let ItemBranch ="";
            if (e["Branch"] == "" || e["Branch"]==null || e["Branch"]==undefined){
                ItemBranch = localStorage.getItem("Sbranch");
            }
            else{
                ItemBranch = e["Branch"];
            }
            if (ItemBranch=="" || ItemBranch==null || ItemBranch==undefined){
                ItemBranch="1";
            }
            setsItemBranch(ItemBranch);
        }
    }
    function addItem() {
        let tempsi = [];
        
        let tax = sItemTax == "" || undefined ? 0 : sItemTax;
        let uprice = sItemPrice == "" || undefined ? 0 : sItemPrice;
        let discount = sItemDiscount == "" || undefined ? 0 : sItemDiscount;
        console.log(sItemTotal);
        console.log("--=");
        let tempQty = sItemQty == "" || undefined || 0 ? 1 : sItemQty;
        let Lno=(props.si).length + 1;
        const currentDate = new Date();
        const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
        const formattedTime = `T${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
        tempsi = [
            ...props.si,
            {
                no: sItemNo,
                name: sItemName,
                qty: tempQty,
                uprice: uprice,
                discount: discount,
                branch: sItemBranch,
                lno : Lno,
                PQty: sItemPQty,
                PUnit:sItemPUnit,
                tax: tax,
                TaxTotal: sItemTaxTotal,
                Total:sItemTotal,
                Note: sItemNote,
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
