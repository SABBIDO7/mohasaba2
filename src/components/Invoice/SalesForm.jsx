import backbutton from "../../media/backbutton.png";
import Select from "react-select";
import React, { useState, useEffect,useRef  } from "react";
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
import { faEdit, faSave  } from '@fortawesome/free-solid-svg-icons';

export default function SalesForm(props) {
    const [vInput, setvInput] = useState("");

    const [sOption, setsOption] = useState("Accounts");

    //idselect modal props
    const [modalShow, setModalShow] = useState(false);

    const [IdOptions, setIdOptions] = useState([]);


    const [show, setShow] = useState(false);

    const [EditItem, setEditItem] = useState({});
    const [EditQty, setEditQty] = useState("");
    const [EditPrice, setEditPrice] = useState("");
    const [EditBranch, setEditBranch] = useState("");
    const [EditTax, setEditTax] = useState("");
    const [EditDiscount, setEditDiscount] = useState("");
    const [EditLno,setEditLno] = useState("");

    const [EditIdx, setEditIdx] = useState(0);
    const [EditTotal, setEditTotal] = useState(0);
    const [EditDBPUnit,setEditDBPUnit] = useState();
    const [EditDPUnit,setEditDPUnit] = useState();
    const [EditDSPUnit,setEditDSPUnit] = useState();
    const [EditPPrice,setEditPPrice] = useState();

    //confirm modal state
    const [confirmModalShow, setConfirmModalShow] = useState(false);

    //discard Modal
    const [discardModalShow, setDiscardModalShow] = useState(false);

    
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [noteInput, setNoteInput] = useState("");
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [fTotal,setFtotal] = useState(0)
    const [fTax,setFTax] = useState(0)
    const [sSA, setsSA] = useState();
    const [sInvoices, setsInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState("");
    const [NewInvoiceAlertModalShow, setNewInvoiceAlertModalShow] = useState(false);
    const [EmptyAlertModalShow, setEmptyAlertModalShow] = useState(false);
    const [ItemsWithoutAccount, setItemsWithoutAccount] = useState(false);

    const [discardOldInvoiceModalShow, setDiscardOldInvoiceModalShow] = useState(false);
    const [changeAccountModalShow, setchangeAccountModalShow] = useState(false);
    const [SearchAccountModalShow, setSearchAccountModalShow] = useState(false);
    const [switchBetweenInvoicesModalShow, setswitchBetweenInvoicesModalShow] = useState(false);
    const [passSelectedInvoiceToModal,setpassSelectedInvoiceToModal] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [changingAccountInvoiceFromDB,setchangingAccountInvoiceFromDB] = useState('')
    const [EditType,setEditType]= useState("")
    const [EditTotalPieces,setEditTotalPieces] = useState();
    const [newAccount,setnewAccount] = useState("");

    const inputRef = useRef(null);
    const selectRef = useRef(null);
    const selectInvRef = useRef(null);
    const childRef = useRef();
    //let propertiesAreEqual = true;
    let finalTotal = 0;
    let finalTax = 0;

    useEffect(() => {
        // Calculate total pieces based on other inputs whenever they change
        const calculateTotalPieces = () => {
            let total = 0;
            if (EditType === "3") {
                total = EditQty * EditItem["PQty"] * EditItem["PQUnit"];
            } else if (EditType === "2") {
                total = EditQty * EditItem["PQUnit"];
            } else {
                total = EditQty;
            }
            setEditTotalPieces(parseFloat(total).toFixed(3));
        };

        calculateTotalPieces();
    }, [EditBranch,EditDiscount,EditPrice,EditQty,EditTax,EditType]);

// Function to handle the change event of the select element
const handleSelectChange = (e) => {
    const selectedValue = e;
    console.log("hpooooowwwwwwwww");
    console.log(e);
    console.log(selectedValue);
    localStorage.setItem("sales","");
    if (selectedValue==""){
        
        setSelectedInvoice("");
        props.setSelectedItems([]);
        props.setClient({
            id:"",
            name:"",
            RefNo:"",
            date:"",
            time:"",
        });
    }else{
        setSelectedInvoice(selectedValue);
        localStorage.setItem("InvoiceHistory", selectedValue);
         // Send Axios request with the selected value
    axios({
        method: 'get', // or 'get', 'put', 'delete', etc.
        url: props.url + "/moh/getInvoiceDetails/" + localStorage.getItem("compname")+"/"+ localStorage.getItem("username") + "/"+ selectedValue +"/", 
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
        }
    })
    .then((response) => {
        // Handle success response
        console.log("Response:", response);
        console.log(response.data.Invoices[0]["RefNo"]);
        
        props.setSelectedItems(response.data.Invoices);
        props.setClient(response.data.InvProfile[0]);
        //
        handleSave({
            accName: {
                id: response.data.InvProfile[0]["id"],
                name: response.data.InvProfile[0]["name"],
                date: response.data.InvProfile[0]["date"],
                time: response.data.InvProfile[0]["time"],
                RefNo:response.data.InvProfile[0]["RefNo"]
            },

            items: response.data.Invoices,
        });
        
    })
    .catch((error) => {
        // Handle error
        console.error("Error:", error);
    });
    }

   
};

    const handleNoteSave = () => {
        // Update note for the selected item
        if (selectedItemIndex !== null) {
            const updatedItems = [...props.SelectedItems];
            if(updatedItems[selectedItemIndex]["Note"] !==noteInput){
                const currentDate = new Date();
                const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
                const formattedTime = `T${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
                updatedItems[selectedItemIndex]["DateT"]=formattedDate;
                updatedItems[selectedItemIndex]["TimeT"]=formattedTime;
                console.log("rouhhhhh1");
                props.setpropertiesAreEqual(false);
            }
            updatedItems[selectedItemIndex]["Note"] = noteInput;
            //?????
            props.setSelectedItems(updatedItems);
            localStorage.setItem("sales", updatedItems);

            setShowNoteModal(false);
            setNoteInput("");
        }
    };

    const handleSave = (e) => {
        const jsonString = JSON.stringify(e);
        console.log("//*/*/*/*/*/*/*////");
        console.log(jsonString);
        localStorage.setItem("sales", jsonString);
        props.setpropertiesAreEqual(true);

    };

    const handleRetrieve = () => {
        
        const jsonString = localStorage.getItem("sales");
        if (jsonString!=[]){
            const retrievedJson = JSON.parse(jsonString);
            
            props.setClient(retrievedJson["accName"]);
            props.setSelectedItems(retrievedJson["items"]);
            setSelectedInvoice(localStorage.getItem("InvoiceHistory"));
            console.log("POPOPOPOP[OPO")
            console.log(retrievedJson["accName"]);
            console.log("drinkdrink");
            console.log(localStorage.getItem("InvoiceHistory"));
        

        }
       
    };

    const getInvoicesHistory = () =>{
        

        axios({
            method: "get",
            url: props.url + "/moh/getInvoiceHistory/" + localStorage.getItem("compname") + "/"+localStorage.getItem("username") + "/",
            headers: { content_type: "application/json" },
        }).then((res) => {
            
            if (res.data.Info == "authorized") {
                
                setsInvoices(res.data.Invoices);
                console.log(sInvoices);
                console.log("anehon")
            } else if (res.data.Info == "Failed") {
                setsInvoices([]);
            }
            
        }).catch((error) => {
            console.error("Error in getInvoicesHistory:", error);
            // Handle error (e.g., set error state)
        });
        
    };

    useEffect(() => {
        try {
            setErrorMessage('');
            handleRetrieve();
            
         

        } catch (error) {
            console.log("ERROR")
        }
    }, []);
    useEffect(() => {
        try {
          
            
            getInvoicesHistory();
           // handleSelectChange("");
           // selectRef.current.value = "Accounts";
           //setSelectedInvoice("");
            setsOption("Accounts");
            selectInvRef.current.value = "" ;
        } catch (error) {
            console.log("ERROR");
        }
    }, [props.afterSubmitModal]);



    return (
        <>
            <div className="w-[99vw] h-[85vh] m-auto flex flex-col pt-2  ">
                <div className="flex flex-row w-full h-fit">
                    <img
                        src={backbutton}
                        alt="Back"
                        className="h-8 mr-2"
                        onClick={() =>{
                            //if(selectedInvoice!=""){
                                if(props.setpropertiesAreEqual==false){
                                
                                console.log(props.propertiesAreEqual);
                                console.log("lklklkk")
                                console.log(selectedInvoice);
                                setDiscardOldInvoiceModalShow(true)
                            }
                            else{
                                props.inv("");
                            }
                            
                        } }
                    />
                    <h3>Sales Invoice</h3>
                </div>
                <div className="my-2 px-2 flex flex-row items-center max-w-[60rem] mx-auto">
                    <div className=" font-semibold text-lg ">Search:</div>
                    <input
                        type={"text"}
                        ref={inputRef}
                        className="block rounded-md w-[18rem] h-[2.3rem] border-black mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={"Value"}
                        value={vInput}
                        onChange={(e) => {
                            setvInput(e.target.value);
                        }}
                        id={"tf"}
                    />
                    <select
                        className="p-[0.6rem] rounded border-black border-[1px] col-auto"
                        value={sOption}
                        ref={selectRef}
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
                            if((props.Client["id"]=="" || props.Client["id"] == undefined) && sOption=="Items"){
                                console.log("salmmmmmmmmmm");
                                setItemsWithoutAccount(true);

                            }
                            // else if (props.Client["id"] != "" && props.Client["id"] !=undefined && sOption=="Accounts"){
                            //     console.log("tiriririoro");
                            //     console.log(props.Client);
                            //     console.log(selectedInvoice);
                            //     setSearchAccountModalShow(true);
                            // }

                            
                            // else if (((selectedInvoice!="" || props.Client["id"]!="" || props.Client["id"] != undefined) && sOption=="Accounts" && props.SelectedItems!=[]) || (selectedInvoice!="" && sOption=="Accounts")){
                            //     console.log("tiriririoro");
                            //     console.log(props.Client["id"]);
                            //     console.log(selectedInvoice);
                            //     setSearchAccountModalShow(true);
                            // }
                            else{
                                console.log(selectedInvoice);
                                console.log("][][][][][]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]][]");
                                console.log(props.Client["id"]);
                                console.log(sOption);
                                getInvoiceOptions();
                                setModalShow(true);
                            }
                            
                        }}
                    />
                </div>
                <div className=" w-[95%] shadow-lg mx-auto h-[40rem] rounded p-2 max-w-[60rem]">
                    <div className="flex flex-col justify-between h-[38.5rem]">
                        <h3 className="text-center">Sales Form</h3>
                        <div className=" flex flex-row align-middle items-center mb-2 justify-center">
                            <div className=" text-xl font-semibold">Client ID:</div>
                            <div>
                                <input
                                    type={"text"}
                                    className="block rounded-md w-[80%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder={"Client Id"}
                                    value={props.Client["id"]}
                                    disabled
                                    // onChange={(e) => {
                                    //     setClient(e.target.value);
                                    //     document.getElementById("tf").focus()
                                    // }}
                                />
                            </div>
                            <div className=" text-xl font-semibold mr-1">Invoice History:</div>
                            
                            <select
                                className="p-[0.6rem] rounded border-black border-[1px] col-auto"
                                
                                    ref={selectInvRef}
                                    onChange={(e) =>{
                                        if(props.propertiesAreEqual==false){
                                            console.log("naaaammmmmmm")
                                            console.log(e.target.value);
                                            console.log(props.propertiesAreEqual);
                                            let intervalue= e.target.value;
                                            setpassSelectedInvoiceToModal(intervalue);
                                            setswitchBetweenInvoicesModalShow(true);
                                        }
                                        else{
                                            handleSelectChange(e.target.value);
                                        }
                                        

                                    }
                                       
                                    
                                    }
                                    value={selectedInvoice}
                                    
                                >
                                    <option value="">Choose invoice</option>
                                    {sInvoices.map((inv,idx)=>{
                                        return (
                                            <option value={inv["RefNo"]} key={idx}>{inv["RefType"]}_{inv["RefNo"]}_{inv["AccNo"]}</option>

                                        );
                                            })
                                        }
                            </select>
                            <div className="ml-2">
                            {/* <button
                            className="btn btn-danger"
                             onClick={() => {
                                props.setClient({
                                    id:"",
                                    name:"",
                                    RefNo:"",
                                    date:"",
                                    time:"",
                                });
                                props.setSelectedItems([]);
                                localStorage.setItem("sales", "");
                                props.setsInvoices([]);
                                
                              
                            }}>
                                Clear
                            </button> */}
                            </div>
                        </div>
                        <div className=" flex flex-row align-middle items-center mb-2 justify-center">
                            <div className=" text-xl font-semibold mr-3"> Name:</div>
                            <div>
                                {props.Client["name"]}
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
                                        <th>Note</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {

                                      //  console.log(SelectedItems);
                                      props.SelectedItems.map((si, idx) => {
                                        console.log(si);
                                        let total;
                                        if(si["PPrice"]=="U"){
                                            total =  parseFloat((si["uprice"]* si["TotalPieces"])*(1-si["discount"]/100));
                                        }
                                        else if(si["PPrice"]=="P"){
                                            total =  parseFloat((si["uprice"]* si["qty"])*(1-si["discount"]/100));
                                        }

                                    
                                        // let total =
                                        //     (si["TotalPieces"] * si["uprice"])  *(1 - si["discount"] / 100);

                                        let tax = si["tax"] == "" ? 0 : si["tax"];                            
                                        si["tax"] = tax;
                                        let taxAmount = (total * tax) / 100;
                                        finalTotal = finalTotal + total;
                                       // setFtotal(finalTotal);
                                        finalTax = finalTax + taxAmount;
                                       // setFTax(finalTax);
                                        si["TaxTotal"] = taxAmount.toFixed(3);
                                        let totalf;
                                        if(si["PPrice"]=="U"){
                                            totalf =  parseFloat((si["uprice"]* si["TotalPieces"])*(1-si["discount"]/100)*(1 +si["tax"]/100)).toFixed(3);
                                        }
                                        else if(si["PPrice"]=="P"){
                                            totalf =  parseFloat((si["uprice"]* si["qty"])*(1-si["discount"]/100)*(1 +si["tax"]/100)).toFixed(3);
                                        }
                                        si["Total"] = totalf;
                                        return (
                                            <tr
                                                key={idx}
                                                className=" whitespace-nowrap hover:bg-blue-200 select-none "
                                               >

                                                <td>{si["lno"]}</td>
                                                <td>{si["no"]}</td>
                                                <td>{si["name"]}</td>
                                                <td>{si["branch"]}</td>
                                                <td>{si["TotalPieces"]}</td>  
                                                <td>{si["uprice"]}</td>
                                                <td>{si["discount"]}%</td>
                                                <td>{si["tax"]}%</td>
                                                <td>{si["Total"]}</td>
                                                
                                                <td>
                                                    {/* Render note icon/button */}
                                                    <button
                                                        className="text-blue-500 hover:text-blue-700"
                                                        onClick={() => {
                                                            setShowNoteModal(true);
                                                            setSelectedItemIndex(idx);
                                                            setErrorMessage('');
                                                            setNoteInput(si["Note"] || "");
                                                        }}
                                                    >
                                                        Note
                                                    </button>
                                                </td>
                                                
                                              {  /*<td>{taxAmount.toFixed(3)}</td>*/}
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
                                                            setEditLno(si["lno"]);
                                                            setEditTotal(si["Total"]);
                                                            setEditTotalPieces(si["TotalPieces"]);
                                                            setEditType(si["PType"]);
                                                            setEditDBPUnit(si["BPUnit"]);
                                                            setEditDPUnit(si["PUnit"]);
                                                            setEditDSPUnit(si["SPUnit"]);
                                                            setEditPPrice(si["PPrice"]);

                                                            
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
                                            {/* Note Modal */}
                            <Modal show={showNoteModal} onHide={() => setShowNoteModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Note</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <textarea
                                        value={noteInput}
                                        onChange={(e) => setNoteInput(e.target.value)}
                                        className="form-control"
                                        rows={5}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowNoteModal(false)}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleNoteSave}>
                                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                                        Save Note
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <div className="flex flex-col justify-start ">
                            <div className=" font-semibold text-xl ">
                                <div>
                                    {finalTotal.toFixed(3)} + {finalTax.toFixed(3)}
                                </div>
                                Total: {(finalTotal + finalTax).toFixed(3)}
                            </div>
                            <div className="flex flex-row justify-between max-w-[60rem]">
                                <Button className="my-2" variant="danger" onClick={() => {
                                    setDiscardModalShow(true)
                                }}>
                                    Exit
                                </Button>
                                <Button className="my-2" variant="primary" onClick={() => {
                                    //if(props.Client["id"]!=undefined){
                                    //     console.log("/*//////////");
                                    //     console.log(props.SelectedItems.length);
                                    //     console.log(props.Client["id"]);
                                    //     console.log(props.setSelectedItems.length);
                                   // if((props.Client["id"]!=undefined && props.Client["id"]!="") || props.SelectedItems.length > 0){
                                    if(props.propertiesAreEqual==false){
                                        console.log("hhey")
                                        console.log(props.Client["id"]);
                                        console.log(props.SelectedItems);
                                        setNewInvoiceAlertModalShow(true);
                                    }else{
                                        clearInvoice();

                                    }
                                         
                                        

                                    
                                    
                                    // inputRef.current.focus();
                                    //selectRef.current.value="Accounts";
                                    

                                    
                                    
                                }}>
                                    Clear Invoice
                                </Button>
                                
                                <Button
                                    className="my-2"
                                    variant="primary"
                                    onClick={() => {
                                        if((props.SelectedItems).length==0 || props.Client==""){
                                            setEmptyAlertModalShow(true);
                                            console.log("//**/////");
                                            console.log(props.Client);
                                        }else{
                                        
                                            setConfirmModalShow(true);
                                        }
                                        
                                    }}>
                                    Save & New
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <IdSelect
            ref={childRef}
                options={IdOptions}
                setOption={setIdOptions}
                show={modalShow}
                setModalShow={setModalShow}
                sOption={sOption}
                setsOption={setsOption}
                setClient={props.setClient}
                Client={props.Client}
                si={props.SelectedItems}
                ssi={props.setSelectedItems}
                setvInput={setvInput}
                branches={props.branches}
                handleSave={handleSave}
                setSelectedInvoice={setSelectedInvoice}
                setsInvoices={setsInvoices}
                changingAccountInvoiceFromDB={changingAccountInvoiceFromDB}
                setchangingAccountInvoiceFromDB={setchangingAccountInvoiceFromDB}
                propertiesAreEqual={props.propertiesAreEqual}
                setpropertiesAreEqual={props.setpropertiesAreEqual}
                SearchAccountModalShow={SearchAccountModalShow}
                setSearchAccountModalShow={setSearchAccountModalShow}
                newAccount={newAccount}
                setnewAccount={setnewAccount}
                sethandlingAccWhenChanging={props.sethandlingAccWhenChanging}
                handlingAccWhenChanging={props.handlingAccWhenChanging}
            />
           

            <Modal
            backdrop="static"
            keyboard={false}
                show={show}
                onHide={() => {
                    setShow(false);
                    setIdOptions([]);
                    setErrorMessage('');
                }}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{EditItem["name"]}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-6 py-4">
                    <div className="space-y-3">
                        
                        <div className="flex items-center">
                <label htmlFor="itemQty" className="w-1/4">Qty:</label>
                <div className="w-3/4 flex items-center space-x-2">
                    <img
                        src={minus}
                        alt="minus"
                        className="w-1/8 h-6 cursor-pointer"
                        onClick={() => {
                            setEditQty(parseInt(EditQty) - 1);
                        }}
                    />
                    <input
                        id="itemQty"
                        type="number"
                        className="w-1/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder={"Qty"}
                        value={EditQty}
                        onChange={(e) => {
                            setEditQty(e.target.value);
                        }}
                        style={{ '-moz-appearance': 'textfield', 'appearance': 'textfield' }}

                    />
                    <img
                        src={plus}
                        alt="plus"
                        className="w-1/8 h-6 cursor-pointer"
                        onClick={() => {


                            setEditQty(parseInt(EditQty) + 1);
                        }}
                    />
                        <select
                            id="itemType"
                            className="w-1/2 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                            value={EditType}
                            onChange={(e) => {
                                setEditType(e.target.value);
                            }}
                        >
                            {/* {EditDBPUnit && EditDBPUnit.trim() !== '' ? setEditType("3"): EditDPUnit && EditDPUnit.trim() !== ''?setEditType("2"):setEditType("1")} */}
                            {EditDBPUnit && EditDBPUnit.trim() !=="" && <option value="3">{EditDBPUnit}</option> }
                            
                            {EditDPUnit && EditDPUnit.trim() !=="" && <option value="2">{EditDPUnit}</option> }
                            {EditDSPUnit && EditDBPUnit.trim() !=="" && <option value="1">{EditDSPUnit}</option> }
                            
                           
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
                                value={parseFloat(EditType=="3"?(EditQty*EditItem["PQty"]* EditItem["PQUnit"]):EditType=="2"?( EditQty*EditItem["PQUnit"]):(EditQty)).toFixed(3)}
                                onChange={(e) => {
                                    setEditTotalPieces(parseFloat(EditType=="1"?(EditQty*EditItem["PQty"]* EditItem["PQUnit"]):EditType=="2"?(EditQty*EditItem["PQUnit"]):(EditQty)).toFixed(3));
                                }}
                                
                            />
                        </div>
                        <div className="flex items-center">
                <label htmlFor="itemBranch" className="w-1/4">Branch:</label>
                <select
                    id="itemBranch"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
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
                       
                        <div className="flex items-center">
                <label htmlFor="itemPrice" className="w-1/4">Uprice:</label>
                <input
              
                    type="number"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder={"Uprice"}
                    value={EditPrice}
                    onChange={(e) => {
                        setEditPrice(e.target.value);
                    }}
                />
            </div>
                        

                       
                        <div className="flex items-center">
                            <label htmlFor="itemDiscount" className="w-1/4">Discount %:</label>
                            <input
                            
                                    type={"number"}
                                className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder={"Discount"}
                                value={EditDiscount}
                                onChange={(e) => {
                                    setEditDiscount(e.target.value);
                                }}
                            />
                        </div>
                        
                        <div className="flex items-center">
                            <label htmlFor="itemTax" className="w-1/4">Tax %:</label>
                            <input
                                
                                type={"number"}
                                className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder={"Tax"}
                                value={EditTax}
                                onChange={(e) => {
                                    setEditTax(e.target.value);
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
                                value={EditPPrice=="U"?
                                    parseFloat((EditPrice* EditTotalPieces)*(1-EditDiscount/100)*(1 +EditTax/100)).toFixed(3)
                                :EditPPrice=="P"? parseFloat((EditPrice* EditQty)*(1-EditDiscount/100)*(1 +EditTax/100)).toFixed(3)
                                : parseFloat((EditPrice* EditQty)*(1-EditDiscount/100)*(1 +EditTax/100)).toFixed(3)
                            }
                                onChange={(e) => {
                                    setEditTotal(e.target.value);
                                }}
                                
                            />
                        </div>
                        {errorMessage && (
                    <div className="text-red-500 mb-2">
                        {errorMessage}
                    </div>
                )}
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
                                    setErrorMessage('');
                                }}>
                                Close
                            </Button>
                            <div className="w-3"></div>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    
                                    let tempa = props.SelectedItems;

                                    let tempQty;
                                    if (EditQty === 0) {
                                        tempQty = 1;
                                    } else {
                                        tempQty = EditQty;
                                    }
                                    
                                    let PQUnitT = tempa[EditIdx]["PQUnit"];
                                    let PQtyT = tempa[EditIdx]["PQty"];
                                    let PUnitT = tempa[EditIdx]["PUnit"];
                                    let DateTT = tempa[EditIdx]["DateT"];
                                    let TimeTT = tempa[EditIdx]["TimeT"];
                                    
                                    let NoteT = tempa[EditIdx]["Note"];
                                    let PPriceT = tempa[EditIdx]["PPrice"];
                                    let oldtempa= tempa[EditIdx];
                                    
                                    
                                    tempa[EditIdx] = {
                                        no: EditItem.no,
                                        name: EditItem.name,
                                        qty: tempQty,
                                        uprice: parseFloat(EditPrice).toFixed(3),
                                        discount: EditDiscount,
                                        branch: EditBranch,
                                        lno :EditLno,
                                        PQty: PQtyT,
                                        PUnit:PUnitT,
                                        tax: EditTax,
                                        TaxTotal: ((EditPrice* EditTotalPieces)*(1-EditDiscount/100)*(EditTax/100)).toFixed(3),
                                        Total:EditPPrice=="U"?
                                        parseFloat((EditPrice* EditTotalPieces)*(1-EditDiscount/100)*(1 +EditTax/100)).toFixed(3)
                                    :EditPPrice=="P"? parseFloat((EditPrice* EditQty)*(1-EditDiscount/100)*(1 +EditTax/100)).toFixed(3)
                                    : parseFloat((EditPrice* EditQty)*(1-EditDiscount/100)*(1 +EditTax/100)).toFixed(3),
                                        Note: NoteT,
                                        DateT: DateTT,
                                        TimeT: TimeTT,
                                        PQUnit: PQUnitT,
                                        PType:EditType,
                                        TotalPieces:EditTotalPieces,
                                        PPrice:PPriceT
                                    };
                                    console.log("edipricee",tempa[EditIdx]["uprice"]);
                                    let pAreEqual= true;
                                    if (oldtempa["qty"]!==tempa[EditIdx]["qty"]){
                                        pAreEqual=false;
                                    }
                                    
                                    
                                    if(oldtempa["uprice"] !== tempa[EditIdx]["uprice"]){
                                        pAreEqual = false;
                                    }
                                    if(oldtempa["branch"] !== tempa[EditIdx]["branch"]){
                                        pAreEqual = false;
                                    }
                                    if(oldtempa["discount"] !== tempa[EditIdx]["discount"]){
                                        pAreEqual = false;
                                    }
                                    if(oldtempa["tax"] !== tempa[EditIdx]["tax"]){
                                        pAreEqual = false;
                                    }

                                    // for (const key in oldtempa) {
                                    //     if (key === "Total" || key==="TaxTotal") {
                                    //         console.log("FETTT TOAL");
                                    //         continue; // Skip the Total field
                                    //     }
                                    //     const oldValue = parseFloat(oldtempa[key]).toFixed(3); // Convert to number and fix precision
                                    //     const newValue = parseFloat(tempa[EditIdx][key]).toFixed(3); 
                                    //     if (oldValue !== newValue) {
                                    //         propertiesAreEqual = false;
                                    //         console.log(oldtempa[key]);
                                    //         console.log(tempa[EditIdx][key]);
                                    //         console.log(propertiesAreEqual);
                                    //         break;
                                    //     }
                                    // }
                                    if (tempa[EditIdx]["uprice"]==0.000){
                                        setErrorMessage("Unit Price cannot be 0. Please enter a valid value.");
                                        return; 

                                    }
                                    else
                                    if(!pAreEqual){
                                        console.log("rouhhhhhhhhhhhh")
                                        
                                        props.setpropertiesAreEqual(false)
                                        const currentDate = new Date();
                                    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
                                        const formattedTime = `T${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
                                        tempa[EditIdx]["DateT"]=formattedDate;
                                        tempa[EditIdx]["TimeT"] = formattedTime;
                                    }
                                    setErrorMessage('');
                                   
                                        setShow(false);
                                    setIdOptions([]);
                                    
                                    props.setSelectedItems(tempa);
                                }}>
                                Apply
                            </Button>
                        </div>
                        <div className="flex flex-row align-middle justify-between">
                            <Button
                                variant="danger"
                                onClick={() => {
                                    setShow(false);

                                    let tempa = [...props.SelectedItems]; // Create a copy of SelectedItems array
                                    tempa.splice(EditIdx, 1); // Remove the item at index EditIdx
                                    tempa.forEach((item, index) => {
                                        item.lno = index + 1; // Update lno starting from 1 and incrementing by 1
                                    });
                                    props.setSelectedItems(tempa);
                                    setErrorMessage('');
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
                type={"SA_AP"}
                Client={props.Client}
                items={props.SelectedItems}
            />
            <DiscardInvoiceModal modalShow={discardModalShow} setModalShow={setDiscardModalShow} callBack={discardInvoice} />
            <Modal
                show={NewInvoiceAlertModalShow}
                onHide={() => setNewInvoiceAlertModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Cancel Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are You Sure You Want To Clear Current Invoice?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex flex-row w-full justify-around">
                        <Button onClick={()=>setNewInvoiceAlertModalShow(false)}>No</Button>
                        <Button variant="danger" onClick={()=>{
                        //props.callBack()

                      clearInvoice();
                        
                        }
                        }
                        >Yes</Button>
                    </div>
                </Modal.Footer>
            </Modal>
            
            <Modal
                show={discardOldInvoiceModalShow}
                onHide={() => setDiscardOldInvoiceModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Unsaved Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are You Sure You Want To Ignore Current Invoice?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex flex-row w-full justify-around">
                        <Button onClick={()=>setDiscardOldInvoiceModalShow(false)}>No</Button>
                        <Button variant="danger" onClick={()=>{
                        //props.callBack()
                        props.inv("");
                        setsOption("Accounts");
                        setvInput("");
                        setSelectedInvoice("")
                        setDiscardOldInvoiceModalShow(false);
                        props.setClient({
                            id:"",
                            name:"",
                            RefNo:"",
                            date:"",
                            time:"",
                        });
                        props.setSelectedItems([]);
                        localStorage.setItem("sales", "");
                        props.setsInvoices([]);
                        localStorage.setItem("InvoiceHistory","");
                        
                        
                        }
                        }
                        >Yes</Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal
                show={SearchAccountModalShow}
                onHide={() => setSearchAccountModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Change Invoice Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are You Sure You Want To Change the Account Invoice From {props.Client.id} to {newAccount} ?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex flex-row w-full justify-around">
                        <Button onClick={()=>setSearchAccountModalShow(false)}>No</Button>
                        <Button variant="danger" onClick={()=>{
                        //props.callBack()
                        
                        
                       
                       getInvoiceOptions();
                        setModalShow(true);
                       // setSelectedInvoice("");
                        setSearchAccountModalShow(false);
                        childRef.current.selectHandler(props.handlingAccWhenChanging,"fromParent");
                        
                        
                        
                        }
                        }
                        >Yes</Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal
                show={EmptyAlertModalShow}
                onHide={() => setEmptyAlertModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Empty Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{(props.Client["id"])==""? "No Account Choosen" :"No Items in your invoice"}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex flex-row w-full justify-around">
                        
                        <Button variant="danger"  
                        onClick={()=>setEmptyAlertModalShow(false)}
                        >Ok</Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal
                show={ItemsWithoutAccount}
                onHide={() => setItemsWithoutAccount(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Empty Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{"No Account Choosen Yet."}<br /> {"Please select Account first"}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex flex-row w-full justify-around">
                        
                        <Button variant="danger"  
                        onClick={()=>setItemsWithoutAccount(false)}
                        >Ok</Button>
                    </div>
                </Modal.Footer>
            </Modal>


            <Modal
                show={switchBetweenInvoicesModalShow}
                onHide={() => setswitchBetweenInvoicesModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Unsaved Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>You cannot Switch to Another Account Without saving the changes</h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex flex-row w-full justify-around">
                        <Button onClick={()=>setswitchBetweenInvoicesModalShow(false)}>Ok</Button>
                        {/* <Button onClick={()=>setswitchBetweenInvoicesModalShow(false)}>No</Button> */}
                        {/* <Button variant="danger" onClick={() => {
                            setSelectedInvoice(passSelectedInvoiceToModal);
                            console.log(".--.");
                            console.log(passSelectedInvoiceToModal);
                            handleSelectChange(passSelectedInvoiceToModal); // Pass the event as an argument
                            props.setpropertiesAreEqual(true);
                            console.log(props.propertiesAreEqual);
                            setswitchBetweenInvoicesModalShow(false);
                            
                        
                        
                        
                        }
                        }
                        >Yes</Button> */}
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
    function getInvoiceOptions() {
      
        console.log(changingAccountInvoiceFromDB);
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

                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function discardInvoice(){
        props.setClient({
            id:"",
            name:"",
            RefNo:"",
            date:"",
            time:"",
        });
        props.setSelectedItems([]);
        localStorage.setItem("sales", "");
        props.setpropertiesAreEqual(true);
        setSelectedInvoice("");
        console.log("selectedInvoice");
        console.log(props.selectedInvoice);
    }
    function clearInvoice(){
        setsOption("Accounts");
  
        props.setpropertiesAreEqual(true);//lola
        setvInput("");
        setSelectedInvoice("");
        setNewInvoiceAlertModalShow(false);
        props.setClient({
            id:"",
            name:"",
            RefNo:"",
            date:"",
            time:"",
        });
        props.setSelectedItems([]);
        localStorage.setItem("sales", "");
       // setsInvoices([]);
        
        setSelectedInvoice("");
        inputRef.current.focus();
    }

}
