import backbutton from "../../media/backbutton.png";
import Select from "react-select";
import React, { useState, useEffect, useRef } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faLock } from "@fortawesome/free-solid-svg-icons";
import "../../index.css"; // Import the CSS file

export default function SalesForm(props) {
  const [vInput, setvInput] = useState("");

  const [sOption, setsOption] = useState("Accounts");

  //idselect modal props
  const [modalShow, setModalShow] = useState(false);

  const [IdOptions, setIdOptions] = useState([]);

  const [show, setShow] = useState(false);

  const [EditItem, setEditItem] = useState({});
  const [EditQty, setEditQty] = useState("");
  const [EditPrice, setEditPrice] = useState(0);
  const [EditBranch, setEditBranch] = useState("");
  const [EditTax, setEditTax] = useState(0);
  const [EditDiscount, setEditDiscount] = useState("");
  const [EditLno, setEditLno] = useState("");

  const [EditIdx, setEditIdx] = useState(0);
  const [EditTotal, setEditTotal] = useState(0);
  const [EditDBPUnit, setEditDBPUnit] = useState();
  const [EditDPUnit, setEditDPUnit] = useState();
  const [EditDSPUnit, setEditDSPUnit] = useState();
  const [EditPPrice, setEditPPrice] = useState();

  //confirm modal state
  const [confirmModalShow, setConfirmModalShow] = useState(false);

  //discard Modal
  const [discardModalShow, setDiscardModalShow] = useState(false);

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [fTotal, setFtotal] = useState(0);
  const [fTax, setFTax] = useState(0);
  const [sSA, setsSA] = useState();
  const [sInvoices, setsInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [NewInvoiceAlertModalShow, setNewInvoiceAlertModalShow] =
    useState(false);
  const [EmptyAlertModalShow, setEmptyAlertModalShow] = useState(false);
  const [ItemsWithoutAccount, setItemsWithoutAccount] = useState(false);

  const [discardOldInvoiceModalShow, setDiscardOldInvoiceModalShow] =
    useState(false);
  const [changeAccountModalShow, setchangeAccountModalShow] = useState(false);
  const [SearchAccountModalShow, setSearchAccountModalShow] = useState(false);
  const [switchBetweenInvoicesModalShow, setswitchBetweenInvoicesModalShow] =
    useState(false);
  const [passSelectedInvoiceToModal, setpassSelectedInvoiceToModal] =
    useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [changingAccountInvoiceFromDB, setchangingAccountInvoiceFromDB] =
    useState("");
  const [EditType, setEditType] = useState("");
  const [EditTotalPieces, setEditTotalPieces] = useState();
  const [newAccount, setnewAccount] = useState("");
  const [EditPQUnit, setEditPQUnit] = useState();
  const [EditPQty, setEditPQty] = useState();
  const [EditInitialPrice, setEditInitialPrice] = useState();
  const [EditItemStockQty, setEditItemStockQty] = useState();
  const [DeleteLastItemFromHistory, setDeleteLastItemFromHistory] = useState();
  const [DeleteInvoiceModal, setDeleteInvoiceModal] = useState(false);
  const [DeletePermission, setDeletePermission] = useState(false);
  const [NoSavedToDelete, setNoSavedToDelete] = useState(false);
  const [performCalculation, setPerformCalculation] = useState(false);
  const [ErrorModal, setErrorModal] = useState(false);
  const [SwitchFormOption, setSwitchFormOption] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [SATdialogOpen, setSATDialogOpen] = useState(false);
  const formatter = new Intl.NumberFormat("en-US");
  const handleHeaderClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const formOptionProcessing = (option) => {
    // props.Client != undefined &&
    //     props.Client != "" &&
    //     props.Client != null) ||
    //   props.SelectedItems.length > 0 ||
    //   props.RemoveItems.length > 0 ||
    //   (selectedInvoice != undefined && selectedInvoice != undefined) ||
    console.log("107", props.selectedFormOption);
    localStorage.setItem("selectedFormOption", props.selectedFormOption);

    if (option === props.selectedFormOption && option != "SAT_AP") {
      setDialogOpen(false);
      return;
    } else if (localStorage.getItem(option) == "N") {
      setDeletePermission({
        show: true,
        message: "You don't Have Permission To Access " + option + " Form",
      });
      return;
    } else if (option == "SAT_AP") {
      setDialogOpen(false);
      setSATDialogOpen(true);
      console.log("fet bel satttt");
    } else if (option == "CR_AP" || option == "DB_AP") {
      setDialogOpen(false);
      console.log("125");
      if (props.propertiesAreEqual == false && props.SelectedItems.length > 0) {
        clearInvoice();
      }

      console.log("126", option);
      props.setSelectedFormOption(option);
      console.log("101010");
    } else {
      console.log("131", option);
      props.setSelectedFormOption(option);
      setDialogOpen(false);
      return;
    }
  };
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
      setEditTotalPieces(parseFloat(total));
    };

    calculateTotalPieces();
  }, [EditBranch, EditDiscount, EditPrice, EditQty, EditTax, EditType]);
  useEffect(() => {
    // Calculate total pieces based on other inputs whenever they change
    const calculateUprice = () => {
      let total = 0;
      if (EditType === "3") {
        total = EditInitialPrice;
      } else if (EditType === "2") {
        total = EditInitialPrice / EditPQty;
      } else {
        total = EditInitialPrice / (EditPQty * EditPQUnit);
      }
      setEditPrice(parseFloat(total));
      console.log("hsebet men use effect calculateUprice");
    };
    if (EditPPrice == "P" && performCalculation) {
      calculateUprice();
    }
  }, [EditType, performCalculation]);

  useEffect(() => {
    // Calculate total pieces based on other inputs whenever they change
    const UpriceZeroCheck = () => {
      console.log("klop2");
      if (parseFloat(EditPrice) == 0) {
        setErrorMessage("The Item Price is 0 !");
      } else {
        setErrorMessage("");
      }
    };

    UpriceZeroCheck();
  }, [EditPrice]);

  useEffect(() => {
    localStorage.setItem("propertiesAreEqual", props.propertiesAreEqual);

    console.log("bl use effect", localStorage.getItem("propertiesAreEqual"));
  }, [props.propertiesAreEqual]);

  useEffect(() => {
    if (props.RemovedItems.length != 0) {
      let accName = props.Client;
      let items = props.SelectedItems;
      let RemovedItems = props.RemovedItems;
      console.log(accName, items);
      let json = { accName, items, RemovedItems };
      //let json = {accName,items}
      let jsonString = JSON.stringify(json); // Convert data object to JSON string

      console.log("ghayrik entips", jsonString);
      localStorage.setItem("sales", jsonString);
      console.log("jinan", props.RemovedItems);
    }
  }, [props.RemovedItems]);

  useEffect(() => {
    if (props.selectedFormOption == "SA_AP") {
      props.setSelectedFormOptionDisplay("Sales Form");
    } else if (props.selectedFormOption == "SR_AP") {
      props.setSelectedFormOptionDisplay("SalesReturn Form");
    } else if (props.selectedFormOption == "OD_AP") {
      props.setSelectedFormOptionDisplay("Order Form");
    } else if (props.selectedFormOption == "PI_AP") {
      props.setSelectedFormOptionDisplay("Purchase Form");
    } else if (props.selectedFormOption == "PR_AP") {
      props.setSelectedFormOptionDisplay("PurchaseReturn Form");
    } else if (props.selectedFormOption == "SAT_AP") {
      props.setSelectedFormOptionDisplay("BranchTransfer Form");
    } else if (props.selectedFormOption == "CR_AP") {
      props.setSelectedFormOptionDisplay("ReceiptVoucher");
    } else if (props.selectedFormOption == "DB_AP") {
      props.setSelectedFormOptionDisplay("PaymentVoucher");
    }
    console.log("234", props.selectedFormOption);
    localStorage.setItem("selectedFormOption", props.selectedFormOption);

    setsOption("Accounts");
  }, [props.selectedFormOption]);

  // Function to handle the change event of the select element
  const handleSelectChange = (e) => {
    const selectedValue = e;
    console.log("hpooooowwwwwwwww");
    console.log(e);
    console.log(selectedValue);
    console.log("y1");
    localStorage.setItem("sales", "");
    props.setSATFromBranch();
    props.setSATToBranch();
    if (selectedValue == "") {
      setSelectedInvoice("");
      props.setSelectedItems([]);
      props.setRemovedItems([]);
      props.setClient({
        id: "",
        name: "",
        RefNo: "",
        date: "",
        time: "",
        balance: "",
        address: "",
        cur: "",
        Rate: "",
      });

      localStorage.setItem("InvoiceHistory", selectedValue);
      console.log("264", "sa_ap");
      props.setSelectedFormOption("SA_AP");
    } else {
      setSelectedInvoice(selectedValue);
      localStorage.setItem("InvoiceHistory", selectedValue);
      // Send Axios request with the selected value
      axios({
        method: "get", // or 'get', 'put', 'delete', etc.
        url:
          props.url +
          "/moh/getInvoiceDetails/" +
          localStorage.getItem("compname") +
          "/" +
          localStorage.getItem("username") +
          "/" +
          selectedValue +
          "/" +
          localStorage.getItem("SalePrice") +
          "/",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
      })
        .then((response) => {
          // Handle success response
          console.log("invProfile", response.data.InvProfile[0]);
          props.setSelectedItems(response.data.Invoices);
          props.setClient(response.data.InvProfile[0]);
          props.setSelectedFormOption(response.data.InvProfile[0]["RefType"]);
          props.setRemovedItems([]);
          //

          handleSave({
            accName: {
              id: response.data.InvProfile[0]["id"],
              name: response.data.InvProfile[0]["name"],
              date: response.data.InvProfile[0]["date"],
              time: response.data.InvProfile[0]["time"],
              RefNo: response.data.InvProfile[0]["RefNo"],
              balance: response.data.InvProfile[0]["balance"],
              address: response.data.InvProfile[0]["address"],
              cur: response.data.InvProfile[0]["cur"],
              Rate: response.data.InvProfile[0]["Rate"],
            },

            items: response.data.Invoices,
            RemovedItems: [],
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
      if (updatedItems[selectedItemIndex]["Note"] !== noteInput) {
        const currentDate = new Date();
        const formattedDate = `${currentDate
          .getDate()
          .toString()
          .padStart(2, "0")}/${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${currentDate.getFullYear()}`;
        const formattedTime = `T${currentDate
          .getHours()
          .toString()
          .padStart(2, "0")}:${currentDate
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${currentDate
          .getSeconds()
          .toString()
          .padStart(2, "0")}`;
        updatedItems[selectedItemIndex]["DateT"] = formattedDate;
        updatedItems[selectedItemIndex]["TimeT"] = formattedTime;
        console.log("rouhhhhh1");
        props.setpropertiesAreEqual(false);
      }
      updatedItems[selectedItemIndex]["Note"] = noteInput;
      //?????
      props.setSelectedItems(updatedItems);
      let accName = props.Client;
      console.log("accName", accName);

      let items = props.SelectedItems;
      let RemovedItems = props.RemovedItems;
      console.log(items);
      let json = { accName, items, RemovedItems };
      let jsonString = JSON.stringify(json); // Convert data object to JSON string

      console.log("ghayrik enti", jsonString);
      localStorage.setItem("sales", jsonString);

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
    console.log("ila hona w tantahi", jsonString);
    if (jsonString != []) {
      const retrievedJson = JSON.parse(jsonString);

      props.setClient(retrievedJson["accName"]);
      props.setSelectedItems(retrievedJson["items"]);
      if (
        retrievedJson["RemovedItems"] == undefined ||
        retrievedJson["RemovedItems"] == null
      ) {
        props.setRemovedItems("");
      } else {
        props.setRemovedItems(retrievedJson["RemovedItems"]);
      }

      props.setSATFromBranch(localStorage.getItem("SATFromBranch"));
      props.setSATToBranch(localStorage.getItem("SATToBranch"));

      setSelectedInvoice(localStorage.getItem("InvoiceHistory"));

      if (localStorage.getItem("propertiesAreEqual") == "true") {
        props.setpropertiesAreEqual(true);
      } else if (localStorage.getItem("propertiesAreEqual") == "false") {
        props.setpropertiesAreEqual(false);
      }
    }
  };

  const getInvoicesHistory = () => {
    axios({
      method: "get",
      url:
        props.url +
        "/moh/getInvoiceHistory/" +
        localStorage.getItem("compname") +
        "/" +
        localStorage.getItem("username") +
        "/",
      headers: { content_type: "application/json" },
    })
      .then((res) => {
        if (res.data.Info == "authorized") {
          setsInvoices(res.data.Invoices);
          console.log(sInvoices);
          console.log("anehon");
        } else if (res.data.Info == "Failed") {
          setsInvoices([]);
        }
      })
      .catch((error) => {
        console.error("Error in getInvoicesHistory:", error);
        // Handle error (e.g., set error state)
      });
  };

  const RemoveItem = (item, DeleteType) => {
    let tempsi = [];
    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate.getFullYear()}`;
    const formattedTime = `T${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    //let invoiceTotal = (finalTotal+finalTax) - item["Total"] ;
    console.log("Ana bel remove", item);
    let data = {
      item: item,
      DateDeleted: formattedDate,
      TimeDeleted: formattedTime,
      username: localStorage.getItem("username"),
      compname: localStorage.getItem("compname"),
      RefNo: selectedInvoice,
      type: localStorage.getItem("selectedFormOption"),
      DeleteType: DeleteType,
      //  invoiceTotal:invoiceTotal
    };
    if (props.RemovedItems == undefined) {
      props.setRemovedItems("");
    }

    tempsi = [...props.RemovedItems, data];
    props.setRemovedItems(tempsi);

    // axios({
    //     method: "post",
    //     url: props.url + "/moh/RemoveItemFromInvoiceHistory/",
    //     data: data,
    //     headers: { content_type: "application/json" },
    // }).then((res) => {

    //     if (res.data.Info == "authorized") {
    //     } else if (res.data.Info == "Failed") {
    //         setErrorModal({show:true,message:res.data.msg});
    //     }

    // }).catch((error) => {
    //     console.error("Error in getInvoicesHistory:", error);
    //     setErrorModal({show:true,message:error});
    //     // Handle error (e.g., set error state)
    // });
  };

  const DeleteInvoice = (items, RemovedItems, client, DeleteType) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${currentDate.getFullYear()}`;
    const formattedTime = `T${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    let data = {
      item: items,
      RemovedItems: RemovedItems,
      client: client,
      DateDeleted: formattedDate,
      TimeDeleted: formattedTime,
      username: localStorage.getItem("username"),
      compname: localStorage.getItem("compname"),
      RefNo: selectedInvoice,
      type: props.selectedFormOption,
      DeleteType: DeleteType,
    };

    axios({
      method: "post",
      url: props.url + "/moh/DeleteInvoice/",
      data: data,
      headers: { content_type: "application/json" },
    })
      .then((res) => {
        if (res.data.Info == "authorized") {
          clearInvoice();
          getInvoicesHistory();
        } else if (res.data.Info == "Failed") {
          console.log("erowwww");
          setErrorModal({ show: true, message: res.data.msg });
        }
      })
      .catch((error) => {
        console.error("Error in getInvoicesHistory:", error);
        setErrorModal({ show: true, message: error });

        // Handle error (e.g., set error state)
      });
  };
  const getCompanyInfo = async () => {
    try {
      const resp = await axios({
        method: "get",
        url:
          props.url + "/moh/getCompanyInfo/" + localStorage.getItem("compname"),

        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = resp.data;

      if (data.Info === "authorized") {
        localStorage.setItem("CompName", data.CompanyInfo["CompName"]);
        localStorage.setItem("CompAdd", data.CompanyInfo["CompAdd"]);
        localStorage.setItem("CompTell", data.CompanyInfo["CompTell"]);
        localStorage.setItem("CompEmail", data.CompanyInfo["CompEmail"]);
        localStorage.setItem("CompTax", data.CompanyInfo["CompTax"]);
        localStorage.setItem("mainCur", data.CompanyInfo["mainCur"]);
        if (
          props.Client["id"] == "" ||
          props.Client["id"] == undefined ||
          props.Client["id"] == null
        ) {
          localStorage.setItem("Rate", data.CompanyInfo["Rate"]);
        }

        localStorage.setItem("Cur1", data.CompanyInfo["Cur1"]);
        localStorage.setItem("Cur2", data.CompanyInfo["Cur2"]);
        localStorage.setItem("CASH", data.CompanyInfo["CASH"]);
        localStorage.setItem("VISA1", data.CompanyInfo["VISA1"]);
        localStorage.setItem("VISA2", data.CompanyInfo["VISA2"]);
        localStorage.setItem("VISA3", data.CompanyInfo["VISA3"]);
        localStorage.setItem("VISA4", data.CompanyInfo["VISA4"]);
        localStorage.setItem("VISA5", data.CompanyInfo["VISA5"]);
        localStorage.setItem("VISA6", data.CompanyInfo["VISA6"]);
      }
    } catch (error) {
      // Handle errors here if needed
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    try {
      setErrorMessage("");
      handleRetrieve();
      getCompanyInfo();
    } catch (error) {
      console.log("ERROR");
    }
  }, []);
  useEffect(() => {
    try {
      getInvoicesHistory();
      props.setafterSubmitModal(false);
      // handleSelectChange("");
      // selectRef.current.value = "Accounts";
      //setSelectedInvoice("");
      setsOption("Accounts");
      selectInvRef.current.value = "";
      console.log("594");
      props.setSelectedFormOption(localStorage.getItem("selectedFormOption"));
    } catch (error) {
      console.log("ERROR");
    }
  }, [props.afterSubmitModal]);

  const allowPriceChanges = localStorage.getItem("Price") !== "N";
  const allowDiscountChanges = localStorage.getItem("Discount") !== "N";

  return (
    <div className="w-[100%] h-[100%]">
      <div className="w-[100%] h-[100%] m-auto flex flex-col pt-1  ">
        <div className="flex flex-row w-full h-[3%] ">
          <img
            src={backbutton}
            alt="Back"
            className="h-[100%] mr-2 ml-1"
            onClick={() => {
              //if(selectedInvoice!=""){
              //     if(props.propertiesAreEqual==false && selectedInvoice!="" && selectedInvoice !=undefined){

              //     console.log(props.propertiesAreEqual);
              //     console.log("lklklkk")
              //     console.log(selectedInvoice);
              //     setDiscardOldInvoiceModalShow(true);
              // }
              // else{

              //     props.inv("");
              // }
              props.inv("");
            }}
          />
          <h6 className="h-[100%]">Sales Invoice</h6>
        </div>
        <div className="h-[12%]">
          <div className=" px-2 w-[97.5%] h-[100%]  mx-auto flex flex-row items-center">
            <div className="flex items-center">
              <i className="fas fa-search text-gray-500 mr-2"></i>{" "}
              {/* Magnifying glass icon */}
              <h2 className="font-semibold text-2xl text-gray-700">Search:</h2>
            </div>
            <div className="flex-grow ml-4 relative w-[40%]">
              <input
                type="text"
                ref={inputRef}
                className="block rounded-md w-full  h-[3rem] border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
                placeholder="Search Value"
                value={vInput}
                onChange={(e) => {
                  setvInput(e.target.value);
                }}
                id="tf"
              />
            </div>
            <div className="ml-4 w-[30%]">
              <select
                className="p-[0.5rem] w-full h-[3rem] rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-semibold text-lg"
                value={sOption}
                ref={selectRef}
                onChange={(e) => {
                  setsOption(e.target.value);
                  document.getElementById("tf").focus();
                  setvInput("");
                }}
              >
                <option className="py-2 text-lg">Accounts</option>
                {props.selectedFormOption != "DB_AP" &&
                props.selectedFormOption != "CR_AP" ? (
                  <option className="py-2 text-lg">Items</option>
                ) : (
                  <option className="py-2 text-lg">Amount</option>
                )}
              </select>
            </div>
            <div className="ml-4 w-[30%]">
              <button
                className="bg-indigo-500 text-white w-full h-[3rem] rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                onClick={() => {
                  if (
                    (props.Client["id"] == "" ||
                      props.Client["id"] == undefined) &&
                    sOption == "Items"
                  ) {
                    setItemsWithoutAccount(true);
                  } else if (sOption == "Amount") {
                    props.setModalVoucher(true);
                  } else {
                    getInvoiceOptions();
                    setModalShow(true);
                    localStorage.setItem("InvoiceHistory", "");
                  }
                }}
              >
                Select {sOption}
              </button>
            </div>
          </div>
        </div>
        <div className=" w-[97.5%] shadow-lg mx-auto h-[85%] rounded p-2">
          <div className="flex flex-col justify-between h-[100%]">
            {" "}
            {/* Model content*/}
            <div className="h-[10%] flex flex-col justify-between items-between">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row ">
                  <div className="flex flex-row ">
                    <div>CompCurrency: </div>
                    <div>
                      {localStorage.getItem(
                        "Cur" + localStorage.getItem("mainCur")
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row ml-[10%]">
                    <div>AccCurrency: </div>
                    <div>
                      {props.Client["cur"] != undefined &&
                      props.Client["cur"] != null &&
                      props.Client["cur"] != ""
                        ? props.Client["cur"]
                        : "-"}
                    </div>
                  </div>
                </div>

                <div>
                  CurRate:{" "}
                  {props.Client["Rate"] == null ||
                  props.Client["Rate"] == undefined ||
                  props.Client["Rate"] == ""
                    ? "--"
                    : props.Client["Rate"]}
                </div>
              </div>
              <h1
                className="text-center text-xl2 text-gray-700"
                onClick={() => {
                  // if (props.propertiesAreEqual == false) {
                  //   setSwitchFormOption({
                  //     show: true,
                  //     message: (
                  //       <div>
                  //         You Cannot Change The Form Option Without Saving
                  //         Changes.
                  //         <br />
                  //         Please Save Your Changes First .
                  //       </div>
                  //     ),
                  //     //variable: option,
                  //     title: "Unsaved Invoice",
                  //   });
                  //   return;
                  // }
                  if (selectedInvoice != "" && selectedInvoice != undefined) {
                    setSwitchFormOption({
                      show: true,
                      message: (
                        <div>
                          You Cannot Change The Form Option While Calling Old
                          Invoice.
                          <br />
                          Please Clear Invoice First .
                        </div>
                      ),
                      //variable: option,
                      title: "Calling Invoice",
                    });
                    return;
                  } else {
                    handleHeaderClick();
                  }
                }}
              >
                {props.selectedFormOptionDisplay}
              </h1>
              <div></div>
            </div>
            <div className="flex flex-row items-center justify-between mb-1 h-[15%]">
              <div className="w-[32%] flex flex-column justify-between">
                <div className="w-full flex flex-row justify-between">
                  <div className="text-xl font-semibold w-fit">Client ID:</div>

                  <input
                    type={"text"}
                    className="block rounded-md w-[70%] h-9 border border-gray-400 mx-1 px-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white"
                    placeholder={"Client Id"}
                    value={props.Client["id"]}
                    disabled
                  />
                </div>

                <div className="w-full flex flex-row justify-between">
                  <div className="text-xl font-semibold mr-1">Name:</div>
                  <div className="text-xl font-semibold">
                    {props.Client["name"]}
                  </div>
                </div>
              </div>
              <div className="w-[32%] flex flex-column justify-between">
                <div className="w-full flex flex-row justify-between">
                  <div className="text-xl font-semibold mr-1">Balance:</div>
                  <div className="text-xl font-semibold">
                    {props.Client["balance"] !== "" &&
                    props.Client["balance"] !== undefined &&
                    props.Client["balance"] !== null
                      ? props.Client["balance"].toFixed(3)
                      : "--"}
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between">
                  <div className="text-xl font-semibold ">Address:</div>
                  <div className="text-xl font-semibold">
                    {" "}
                    {props.Client["address"] !== "" &&
                    props.Client["address"] !== undefined &&
                    props.Client["address"] !== null
                      ? props.Client["address"]
                      : "--"}
                  </div>
                </div>
              </div>
              <div className="w-[32%] flex flex-row justify-center">
                <div className="text-xl font-semibold w-fit">Call Inv:</div>

                <select
                  className="p-[0.5rem] w-full h-[100%] rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-semibold text-lg"
                  ref={selectInvRef}
                  onChange={(e) => {
                    if (props.propertiesAreEqual == false) {
                      let intervalue = e.target.value;
                      setpassSelectedInvoiceToModal(intervalue);
                      setswitchBetweenInvoicesModalShow(true);
                    } else {
                      let CallInvoice = localStorage.getItem("CallInvoice");
                      if (CallInvoice == "Y") {
                        handleSelectChange(e.target.value);
                      } else {
                        setDeletePermission({
                          show: true,
                          message:
                            "You don't have permission To Call Invoices From History.",
                        });
                      }
                    }
                  }}
                  value={selectedInvoice}
                >
                  <option value="" className="py-2 text-lg">
                    Call invoice
                  </option>
                  {sInvoices.map((inv, idx) => {
                    return (
                      <option
                        value={inv["RefNo"]}
                        key={idx}
                        className="py-2 text-lg"
                      >
                        {inv["RefType"]}_{inv["RefNo"]}_{inv["AccNo"]}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="h-[55%] overflow-auto">
              <Table bordered striped responsive>
                <thead className=" bg-slate-500">
                  <tr className=" whitespace-nowrap ">
                    {props.selectedFormOption === "CR_AP" ||
                    props.selectedFormOption === "DB_AP" ? (
                      <>
                        <th>LNO</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Cur</th>
                        <th>Branch</th>
                        <th>Note</th>
                        <th>Action</th>
                      </>
                    ) : (
                      <>
                        <th>LNO</th>
                        <th>ItemNo</th>
                        <th>Name</th>
                        <th>Br</th>
                        <th>QTY</th>
                        <th>UPrice</th>
                        <th>Discount %</th>
                        <th>Tax %</th>
                        <th>Total</th>
                        <th>Note</th>
                        <th>Action</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {
                    //  console.log(SelectedItems);
                    props.SelectedItems.map((si, idx) => {
                      let total;
                      let tax = si["tax"] == "" ? 0 : si["tax"];
                      si["tax"] = tax;
                      if (
                        props.selectedFormOption !== "CR_AP" &&
                        props.selectedFormOption !== "DB_AP"
                      ) {
                        console.log(si);

                        if (si["PPrice"] == "U") {
                          total = parseFloat(
                            si["uprice"] *
                              si["TotalPieces"] *
                              (1 - si["discount"] / 100)
                          );
                        } else if (si["PPrice"] == "P") {
                          total = parseFloat(
                            si["uprice"] *
                              si["qty"] *
                              (1 - si["discount"] / 100)
                          );

                          // else if (si["PType"]=="2"){
                          //     total =  parseFloat(((si["uprice"]/si["PQty"])* si["qty"])*(1-si["discount"]/100));

                          // }
                          // else if (si["PType"]=="1"){
                          //     total =  parseFloat(((si["uprice"]/(si["PQty"]*si['PQUnit']))* si["qty"])*(1-si["discount"]/100));

                          // }
                        }

                        // let total =
                        //     (si["TotalPieces"] * si["uprice"])  *(1 - si["discount"] / 100);

                        let taxAmount = (total * tax) / 100;
                        finalTotal = finalTotal + total;
                        // setFtotal(finalTotal);
                        finalTax = finalTax + taxAmount;
                        // setFTax(finalTax);
                        si["TaxTotal"] = taxAmount;
                        let totalf;
                        if (si["PPrice"] == "U") {
                          totalf = parseFloat(
                            si["uprice"] *
                              si["TotalPieces"] *
                              (1 - si["discount"] / 100) *
                              (1 + si["tax"] / 100)
                          );
                        } else if (si["PPrice"] == "P") {
                          totalf = parseFloat(
                            si["uprice"] *
                              si["qty"] *
                              (1 - si["discount"] / 100) *
                              (1 + si["tax"] / 100)
                          );

                          // else if(si["PType"]=="2"){
                          //     totalf =  parseFloat(((si["uprice"]/si["PQty"])* si["qty"])*(1-si["discount"]/100)*(1 +si["tax"]/100));
                          // }else if(si["PType"]=="1"){
                          //     totalf =  parseFloat(((si["uprice"]/(si["PQty"]*si["PQUnit"]))* si["qty"])*(1-si["discount"]/100)*(1 +si["tax"]/100));
                          // }
                        }
                        si["Total"] = totalf;
                      } else {
                        console.log(si["Total"]);
                        total = parseFloat(si["Total"]);
                        console.log("+++++++++", total);
                        finalTotal = finalTotal + total;
                      }

                      return (
                        <tr
                          key={idx}
                          className=" whitespace-nowrap hover:bg-blue-200 select-none "
                        >
                          {props.selectedFormOption === "CR_AP" ||
                          props.selectedFormOption === "DB_AP" ? (
                            <>
                              <td>{si["lno"]}</td>
                              <td>{si["PType"]}</td>
                              {/*type payment */}
                              <td>{si["uprice"]}</td>
                              {/*Amount */}
                              <td>{si["PPrice"]}</td>
                              {/*Cur */}
                              <td>{si["branch"]}</td>
                              <td>
                                {/* Render note icon/button */}
                                <button
                                  className="text-blue-500 hover:text-blue-700"
                                  onClick={() => {
                                    setShowNoteModal(true);
                                    setSelectedItemIndex(idx);
                                    setErrorMessage("");
                                    setNoteInput(si["Note"] || "");
                                  }}
                                >
                                  Note
                                </button>
                              </td>

                              <td>
                                <button
                                  className="text-blue-500 hover:text-blue-700"
                                  onClick={() => {
                                    setShow(true);
                                    setEditItem(si);

                                    setEditIdx(idx);

                                    setEditBranch(si["branch"]); /* branch */

                                    setEditLno(si["lno"]); /* lno */

                                    setEditType(si["PType"]); /*type */

                                    setEditPPrice(si["PPrice"]); /* Currency */

                                    setEditPrice(si["uprice"]); /* Amount */
                                    console.log(
                                      "hsebet men Amount waat ekbos edit"
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
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
                                    setErrorMessage("");
                                    setNoteInput(si["Note"] || "");
                                  }}
                                >
                                  Note
                                </button>
                              </td>

                              {/*<td>{taxAmount}</td>*/}
                              <td>
                                <button
                                  className="text-blue-500 hover:text-blue-700"
                                  onClick={() => {
                                    setShow(true);
                                    setEditItem(si);
                                    setEditIdx(idx);

                                    setEditQty(si["qty"]);

                                    setEditTax(tax);
                                    setEditBranch(si["branch"]);
                                    setEditInitialPrice(si["InitialPrice"]);
                                    setEditDiscount(si["discount"]);
                                    setEditLno(si["lno"]);
                                    setEditTotal(si["Total"]);
                                    setEditTotalPieces(si["TotalPieces"]);
                                    setEditType(si["PType"]);
                                    setEditDBPUnit(si["BPUnit"]);
                                    setEditDPUnit(si["PUnit"]);
                                    setEditDSPUnit(si["SPUnit"]);
                                    setEditPPrice(si["PPrice"]);
                                    setEditPQUnit(si["PQUnit"]);
                                    setEditPQty(si["PQty"]);

                                    setEditPrice(si["uprice"]);
                                    console.log(
                                      "hsebet men uprice waat ekbos edit"
                                    );
                                    setPerformCalculation(false);
                                    setEditItemStockQty(si["StockQty"]);

                                    // if(EditType=="3"){
                                    //     setEditInitialPrice(si["uprice"]);
                                    // }
                                    // else if(EditType=="2"){
                                    //     let initialPrice = si["uprice"]*si["PQty"]
                                    //     setEditInitialPrice(initialPrice);
                                    // }
                                    // else if(EditType=="1"){
                                    //     let initialPrice = si["uprice"]*si["PQty"]*si["PQUnit"]
                                    //     setEditInitialPrice(initialPrice);
                                    // }
                                    // else{
                                    //     setEditInitialPrice(si["uprice"]);
                                    // }
                                  }}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
              {/* Note Modal */}
              <Modal
                show={showNoteModal}
                onHide={() => setShowNoteModal(false)}
              >
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
                  <Button
                    variant="secondary"
                    onClick={() => setShowNoteModal(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleNoteSave}>
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    Save Note
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="flex flex-col justify-start h-[20%] mb-[1%]">
              <div className=" font-semibold text-xl h-[45%] flex justify-between items-center">
                <div className="flex justify-between items-center">
                  <div className="mr-20">
                    {" "}
                    <h4>Gross: {finalTotal.toLocaleString()} </h4>
                  </div>
                  <div className="mr-20">
                    {" "}
                    <h4>TAX: {finalTax.toLocaleString()}</h4>
                  </div>
                  <div>
                    <h3>
                      Total: {(finalTotal + finalTax).toLocaleString()}{" "}
                      {localStorage.getItem(
                        "Cur" + localStorage.getItem("mainCur")
                      )}
                    </h3>
                  </div>
                </div>
                <div>
                  {localStorage.getItem("mainCur") == "1" ? (
                    <h4>
                      Cur2:{" "}
                      {finalTotal != 0
                        ? (
                            (finalTotal + finalTax) *
                            props.Client["Rate"]
                          ).toLocaleString()
                        : "0"}{" "}
                      {localStorage.getItem("Cur2")}
                    </h4>
                  ) : (
                    <h4>
                      Cur2:{" "}
                      {(
                        (finalTotal + finalTax) /
                        props.Client["Rate"]
                      ).toLocaleString()}{" "}
                      {localStorage.getItem("Cur1")}
                    </h4>
                  )}{" "}
                </div>
              </div>
              <div className="flex flex-row justify-between h-[55%]">
                <Button
                  className="h-[100%] w-[20%]"
                  variant="danger"
                  onClick={() => {
                    // if(props.propertiesAreEqual==false && localStorage.getItem("InvoiceHistory")!=null && localStorage.getItem("InvoiceHistory")!=undefined && localStorage.getItem("InvoiceHistory")!="")
                    if (props.propertiesAreEqual == false) {
                      setDiscardModalShow(true);
                    } else {
                      props.inv("");
                      if (
                        localStorage.getItem("InvoiceHistory") != null &&
                        localStorage.getItem("InvoiceHistory") != undefined &&
                        localStorage.getItem("InvoiceHistory") != ""
                      ) {
                        localStorage.setItem("InvoiceHistory", "");

                        props.setSelectedItems([]);
                        props.setRemovedItems([]);
                        props.setpropertiesAreEqual(true);

                        setsOption("Accounts");
                        setvInput("");
                        setSelectedInvoice("");

                        props.setClient({
                          id: "",
                          name: "",
                          RefNo: "",
                          date: "",
                          time: "",
                          balance: "",
                          address: "",

                          Rate: "",
                        });
                        console.log("y10");
                        localStorage.setItem("sales", "");
                      }
                      props.setSATFromBranch();
                      props.setSATToBranch();
                    }
                  }}
                >
                  Exit
                </Button>
                <Button
                  className="h-[100%] w-[20%] text-lg bg-indigo-500"
                  onClick={() => {
                    //if(props.Client["id"]!=undefined){
                    //     console.log("/*//////////");
                    //     console.log(props.SelectedItems.length);
                    //     console.log(props.Client["id"]);
                    //     console.log(props.setSelectedItems.length);
                    // if((props.Client["id"]!=undefined && props.Client["id"]!="") || props.SelectedItems.length > 0){
                    if (
                      props.propertiesAreEqual == false
                      // && (props.SelectedItems!=[] && props.SelectedItems!=undefined && props.SelectedItems!="")
                    ) {
                      console.log("hhey");
                      console.log(props.Client["id"]);
                      console.log(props.SelectedItems);
                      setNewInvoiceAlertModalShow(true);
                    } else {
                      clearInvoice();
                    }

                    // inputRef.current.focus();
                    //selectRef.current.value="Accounts";
                  }}
                >
                  Clear Invoice
                </Button>
                <Button
                  className=" w-[20%]"
                  variant="danger"
                  onClick={() => {
                    let DeleteInvoicePermission =
                      localStorage.getItem("DeleteInvoice");
                    if (DeleteInvoicePermission == "N") {
                      setDeletePermission({
                        show: true,
                        message: "You don't have permission to delete invoice.",
                      });
                    } else {
                      if (
                        selectedInvoice != undefined &&
                        selectedInvoice != "" &&
                        selectedInvoice != null
                      ) {
                        setDeleteInvoiceModal(true);
                      } else {
                        setNoSavedToDelete(true);
                      }
                    }
                  }}
                >
                  Delete Invoice
                </Button>
                <Button
                  className=" w-[20%] bg-indigo-500"
                  onClick={() => {
                    if (
                      (props.SelectedItems.length == 0 &&
                        props.RemovedItems.length == 0) ||
                      props.Client == "" ||
                      props.propertiesAreEqual == true
                    ) {
                      setEmptyAlertModalShow(true);
                      console.log("//**/////");
                      console.log(props.Client);
                    } else {
                      setConfirmModalShow(true);
                    }
                  }}
                >
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
        RemovedItems={props.RemovedItems}
        setRemovedItems={props.setRemovedItems}
        setDeletePermission={setDeletePermission}
        DeletePermission={DeletePermission}
        setModalItems={props.setModalItems}
        modalItems={props.modalItems}
        selectedFormOption={props.selectedFormOption}
        selectedFormOptionDisplay={props.selectedFormOptionDisplay}
        modalVoucher={props.modalVoucher}
        setModalVoucher={props.setModalVoucher}
      />

      <Modal
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={() => {
          setShow(false);
          setIdOptions([]);
          setErrorMessage("");
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {props.selectedFormOption !== "CR_AP" &&
        props.selectedFormOption !== "DB_AP" ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {EditItem["name"]}
                <br />
                Stock: {EditItemStockQty}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-6 py-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <label htmlFor="itemQty" className="w-1/4">
                    Qty:
                  </label>
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
                      style={{
                        "-moz-appearance": "textfield",
                        appearance: "textfield",
                      }}
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
                        setPerformCalculation(true);
                      }}
                    >
                      {/* {EditDBPUnit && EditDBPUnit.trim() !== '' ? setEditType("3"): EditDPUnit && EditDPUnit.trim() !== ''?setEditType("2"):setEditType("1")} */}
                      {EditDBPUnit && EditDBPUnit.trim() !== "" && (
                        <option value="3">{EditDBPUnit}</option>
                      )}

                      {EditDPUnit && EditDPUnit.trim() !== "" && (
                        <option value="2">{EditDPUnit}</option>
                      )}
                      {EditDSPUnit && EditDBPUnit.trim() !== "" && (
                        <option value="1">{EditDSPUnit}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="flex items-center">
                  <label htmlFor="itemPieceTotal" className="w-1/4">
                    Total Qty:
                  </label>
                  <input
                    id="pieceTotal"
                    type="number"
                    readOnly
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Total Pieces"
                    value={parseFloat(
                      EditType == "3"
                        ? EditQty * EditItem["PQty"] * EditItem["PQUnit"]
                        : EditType == "2"
                        ? EditQty * EditItem["PQUnit"]
                        : EditQty
                    )}
                    onChange={(e) => {
                      setEditTotalPieces(
                        parseFloat(
                          EditType == "1"
                            ? EditQty * EditItem["PQty"] * EditItem["PQUnit"]
                            : EditType == "2"
                            ? EditQty * EditItem["PQUnit"]
                            : EditQty
                        )
                      );
                    }}
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="itemBranch" className="w-1/4">
                    Branch:
                  </label>
                  <select
                    id="itemBranch"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    value={EditBranch}
                    onChange={(e) => {
                      setEditBranch(e.target.value);
                    }}
                  >
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
                  <label htmlFor="itemPrice" className="w-1/4">
                    Uprice:{" "}
                    {!allowPriceChanges && (
                      <FontAwesomeIcon
                        icon={faLock}
                        className="text-gray-400"
                      />
                    )}
                  </label>
                  <input
                    type="number"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder={"Uprice"}
                    value={EditPrice}
                    onChange={(e) => {
                      setEditPrice(e.target.value);
                      console.log("hsebet men on change");
                    }}
                    readOnly={!allowPriceChanges}
                  />
                </div>

                <div className="flex items-center">
                  <label htmlFor="itemDiscount" className="w-1/4">
                    Discount %:{" "}
                    {!allowDiscountChanges && (
                      <FontAwesomeIcon
                        icon={faLock}
                        className="text-gray-400"
                      />
                    )}
                  </label>
                  <input
                    type={"number"}
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder={"Discount"}
                    value={EditDiscount}
                    onChange={(e) => {
                      setEditDiscount(e.target.value);
                    }}
                    readOnly={!allowDiscountChanges}
                  />
                </div>

                <div className="flex items-center">
                  <label htmlFor="itemTax" className="w-1/4">
                    Tax %:
                  </label>
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
                  <label htmlFor="itemTotal" className="w-1/4">
                    Total:
                  </label>
                  <input
                    id="itemTotal"
                    type="number"
                    readOnly
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Total"
                    value={
                      EditPPrice == "U"
                        ? parseFloat(
                            EditPrice *
                              EditTotalPieces *
                              (1 - EditDiscount / 100) *
                              (1 + EditTax / 100)
                          )
                        : EditPPrice == "P" &&
                          parseFloat(
                            EditPrice *
                              EditQty *
                              (1 - EditDiscount / 100) *
                              (1 + EditTax / 100)
                          )
                    }
                    onChange={(e) => {
                      setEditTotal(e.target.value);
                    }}
                  />
                </div>
                {errorMessage && (
                  <div className="text-red-500 mb-2">{errorMessage}</div>
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
                      setErrorMessage("");
                    }}
                  >
                    Close
                  </Button>
                  <div className="w-3"></div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (localStorage.getItem("SalesUnderZero") == "N") {
                        if (EditItemStockQty < EditTotalPieces) {
                          setDeletePermission({
                            show: true,
                            message:
                              "You Don't Have Permission To Sell Less Than Stock Quantity.",
                          });
                          return;
                        }
                      }

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
                      let oldtempa = tempa[EditIdx];

                      let totalConditions =
                        EditPPrice == "U"
                          ? parseFloat(
                              EditPrice *
                                EditTotalPieces *
                                (1 - EditDiscount / 100) *
                                (1 + EditTax / 100)
                            )
                          : EditPPrice == "P" &&
                            parseFloat(
                              EditPrice *
                                EditQty *
                                (1 - EditDiscount / 100) *
                                (1 + EditTax / 100)
                            );
                      tempa[EditIdx] = {
                        no: EditItem.no,
                        name: EditItem.name,
                        qty: tempQty,
                        uprice: parseFloat(EditPrice),
                        discount: EditDiscount,
                        branch: EditBranch,
                        lno: EditLno,
                        PQty: PQtyT,
                        PUnit: PUnitT,
                        tax: EditTax,
                        TaxTotal: totalConditions * EditTax,
                        Total: totalConditions,
                        Note: NoteT,
                        DateT: DateTT,
                        TimeT: TimeTT,
                        PQUnit: PQUnitT,
                        PType: EditType,
                        TotalPieces: EditTotalPieces,
                        PPrice: PPriceT,
                        BPUnit: EditDBPUnit,
                        SPUnit: EditDSPUnit,
                        InitialPrice: EditInitialPrice,
                        StockQty: EditItemStockQty,
                      };
                      console.log("edipricee", tempa[EditIdx]["uprice"]);
                      let pAreEqual = true;
                      if (oldtempa["qty"] !== tempa[EditIdx]["qty"]) {
                        console.log("fetttt qty");
                        pAreEqual = false;
                      }

                      if (oldtempa["uprice"] != tempa[EditIdx]["uprice"]) {
                        console.log("fetttt uprice");

                        pAreEqual = false;
                      }
                      if (oldtempa["branch"] !== tempa[EditIdx]["branch"]) {
                        console.log("fetttt branch");
                        pAreEqual = false;
                      }
                      if (oldtempa["discount"] !== tempa[EditIdx]["discount"]) {
                        console.log("fetttt disc");
                        pAreEqual = false;
                      }
                      console.log("oldtempa", oldtempa["tax"]);
                      console.log("tempa edsittxt", tempa[EditIdx]["tax"]);
                      if (oldtempa["tax"] !== tempa[EditIdx]["tax"]) {
                        console.log("fetttt tax");
                        console.log(oldtempa["tax"], tempa[EditIdx]["tax"]);
                        pAreEqual = false;
                      }

                      // for (const key in oldtempa) {
                      //     if (key === "Total" || key==="TaxTotal") {
                      //         console.log("FETTT TOAL");
                      //         continue; // Skip the Total field
                      //     }
                      //     const oldValue = parseFloat(oldtempa[key]); // Convert to number and fix precision
                      //     const newValue = parseFloat(tempa[EditIdx][key]);
                      //     if (oldValue !== newValue) {
                      //         propertiesAreEqual = false;
                      //         console.log(oldtempa[key]);
                      //         console.log(tempa[EditIdx][key]);
                      //         console.log(propertiesAreEqual);
                      //         break;
                      //     }
                      // }
                      // if (tempa[EditIdx]["uprice"]==0.000){
                      //     setErrorMessage("Unit Price cannot be 0. Please enter a valid value.");
                      //     return;

                      // }
                      if (!pAreEqual) {
                        console.log("rouhhhhhhhhhhhh");

                        props.setpropertiesAreEqual(false);
                        const currentDate = new Date();
                        const formattedDate = `${currentDate
                          .getDate()
                          .toString()
                          .padStart(2, "0")}/${(currentDate.getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}/${currentDate.getFullYear()}`;
                        const formattedTime = `T${currentDate
                          .getHours()
                          .toString()
                          .padStart(2, "0")}:${currentDate
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")}:${currentDate
                          .getSeconds()
                          .toString()
                          .padStart(2, "0")}`;
                        tempa[EditIdx]["DateT"] = formattedDate;
                        tempa[EditIdx]["TimeT"] = formattedTime;
                      }
                      setErrorMessage("");

                      setShow(false);
                      setIdOptions([]);

                      props.setSelectedItems(tempa);
                      let accName = props.Client;
                      let items = props.SelectedItems;
                      let RemovedItems = props.RemovedItems;
                      let json = { accName, items, RemovedItems };
                      let jsonString = JSON.stringify(json); // Convert data object to JSON string

                      console.log("ghayrik enti", jsonString);
                      localStorage.setItem("sales", jsonString);
                      console.log(localStorage.getItem("sales"));
                    }}
                  >
                    Apply
                  </Button>
                </div>
                <div className="flex flex-row align-middle justify-between">
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShow(false);

                      let tempa = [...props.SelectedItems]; // Create a copy of SelectedItems array
                      if (
                        selectedInvoice != undefined &&
                        selectedInvoice != null &&
                        selectedInvoice != ""
                      ) {
                        // if(props.SelectedItems.length==1){
                        //     setDeleteLastItemFromHistory(true);
                        // }

                        let DeleteItemPermission =
                          localStorage.getItem("DeleteItem");
                        if (DeleteItemPermission == "Y") {
                          if (props.SelectedItems.length == 1) {
                            setDeleteLastItemFromHistory(true);
                          } else {
                            RemoveItem(tempa[EditIdx], "ITEM");

                            tempa.splice(EditIdx, 1); // Remove the item at index EditIdx
                            tempa.forEach((item, index) => {
                              item.lno = index + 1; // Update lno starting from 1 and incrementing by 1
                            });

                            props.setSelectedItems(tempa);
                            let accName = props.Client;

                            let items = tempa;

                            let RemovedItems = props.RemovedItems;
                            let json = { accName, items, RemovedItems };
                            // let json = {accName,items}
                            let jsonString = JSON.stringify(json); // Convert data object to JSON string

                            console.log("y22");

                            localStorage.setItem("sales", jsonString);
                            console.log("heyyy", localStorage.getItem("sales"));

                            props.setpropertiesAreEqual(false);
                            setErrorMessage("");
                          }
                        } else {
                          setDeletePermission({
                            show: true,
                            message:
                              "You don't have permission to delete Item From invoice.",
                          });
                        }
                      } else {
                        tempa.splice(EditIdx, 1); // Remove the item at index EditIdx
                        tempa.forEach((item, index) => {
                          item.lno = index + 1; // Update lno starting from 1 and incrementing by 1
                        });
                        props.setSelectedItems(tempa);
                        let accName = props.Client;

                        let items = tempa;

                        let RemovedItems = props.RemovedItems;

                        let json = { accName, items, RemovedItems };
                        //let json = {accName,items}
                        let jsonString = JSON.stringify(json); // Convert data object to JSON string

                        localStorage.setItem("sales", jsonString);

                        props.setpropertiesAreEqual(false);
                        setErrorMessage("");
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {props.selectedFormOptionDisplay}
                <br />
                {props.Client["id"]}
                <br />
                {props.Client["name"]}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-6 py-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <label htmlFor="itemBranch" className="w-1/4">
                    Branch:
                  </label>
                  <select
                    id="itemBranch"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    value={EditBranch}
                    onChange={(e) => {
                      setEditBranch(e.target.value);
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
                  <label htmlFor="itemQty" className="w-1/4">
                    Payment Type:
                  </label>
                  <div className="flex items-center w-3/4">
                    <select
                      id="itemType"
                      className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                      value={EditType}
                      onChange={(e) => {
                        setEditType(e.target.value);
                      }}
                    >
                      <option value="">Choose Payment Type</option>
                      {localStorage.getItem("CASH") &&
                        localStorage.getItem("CASH") !== "" && (
                          <option value={localStorage.getItem("CASH")}>
                            {localStorage.getItem("CASH")}
                          </option>
                        )}
                      {localStorage.getItem("VISA1") &&
                        localStorage.getItem("VISA1") !== "" && (
                          <option value={localStorage.getItem("VISA1")}>
                            {localStorage.getItem("VISA1")}
                          </option>
                        )}
                      {localStorage.getItem("VISA2") &&
                        localStorage.getItem("VISA2") !== "" && (
                          <option value={localStorage.getItem("VISA2")}>
                            {localStorage.getItem("VISA2")}
                          </option>
                        )}
                      {localStorage.getItem("VISA3") &&
                        localStorage.getItem("VISA3") !== "" && (
                          <option value={localStorage.getItem("VISA3")}>
                            {localStorage.getItem("VISA3")}
                          </option>
                        )}
                      {localStorage.getItem("VISA4") &&
                        localStorage.getItem("VISA4") !== "" && (
                          <option value={localStorage.getItem("VISA4")}>
                            {localStorage.getItem("VISA4")}
                          </option>
                        )}
                      {localStorage.getItem("VISA5") &&
                        localStorage.getItem("VISA5") !== "" && (
                          <option value={localStorage.getItem("VISA5")}>
                            {localStorage.getItem("VISA5")}
                          </option>
                        )}
                      {localStorage.getItem("VISA6") &&
                        localStorage.getItem("VISA6") !== "" && (
                          <option value={localStorage.getItem("VISA6")}>
                            {localStorage.getItem("VISA6")}
                          </option>
                        )}
                    </select>
                  </div>
                </div>
                <div className="flex items-center">
                  <label htmlFor="itemQty" className="w-1/4">
                    Currency:
                  </label>
                  <div className="flex items-center w-3/4">
                    <select
                      id="itemType"
                      className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                      value={EditPPrice}
                      onChange={(e) => {
                        setEditPPrice(e.target.value);
                      }}
                    >
                      <option value="">Choose Currency Type</option>

                      {localStorage.getItem("Cur1") &&
                        localStorage.getItem("Cur1") !== "" && (
                          <option value={localStorage.getItem("Cur1")}>
                            {localStorage.getItem("Cur1")}
                          </option>
                        )}
                      {localStorage.getItem("Cur2") &&
                        localStorage.getItem("Cur2") !== "" && (
                          <option value={localStorage.getItem("Cur2")}>
                            {localStorage.getItem("Cur2")}
                          </option>
                        )}
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <label htmlFor="itemPrice" className="w-1/4">
                    Amount:{" "}
                  </label>

                  <input
                    id="itemPrice"
                    type="number"
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Amount"
                    value={EditPrice}
                    onChange={(e) => {
                      setEditPrice(e.target.value);
                    }}
                  />
                </div>

                <div className="text-red-500 mb-2">{errorMessage}</div>
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
                      setErrorMessage("");
                    }}
                  >
                    Close
                  </Button>
                  <div className="w-3"></div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (EditType == "") {
                        setErrorMessage("You Have To Choose Payment Type");
                        return;
                      } else if (EditPPrice == "") {
                        setErrorMessage("You Have To Choose Currency Type");
                        return;
                      } else if (EditBranch == "") {
                        setErrorMessage("You Have To Choose A Branch");
                        return;
                      }
                      let tempa = props.SelectedItems;

                      let PQUnitT = tempa[EditIdx]["PQUnit"];
                      let PQtyT = tempa[EditIdx]["PQty"];
                      let PUnitT = tempa[EditIdx]["PUnit"];
                      let DateTT = tempa[EditIdx]["DateT"];
                      console.log(DateTT, "hon aamenaayit l date l adim edit");
                      let TimeTT = tempa[EditIdx]["TimeT"];

                      let NoteT = tempa[EditIdx]["Note"];
                      let PPriceT = EditPPrice;
                      let oldtempa = tempa[EditIdx];

                      tempa[EditIdx] = {
                        no: EditItem.no,
                        name: tempa[EditIdx]["name"],
                        qty: tempa[EditIdx]["qty"],
                        uprice: parseFloat(EditPrice),
                        discount: tempa[EditIdx]["discount"],
                        branch: EditBranch,
                        lno: EditLno,
                        PQty: tempa[EditIdx]["PQty"],
                        PUnit:
                          PPriceT ==
                          localStorage.getItem(
                            "Cur" + localStorage.getItem("mainCur")
                          )
                            ? "1"
                            : "2",
                        tax: tempa[EditIdx]["tax"],
                        TaxTotal: tempa[EditIdx]["TaxTotal"],
                        Total:
                          // EditPPrice !=
                          // localStorage.getItem(
                          //   "Cur" + localStorage.getItem("mainCur")
                          // )
                          //   ? parseFloat(EditPrice) /
                          //     localStorage.getItem("Rate")
                          //   : parseFloat(EditPrice),
                          EditPPrice != props.Client["cur"]
                            ? EditPrice / props.Client["Rate"]
                            : EditPrice,
                        Note: NoteT,
                        DateT: DateTT,
                        TimeT: TimeTT,
                        PQUnit: tempa[EditIdx]["PQUnit"],
                        PType: EditType,
                        TotalPieces: tempa[EditIdx]["TotalPieces"],
                        PPrice: PPriceT,
                        BPUnit: tempa[EditIdx]["BPUnit"],
                        SPUnit: tempa[EditIdx]["SPUnit"],
                        InitialPrice: tempa[EditIdx]["InitialPrice"],
                        StockQty: tempa[EditIdx]["StockQty"],
                      };
                      console.log("*//////ana bel edit vouchers///****");
                      let pAreEqual = true;

                      if (oldtempa["uprice"] !== tempa[EditIdx]["uprice"]) {
                        pAreEqual = false;
                      }
                      if (oldtempa["branch"] !== tempa[EditIdx]["branch"]) {
                        pAreEqual = false;
                      }
                      if (oldtempa["PPrice"] !== tempa[EditIdx]["PPrice"]) {
                        pAreEqual = false;
                      }
                      if (oldtempa["PType"] !== tempa[EditIdx]["PType"]) {
                        pAreEqual = false;
                      } else if (!pAreEqual) {
                        console.log("rouhhhhhhhhhhhh");

                        props.setpropertiesAreEqual(false);
                        const currentDate = new Date();
                        const formattedDate = `${currentDate
                          .getDate()
                          .toString()
                          .padStart(2, "0")}/${(currentDate.getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}/${currentDate.getFullYear()}`;
                        const formattedTime = `T${currentDate
                          .getHours()
                          .toString()
                          .padStart(2, "0")}:${currentDate
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")}:${currentDate
                          .getSeconds()
                          .toString()
                          .padStart(2, "0")}`;
                        tempa[EditIdx]["DateT"] = formattedDate;
                        console.log(
                          formattedDate,
                          "hon aamenaayit l date l jdid edit"
                        );
                        tempa[EditIdx]["TimeT"] = formattedTime;
                      }
                      setErrorMessage("");

                      setShow(false);
                      setIdOptions([]);

                      props.setSelectedItems(tempa);
                      console.log("-------------------------3---3-3-3");
                      console.log(props.SelectedItems);
                      let accName = props.Client;
                      let items = props.SelectedItems;
                      let RemovedItems = props.RemovedItems;
                      let json = { accName, items, RemovedItems };
                      let jsonString = JSON.stringify(json); // Convert data object to JSON string

                      console.log("ghayrik enti", jsonString);
                      localStorage.setItem("sales", jsonString);
                      console.log(localStorage.getItem("sales"));
                    }}
                  >
                    Apply
                  </Button>
                </div>
                <div className="flex flex-row align-middle justify-between">
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShow(false);

                      let tempa = [...props.SelectedItems]; // Create a copy of SelectedItems array
                      if (
                        selectedInvoice != undefined &&
                        selectedInvoice != null &&
                        selectedInvoice != ""
                      ) {
                        // if(props.SelectedItems.length==1){
                        //     setDeleteLastItemFromHistory(true);
                        // }

                        let DeleteItemPermission =
                          localStorage.getItem("DeleteItem");
                        if (DeleteItemPermission == "Y") {
                          if (props.SelectedItems.length == 1) {
                            setDeleteLastItemFromHistory(true);
                          } else {
                            RemoveItem(tempa[EditIdx], "ITEM");

                            tempa.splice(EditIdx, 1); // Remove the item at index EditIdx
                            tempa.forEach((item, index) => {
                              item.lno = index + 1; // Update lno starting from 1 and incrementing by 1
                            });

                            props.setSelectedItems(tempa);
                            let accName = props.Client;

                            let items = tempa;

                            let RemovedItems = props.RemovedItems;
                            let json = { accName, items, RemovedItems };
                            // let json = {accName,items}
                            let jsonString = JSON.stringify(json); // Convert data object to JSON string

                            console.log("y22");

                            localStorage.setItem("sales", jsonString);
                            console.log("heyyy", localStorage.getItem("sales"));

                            props.setpropertiesAreEqual(false);
                            setErrorMessage("");
                          }
                        } else {
                          setDeletePermission({
                            show: true,
                            message:
                              "You don't have permission to delete Item From invoice.",
                          });
                        }
                      } else {
                        tempa.splice(EditIdx, 1); // Remove the item at index EditIdx
                        tempa.forEach((item, index) => {
                          item.lno = index + 1; // Update lno starting from 1 and incrementing by 1
                        });
                        props.setSelectedItems(tempa);
                        let accName = props.Client;

                        let items = tempa;

                        let RemovedItems = props.RemovedItems;

                        let json = { accName, items, RemovedItems };
                        //let json = {accName,items}
                        let jsonString = JSON.stringify(json); // Convert data object to JSON string

                        localStorage.setItem("sales", jsonString);

                        props.setpropertiesAreEqual(false);
                        setErrorMessage("");
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </>
        )}
      </Modal>
      <ConfirmPostInvoiceModal
        modalShow={confirmModalShow}
        setModalShow={setConfirmModalShow}
        postInvoice={props.postInvoice}
        token={props.token}
        type={props.selectedFormOption}
        Client={props.Client}
        items={props.SelectedItems}
        RemovedItems={props.RemovedItems}
        selectedInvoice={selectedInvoice}
        setSelectedInvoice={setSelectedInvoice}
        finalTotal={finalTotal}
        finalTax={finalTax}
        SATFromBranch={props.SATFromBranch}
        setSATFromBranch={props.setSATFromBranch}
        setSATToBranch={props.setSATToBranch}
        SATToBranch={props.SATToBranch}
      />
      <DiscardInvoiceModal
        modalShow={discardModalShow}
        setModalShow={setDiscardModalShow}
        exit={props.inv}
        callBack={discardInvoice}
      />
      <Modal
        show={NewInvoiceAlertModalShow}
        onHide={() => setNewInvoiceAlertModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Unsaved Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            There is Unsaved Changes in Your Invoice<br></br>Are You Sure You
            Want To Clear Current Invoice Without Saving?
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button onClick={() => setNewInvoiceAlertModalShow(false)}>
              No
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                //props.callBack()

                clearInvoice();
              }}
            >
              Yes
            </Button>
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
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Unsaved Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are You Sure You Want To Exit Invoice Without Saving Changes?</h4>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button onClick={() => setDiscardOldInvoiceModalShow(false)}>
              No
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                //props.callBack()
                props.setpropertiesAreEqual(true);
                console.log("dirigin", props.propertiesAreEqual);
                props.inv("");
                setsOption("Accounts");
                setvInput("");
                setSelectedInvoice("");
                setDiscardOldInvoiceModalShow(false);
                props.setClient({
                  id: "",
                  name: "",
                  RefNo: "",
                  date: "",
                  time: "",
                  balance: "",
                  address: "",
                  cur: "",
                  Rate: "",
                });
                props.setSelectedItems([]);
                props.setRemovedItems([]);

                console.log("y8");
                localStorage.setItem("sales", "");
                props.setsInvoices([]);
                localStorage.setItem("InvoiceHistory", "");
                localStorage.setItem("sales", "");
              }}
            >
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* <Modal
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
            </Modal> */}
      <Modal
        show={EmptyAlertModalShow}
        onHide={() => setEmptyAlertModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Empty Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            {props.Client["id"] == ""
              ? "No Account Choosen"
              : props.propertiesAreEqual == true
              ? "No Changes In Your Invoice"
              : "No Items in your invoice"}
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button
              variant="primary"
              onClick={() => setEmptyAlertModalShow(false)}
            >
              Ok
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={ItemsWithoutAccount}
        onHide={() => setItemsWithoutAccount(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Empty Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            {"No Account Choosen Yet."}
            <br /> {"Please select Account first"}
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button
              variant="danger"
              onClick={() => setItemsWithoutAccount(false)}
            >
              Ok
            </Button>
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
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Unsaved Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            You cannot Switch to Another Account Without saving the changes
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button onClick={() => setswitchBetweenInvoicesModalShow(false)}>
              Ok
            </Button>
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
      <Modal
        show={SearchAccountModalShow}
        onHide={() => setSearchAccountModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Invoice Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            Are You Sure You Want To Change the Account Invoice From{" "}
            {props.Client.id} to {newAccount} ?
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button onClick={() => setSearchAccountModalShow(false)}>No</Button>
            <Button
              variant="danger"
              onClick={() => {
                //props.callBack()

                getInvoiceOptions();
                setModalShow(true);
                // setSelectedInvoice("");
                setSearchAccountModalShow(false);
                childRef.current.selectHandler(
                  props.handlingAccWhenChanging,
                  "fromParent"
                );
              }}
            >
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={DeleteLastItemFromHistory}
        onHide={() => setDeleteLastItemFromHistory(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Deleting Last Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>
            Deleting This Item will let The Invoice Empty<br></br>{" "}
            <h3>
              Delete The Invoice <strong>Or</strong> Add A New Item Before
              Deleting This One
            </h3>
          </h3>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button onClick={() => setDeleteLastItemFromHistory(false)}>
              OK
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={DeleteInvoiceModal}
        onHide={() => setDeleteInvoiceModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Deleting Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Are You sure You Want Proceed in Deleting The Invoice?</h3>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button onClick={() => setDeleteInvoiceModal(false)}>No</Button>
            <Button
              variant="danger"
              onClick={() => {
                setDeleteInvoiceModal(false);

                DeleteInvoice(
                  props.SelectedItems,
                  props.RemovedItems,
                  props.Client,
                  "INV"
                );
              }}
            >
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={DeletePermission.show}
        onHide={() => setDeletePermission({ ...DeletePermission, show: false })}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Permission Denied
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{DeletePermission.message || "Permission denied."}</h3>{" "}
          {/* Display the message */}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button
              variant="primary"
              onClick={() =>
                setDeletePermission({ ...DeletePermission, show: false })
              }
            >
              Ok
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={ErrorModal.show}
        onHide={() => setErrorModal({ ...ErrorModal, show: false })}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Error Occured
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{ErrorModal.message}</h3> {/* Display the message */}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button
              variant="primary"
              onClick={() => setErrorModal({ ...ErrorModal, show: false })}
            >
              Ok
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={SwitchFormOption.show}
        onHide={() => setSwitchFormOption({ ...SwitchFormOption, show: false })}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {SwitchFormOption.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{SwitchFormOption.message}</h4> {/* Display the message */}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button
              variant="primary"
              onClick={() =>
                setSwitchFormOption({ ...SwitchFormOption, show: false })
              }
            >
              ok
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={NoSavedToDelete}
        onHide={() => setNoSavedToDelete(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Failed
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>There is No Saved Invoice To Delete it.</h3>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button variant="primary" onClick={() => setNoSavedToDelete(false)}>
              Ok
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Select an Option:</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Your six boxes here */}
              <button
                className="bg-indigo-500 text-white py-4 px-8 rounded-md text-center"
                onClick={() => formOptionProcessing("SA_AP")}
              >
                Sales
              </button>
              <button
                className="bg-indigo-500 text-white py-4 px-8  rounded-md text-center"
                onClick={() => formOptionProcessing("OD_AP")}
              >
                Order
              </button>
              <button
                className="bg-indigo-500 text-white py-4 px-8   rounded-md text-center"
                onClick={() => formOptionProcessing("PR_AP")}
              >
                Purchase Return
              </button>
              <button
                className="bg-indigo-500 text-white py-4 px-8  rounded-md text-center"
                onClick={() => formOptionProcessing("PI_AP")}
              >
                Purchase
              </button>
              <button
                className="bg-indigo-500 text-white py-4 px-8   rounded-md text-center"
                onClick={() => formOptionProcessing("SR_AP")}
              >
                Sales Return
              </button>
              <button
                className="bg-indigo-500 text-white py-4 px-8  rounded-md text-center"
                onClick={() => formOptionProcessing("SAT_AP")}
              >
                Branch Transfer
              </button>
              <button
                className="bg-indigo-500 text-white py-4 px-8 rounded-md text-center"
                onClick={() => formOptionProcessing("CR_AP")}
              >
                Receipt Voucher
              </button>
              <button
                className="bg-indigo-500 text-white py-4 px-8 rounded-md text-center"
                onClick={() => formOptionProcessing("DB_AP")}
              >
                Payment Voucher
              </button>
            </div>
            <button
              className="mt-4 bg-gray-300 hover:bg-gray-400 py-3 px-6  rounded-md"
              onClick={handleCloseDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {SATdialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Select Branches:</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Your six boxes here */}
              <label htmlFor="BranchFrom" className="w-fit">
                FROM Branch :
              </label>
              <select
                id="itemBranch"
                className="p-[0.5rem] w-full h-[100%] rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-semibold text-lg"
                value={props.SATFromBranch}
                onChange={(e) => {
                  props.setSATFromBranch(e.target.value);
                }}
              >
                {props.branches.map((br) => {
                  return (
                    <option key={br.number} value={br.number}>
                      {br.number} - {br.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="itemBranch" className="w-fit">
                TO Branch:
              </label>
              <select
                id="itemBranch"
                className="p-[0.5rem] w-full h-[100%] rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-semibold text-lg"
                value={props.SATToBranch}
                onChange={(e) => {
                  props.setSATToBranch(e.target.value);
                }}
              >
                {props.branches.map((br) => {
                  return (
                    <option key={br.number} value={br.number}>
                      {br.number} - {br.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="justify-between flex">
              <button
                className="mt-4 bg-red-400 hover:bg-red-400 py-3 px-6  rounded-md"
                onClick={() => {
                  setSATDialogOpen(false);
                  setDialogOpen(true);
                }}
              >
                Close
              </button>
              <button
                className="mt-4 bg-indigo-400 hover:bg-indigo-400 py-3 px-6  rounded-md"
                onClick={() => {
                  if (props.SATToBranch != props.SATFromBranch) {
                    setSATDialogOpen(false);
                    props.setSelectedFormOption("SAT_AP");
                  } else {
                    setErrorModal({
                      show: true,
                      message: (
                        <div>
                          You Cannot Transfer To The Same Branch. <br></br>{" "}
                          Please Choose Different Branches
                        </div>
                      ),
                    });
                  }
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  function getInvoiceOptions() {
    console.log(changingAccountInvoiceFromDB);
    let data = {
      token: props.token,
      option: sOption,
      value: vInput,
      username: localStorage.getItem("compname"),
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
  function discardInvoice() {
    props.setClient({
      id: "",
      name: "",
      RefNo: "",
      date: "",
      time: "",
      balance: "",
      address: "",
      cur: "",
      Rate: "",
    });
    props.setSelectedItems([]);
    props.setRemovedItems([]);
    console.log("y7");
    localStorage.setItem("sales", "");
    props.setpropertiesAreEqual(true);
    setSelectedInvoice("");
    localStorage.setItem("InvoiceHistory", "");
    console.log("selectedInvoice");
    console.log(props.selectedInvoice);
    props.setSATFromBranch();
    props.setSATToBranch();
  }
  function clearInvoice() {
    setsOption("Accounts");

    props.setpropertiesAreEqual(true); //lola
    setvInput("");
    setSelectedInvoice("");
    setNewInvoiceAlertModalShow(false);
    props.setClient({
      id: "",
      name: "",
      RefNo: "",
      date: "",
      time: "",
      balance: "",
      address: "",
      cur: "",
      Rate: "",
    });
    props.setSelectedItems([]);
    props.setRemovedItems([]);
    console.log("y6");
    localStorage.setItem("sales", "");
    localStorage.setItem("InvoiceHistory", "");
    // setsInvoices([]);
    console.log("2853");
    props.setSelectedFormOption("SA_AP");

    setSelectedInvoice("");
    inputRef.current.focus();
    props.setSATFromBranch();
    props.setSATToBranch();
    console.log("y777");
    getCompanyInfo();
  }
}
