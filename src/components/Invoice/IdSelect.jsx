import React, { useState,useEffect, forwardRef, useImperativeHandle } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import plus from "../../media/plus.png";
import minus from "../../media/minus.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';


const IdSelect = forwardRef((props,ref) => {
    const [modalShow, setModalShow] = useState(false);

    const [modalItems, setModalItems] = useState(false);

    const [sItemNo, setsItemNo] = useState("");
    const [sItemName, setsItemName] = useState("");
    const [sItemQty, setsItemQty] = useState();
    const [sItemPrice, setsItemPrice] = useState();
    const [sItemTax, setsItemTax] = useState();
    const [sItemDiscount, setsItemDiscount] = useState();
    const [sItemBranch, setsItemBranch] = useState("");
    const [sItemPQty, setsItemPQty] = useState("");
    const [sItemPUnit, setsItemPUnit] = useState("");
    const [sItemNote, setsItemNote] = useState("");
    const [sItemTaxTotal, setsItemTaxTotal] = useState(0);
    const [sItemTotal, setsItemTotal] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [sItemPQUnit,setsItemPQunit] = useState();
    const [sItemPType,setsItemPType] = useState("");
    const [sItemTotalPieces,setTotalPieces] = useState(1);
    const [sItemPPrice,setsItemPPrice] = useState();
    const [sItemDBPUnit,setsItemBPUnit] = useState();
    const [sItemDSPUnit,setsItemDSPUnit] = useState();

    const [sItemInitial,setsItemInitial] = useState();

    useImperativeHandle(ref, () => ({
        // Define functions here
        selectHandler: (e,idx) => {
            selectHandler(e,idx);
        },
        
    }));

    useEffect(() => {
        // Calculate total pieces based on other inputs whenever they change
        const calculateTotalPieces = () => {
            let total = 0;
            if (sItemPType === "3") {
                total = sItemQty * sItemPQty * sItemPQUnit;
            } else if (sItemPType === "2") {
                total = sItemQty * sItemPQUnit;
            } else {
                total = sItemQty;
            }
            setTotalPieces(parseFloat(total).toFixed(3));
        };

        calculateTotalPieces();
    }, [sItemQty, sItemPQty, sItemPQUnit, sItemPType]);

    useEffect(() => {
        // Calculate total pieces based on other inputs whenever they change
        const calculateUprice = () => {
            let total = 0;
            if (sItemPType === "3") {
                total = sItemInitial;
            } else if (sItemPType === "2") {
                total = sItemInitial / sItemPQty;
            } else {
                total = sItemInitial / (sItemPQty * sItemPQUnit);
            }
            setsItemPrice(parseFloat(total).toFixed(3));
        };
        if(sItemPPrice=="P"){
            console.log("klop");
            calculateUprice();
        }
        
    }, [sItemPType]);

    useEffect(() => {
        // Calculate total pieces based on other inputs whenever they change
        const UpriceZeroCheck = () => {
            console.log("klop2");
            if(parseFloat(sItemPrice).toFixed(3)==0){
                setErrorMessage("The Item Price is 0 !");
            }else{
                setErrorMessage("");
            }
            
        };
        

            UpriceZeroCheck();
       
        
    }, [sItemPrice]);

    const allowPriceChanges = localStorage.getItem("Price") !== "N";
    const allowDiscountChanges = localStorage.getItem("Discount") !== "N";

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
     
        let temptax = io["Tax"] == "" || undefined ? 0 : io["Tax"];

        return (
            <>
                {props.sOption === "Items" && (
                    <div
                        key={idx}
                        className="bg-gradient-to-br from-gray-300 to-zinc-200 shadow-sm p-2 rounded my-2"
                        onClick={(e) => {
                            console.log("kkjjjhhgg");
                            console.log(io);
                            selectHandler(io, idx);
                            setsItemNo(io["ItemNo"]);
                            setsItemName(io["ItemName"]);
                            setsItemQty(1);
                            setsItemTax(temptax);
                            setsItemDiscount(0);
                            setsItemPQty(io["PQty"]);
                            setsItemPUnit(io["PUnit"]);
                            setsItemPQunit(io["PQUnit"]);
                            // {sItemDBPUnit && sItemDBPUnit.trim() !== '' ? setsItemPType("3"): sItemPUnit && sItemPUnit.trim() !== ''?setsItemPType("2"):setsItemPType("1")}
                            if(sItemDBPUnit && sItemDBPUnit.trim() !== ''){
                                setsItemPType("3");
                             
                            }
                            else if(sItemDSPUnit && sItemDSPUnit.trim() !== ''){
                                setsItemPType("2")
                               
                            }
                            else if(sItemPUnit && sItemPUnit.trim() != ''){
                                setsItemPType("1")
                                
                            }
                           // setsItemPType("1");
                            setsItemPPrice(io["PPrice"]);
                            setsItemBPUnit(io["BPUnit"]);
                            setsItemDSPUnit(io["SPUnit"]);

                            

                        
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
                            props.setchangingAccountInvoiceFromDB(props.Client.RefNo);
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
            backdrop="static"
            keyboard={false}
    show={modalItems}
    onHide={() => {
        setModalItems(false);
        props.setModalShow(true);
        setErrorMessage('');
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
                            
                            setsItemQty(parseInt(sItemQty) - 1);
                        }}
                    />
                    <input
                        id="itemQty"
                        type="text"
                        className="w-25 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Quantity"
                        value={sItemQty}
                        onBlur={(e) =>{
                            if(e.target.value==null || e.target.value=="" || e.target.value=="-"){
                                e.target.value=0;
                                setsItemQty(0)
                            }

                        }
                            
                        }
                        onChange={(e) => {
                            let sanitizedValue = e.target.value;
                            
                            // if (sanitizedValue.startsWith('0') && e.target.selectionStart === 1 && e.nativeEvent.data !== '.') {
                            //     console.log("lkkkkkk");
                            //     sanitizedValue = sanitizedValue.slice(1);
                                
                            // }
                             sanitizedValue = e.target.value.replace(/[^0-9-]/g, '');

                            setsItemQty(sanitizedValue);
                        
                        }}
                        onKeyPress={(e) => {
                            // Allow only numeric values, minus symbol, and buffer the numbers
                            const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '.'];
                    
                            // Prevent entering multiple minus symbols or minus symbol as the first character
                            if (
                                e.key === '-' &&                  // If the pressed key is a minus symbol
                                (e.target.selectionStart !== 0 || // And not at the beginning of the input
                                e.target.value.includes('-'))    // Or if the minus symbol is already present
                            ) {
                                e.preventDefault();  // Prevent the default action (typing the minus symbol)
                            }
                            if (
                                e.key === '.' &&                  // If the pressed key is a minus symbol
                                (e.target.selectionStart == 0 || // And not at the beginning of the input
                                e.target.value.includes('.'))    // Or if the minus symbol is already present
                            ) {
                                e.preventDefault();  // Prevent the default action (typing the minus symbol)
                            }
                           
                    
                            // Allow only the specified characters
                            if (!allowedChars.includes(e.key)) {
                                e.preventDefault();  // Prevent the default action (typing the character)
                            }
                        }
                        
                    }
                    />
                    <img
                        src={plus}
                        alt="plus"
                        className="h-6 cursor-pointer"
                        onClick={() => {
                            
                            setsItemQty(parseInt(sItemQty) + 1);
                            
                        }}
                    />
                    <select
                            id="itemType"
                            className="w-1/2 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                            value={sItemPType}
                            onChange={(e) => {
                                setsItemPType(e.target.value);
                            }}
                        >
                            
                            {sItemDBPUnit && sItemDBPUnit.trim() !== '' && <option value="3">{sItemDBPUnit}</option>}            
                            {sItemPUnit && sItemPUnit.trim() !== '' && <option value="2">{sItemPUnit}</option>}
    
                            {sItemDSPUnit && sItemDSPUnit.trim() !== '' && <option value="1">{sItemDSPUnit}</option>}
                            
                           
                        </select>
                </div>
            </div>
            <div className="flex items-center">
                            <label htmlFor="itemPieceTotal" className="w-1/4">Total Qty:</label>
                            <input
                                id="pieceTotal"
                                type="number"
                                readOnly
                                className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Total Pieces"
                                value={sItemTotalPieces}
                                
                                
                            />
                        </div>
            <div className="flex items-center">
                <label htmlFor="itemPrice" className="w-1/4">Uprice: {!allowPriceChanges && (        
                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                )}</label>
                
                <input
                    id="itemPrice"
                    type="number"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Unit Price"
                    value={sItemPrice}
                    onChange={(e) => {
                        if (allowPriceChanges) {
                        setsItemPrice(e.target.value);
                        }

                    }}
                    readOnly={!allowPriceChanges}

                />
               
            </div>
            <div className="flex items-center">
                <label htmlFor="itemDiscount" className="w-1/4">Discount %: {!allowDiscountChanges && (        
                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                )}</label>
                <input
                    id="itemDiscount"
                    type="number"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Discount"
                    value={sItemDiscount}
                    onChange={(e) => {
                        setsItemDiscount(e.target.value);
                        
                    }}
                    readOnly={!allowDiscountChanges}
                />
            </div>
            <div className="flex items-center">
                <label htmlFor="itemTax" className="w-1/4">Tax %:</label>
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
                    value={ sItemPPrice=="U"?  parseFloat((sItemPrice* sItemTotalPieces)*(1-sItemDiscount/100)*(1 +sItemTax/100)).toFixed(3):sItemPPrice=="P" && parseFloat((sItemPrice* sItemQty)*(1-sItemDiscount/100)*(1 +sItemTax/100)).toFixed(3)}
                    onChange={(e) => {
                        // if(sItemPrice=="" || sItemPrice==undefined){
                            
                        // }

                        // setsItemTotal(((sItemPrice* sItemQty)*(1-sItemDiscount/100)*(1 +sItemTax/100)).toFixed(3));
                        // console.log(sItemTotal);
                    }}
                    
                />

            </div>
           
                    <div className="text-red-500 mb-2">
                    {errorMessage}
                    </div>
                
            
        </div>
    </Modal.Body>
    
    <Modal.Footer>
    <div className="flex flex-row-reverse justify-between w-full">
            <Button onClick={() =>{addItem();}}>Add Item</Button>
            <Button
                    
                    onClick={() => {
                        setErrorMessage('');
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
            if (props.Client["id"] != "" && props.Client["id"] !=undefined && idx!="fromParent"){
                console.log("tiriririoro");
           
                
                props.setnewAccount(e["AccNo"]);
            
                props.sethandlingAccWhenChanging(e);
                console.log(typeof(props.Client.id));
                console.log(typeof(props.newAccount));
                if(props.Client.id !== props.newAccount){
                    props.setSearchAccountModalShow(true);
                    console.log("fetit fidderrrrr");
                    return;
                }
                
            }
            props.setClient({
                id:"",
                name:"",
                RefNo:"",
                date:"",
                time:"",
            })
            // props.ssi([])
            // localStorage.setItem("sales", "")
          //  props.setsInvoices([]);
           

            console.log("ll");
            const currentDate = new Date();
            const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
            const formattedTime = `T${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
            
            props.setClient({
                id: e["AccNo"],
                name: e["AccName"],
                date: formattedDate,
                time: formattedTime,
                RefNo:props.changingAccountInvoiceFromDB=='' || props.changingAccountInvoiceFromDB==undefined?'':props.changingAccountInvoiceFromDB
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
                    time: formattedTime,
                    RefNo:props.changingAccountInvoiceFromDB=='' || props.changingAccountInvoiceFromDB==undefined?'':props.changingAccountInvoiceFromDB
                },

                items: props.si,
                RemovedItems:props.RemovedItems
            });
            localStorage.setItem("InvoiceHistory","");
            props.setpropertiesAreEqual(false);

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
            if (uprice==""|| uprice ==null || uprice == undefined){
                uprice = 0;
            
            }
            setsItemInitial(uprice);
              

            setsItemPrice(uprice);
            if(sItemPPrice=="U"){
                setsItemTotal(((sItemPrice* sItemTotalPieces)*(1-sItemDiscount/100)*(1 +sItemTax/100)).toFixed(3));
            }
            else if(sItemPPrice=="P"){
                
                setsItemTotal(((sItemPrice* sItemQty)*(1-sItemDiscount/100)*(1 +sItemTax/100)).toFixed(3));

                
                // else if(sItemPPrice=="2"){
                //     setsItemTotal((((sItemPrice/sItemPQty)* sItemQty)*(1-sItemDiscount/100)*(1 +sItemTax/100)).toFixed(3));

                // }
                // else if(sItemPPrice=="1"){
                //     setsItemTotal((((sItemPrice/(sItemPQty*sItemPQUnit)* sItemQty)*(1-sItemDiscount/100)*(1 +sItemTax/100)).toFixed(3)));
                // }

            }
            //setsItemTotal(((sItemPrice* sItemTotalPieces)*(1-sItemDiscount/100)*(1 +sItemTax/100)).toFixed(3));
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
            props.setpropertiesAreEqual(false);
          

        }
    }
    function addItem() {
        let tempsi = [];
        
        let tax = sItemTax == "" || undefined ? 0 : sItemTax;
        let uprice = sItemPrice == "" || undefined ? 0 : sItemPrice;
        let discount = sItemDiscount == "" || undefined ? 0 : sItemDiscount;
        
        
        let tempQty = sItemQty == "" || undefined || 0 ? 1 : sItemQty;
        console.log(uprice);
        console.log(discount);
        console.log(tax);
        console.log(sItemQty);

        
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
                uprice: parseFloat(uprice).toFixed(3),
                discount: discount,
                branch: sItemBranch,
                lno : Lno,
                PQty: sItemPQty,
                PUnit:sItemPUnit,
                tax: tax,
                TaxTotal: sItemTaxTotal.toFixed(3),
                Total:sItemPPrice=="U"?
                (parseFloat(uprice) * parseFloat(sItemTotalPieces) * (1 - parseFloat(discount) / 100) * (1 + parseFloat(sItemTax) / 100)).toFixed(3):sItemPPrice=="P"?(parseFloat(uprice) * parseFloat(sItemQty) * (1 - parseFloat(discount) / 100) * (1 + parseFloat(sItemTax) / 100)).toFixed(3):(parseFloat(uprice) * parseFloat(sItemQty) * (1 - parseFloat(discount) / 100) * (1 + parseFloat(sItemTax) / 100)).toFixed(3),
                Note: sItemNote,
                DateT: formattedDate,
                TimeT: formattedTime,
                PQUnit: sItemPQUnit,
                PType: sItemPType,
                TotalPieces:sItemTotalPieces,
                PPrice:sItemPPrice,
                BPUnit:sItemDBPUnit,
                SPUnit:sItemDSPUnit,
                InitialPrice:sItemInitial


            },
        ];
        console.log("*//////////////////////*");
        console.log(tempsi);
        if(sItemPPrice=="U"){
            setsItemTotal((parseFloat(uprice) * parseFloat(sItemTotalPieces) * (1 - parseFloat(discount) / 100) * (1 + parseFloat(sItemTax) / 100)).toFixed(3));
        }else if(sItemPPrice=="P"){
            setsItemTotal((parseFloat(uprice) * parseFloat(sItemQty) * (1 - parseFloat(discount) / 100) * (1 + parseFloat(sItemTax) / 100)).toFixed(3));
        }
        
        console.log(sItemTotal);
        console.log("--=");
        console.log("hhhhhhhhhhhhhhh", parseFloat(uprice).toFixed(3));
        // if (parseFloat(uprice).toFixed(3)==0.000){
        //     console.log("uiuiuuuuuuuiuiiuu");
        //     setErrorMessage("Unit Price cannot be 0. Please enter a valid value.");
        //     return;
        // }
        props.ssi(tempsi);
        setModalItems(false);
        props.handleSave({
            accName: props.Client,
            items: tempsi,
            RemovedItems:props.RemovedItems
        });
        props.setpropertiesAreEqual(false)
        props.setvInput("");
        props.setOption([]);
        document.getElementById("tf").focus();
    }
}
);

export default IdSelect;
