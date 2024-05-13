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
import ItemStockDetails from "./ItemStockDetails";

export default function SalesForm(props) {
  // const [vInput, setvInput] = useState(
  //   localStorage.getItem("ScannedAccountId") != undefined
  //     ? localStorage.getItem("ScannedAccountId")
  //     : ""
  // );
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
  const [EditTotalPieces, setEditTotalPieces] = useState(1);
  const [newAccount, setnewAccount] = useState("");
  const [EditPQUnit, setEditPQUnit] = useState();
  const [EditPQty, setEditPQty] = useState();
  const [EditInitialPrice, setEditInitialPrice] = useState();
  const [EditItemStockQty, setEditItemStockQty] = useState(0);
  const [EditItemTotalStockQty, setEditItemTotalStockQty] = useState(0);

  const [EditItemBranchesStock, setEditItemBranchesStock] = useState();
  const [DeleteLastItemFromHistory, setDeleteLastItemFromHistory] = useState();
  const [DeleteInvoiceModal, setDeleteInvoiceModal] = useState(false);
  const [DeletePermission, setDeletePermission] = useState(false);
  const [NoSavedToDelete, setNoSavedToDelete] = useState(false);
  const [performCalculation, setPerformCalculation] = useState(false);
  const [ErrorModal, setErrorModal] = useState(false);
  const [SwitchFormOption, setSwitchFormOption] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [SATdialogOpen, setSATDialogOpen] = useState(false);
  const [ItemStockDetailsShow, setItemStockDetailsShow] = useState(false);
  const [ItemDetailsModalData, setItemDetailsModalData] = useState({
    ItemNo: "",
    ItemName: "",
  });
  const [GroupModalShow, setGroupModalShow] = useState(false);
  const [GroupType, setGroupType] = useState("");
  const [CloseSave, setCloseSave] = useState(false);

  const formatter = new Intl.NumberFormat("en-US");
  const handleHeaderClick = () => {
    setDialogOpen(true);
  };

  const EmptyVariable = () => {
    setEditItem({});
    setEditIdx(0);
    setEditQty("");
    setEditTax(0); //hhh
    setEditBranch("");
    setEditInitialPrice();
    setEditDiscount("");
    setEditLno("");
    setEditTotal(1);

    setEditTotalPieces(1);

    setEditType("");
    setEditDBPUnit();
    setEditDPUnit();
    setEditDSPUnit();
    setEditPPrice();
    setEditPQUnit();
    setEditPQty();
    setEditItemStockQty(0);
    setEditItemBranchesStock();
    setEditItemTotalStockQty(0);

    setEditPrice(0);
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
    //   (props.selectedInvoice != undefined && props.selectedInvoice != undefined) ||
    console.log("107", props.selectedFormOption);
    localStorage.setItem("selectedFormOption", props.selectedFormOption);

    if (option === props.selectedFormOption) {
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
      console.log("125");
      if (props.propertiesAreEqual == false && props.SelectedItems.length > 0) {
        // setSwitchFormOption({
        //   show: true,
        //   message: (
        //     <div>
        //       Are You Sure You Want To Change Form Option?
        //       <br />
        //       You Will Lost Your Items.
        //     </div>
        //   ),
        //   //variable: option,
        //   title: "Calling New Form",
        //   variable: option,
        // });
        setErrorModal({
          show: true,
          message: (
            <div>
              There Is UnSaved Data. <br></br> Please Save Or Clear Invoice
              Before Changing Form Option.
            </div>
          ),
          title: option,
        });
        setDialogOpen(false);
        return;
      }

      console.log("126", option);
      props.setSelectedFormOption(option);
      console.log("101010");
      setDialogOpen(false);
    } else {
      console.log("kkjkjkjkjkjkjj");
      if (
        props.propertiesAreEqual == false &&
        props.SelectedItems.length > 0 &&
        option != "CR_AP" &&
        option != "DB_AP" &&
        (props.selectedFormOption == "CR_AP" ||
          props.selectedFormOption == "DB_AP")
      ) {
        // setSwitchFormOption({
        //   show: true,
        //   message: (
        //     <div>
        //       Are You Sure You Want To Change Form Option?
        //       <br />
        //       You Will Lost Your Items.
        //     </div>
        //   ),
        //   //variable: option,
        //   title: "Calling New Form",
        //   variable: option,
        // });
        setErrorModal({
          show: true,
          message: (
            <div>
              There Is UnSaved Data. <br></br> Please Save Or Clear Invoice
              Before Changing Form Option.
            </div>
          ),
          title: option,
        });
        setDialogOpen(false);
        return;
      }
      // else if (
      //   props.propertiesAreEqual == false &&
      //   option != "CR_AP" &&
      //   option != "DB_AP" &&
      //   (props.selectedFormOption == "CR_AP" ||
      //     props.selectedFormOption == "DB_AP")
      // ) {
      //   setsOption("Amounts");
      // }
      else {
        console.log("131", option);
        props.setSelectedFormOption(option);
        props.setSATFromBranch();
        props.setSATToBranch();
        setDialogOpen(false);
        return;
      }
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
      if (EditType === "1") {
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
      if (EditType === "1") {
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
        if (
          props.selectedFormOption != "DB_AP" &&
          props.selectedFormOption != "CR_AP"
        ) {
          setErrorMessage("The Item Price is 0 !");
        } else {
          setErrorMessage("The Amount is 0 !");
        }
      } else {
        setErrorMessage("");
      }
    };

    UpriceZeroCheck();
  }, [EditPrice]);

  useEffect(() => {
    console.log("223");
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
      props.setSelectedFormOptionDisplay("Sales");
      if (
        props.Client["id"] &&
        props.Client["id"] != "" &&
        props.Client["id"] != null &&
        props.Client["id"] != undefined
      ) {
        setsOption("Items");
      } else {
        setsOption("Accounts");
      }
    } else if (props.selectedFormOption == "SR_AP") {
      props.setSelectedFormOptionDisplay("Sales Return");
      if (
        props.Client["id"] &&
        props.Client["id"] != "" &&
        props.Client["id"] != null &&
        props.Client["id"] != undefined
      ) {
        setsOption("Items");
      } else {
        setsOption("Accounts");
      }
    } else if (props.selectedFormOption == "OD_AP") {
      props.setSelectedFormOptionDisplay("Order");
      if (
        props.Client["id"] &&
        props.Client["id"] != "" &&
        props.Client["id"] != null &&
        props.Client["id"] != undefined
      ) {
        setsOption("Items");
      } else {
        setsOption("Accounts");
      }
    } else if (props.selectedFormOption == "PI_AP") {
      props.setSelectedFormOptionDisplay("Purchase");
      if (
        props.Client["id"] &&
        props.Client["id"] != "" &&
        props.Client["id"] != null &&
        props.Client["id"] != undefined
      ) {
        setsOption("Items");
      } else {
        setsOption("Accounts");
      }
    } else if (props.selectedFormOption == "PR_AP") {
      props.setSelectedFormOptionDisplay("Purchase Return");
      if (
        props.Client["id"] &&
        props.Client["id"] != "" &&
        props.Client["id"] != null &&
        props.Client["id"] != undefined
      ) {
        setsOption("Items");
      } else {
        setsOption("Accounts");
      }
    } else if (props.selectedFormOption == "SAT_AP") {
      props.setSelectedFormOptionDisplay("Branch Transfer");
      setsOption("Items");
    } else if (props.selectedFormOption == "CR_AP") {
      props.setSelectedFormOptionDisplay("Receipt Voucher");
      setsOption("Accounts");
    } else if (props.selectedFormOption == "DB_AP") {
      props.setSelectedFormOptionDisplay("Payment Voucher");
      setsOption("Accounts");
    }
    console.log("234", props.selectedFormOption);
    localStorage.setItem("selectedFormOption", props.selectedFormOption);
    if (props.selectedFormOption != "SAT_AP") {
      props.setSATFromBranch();
      props.setSATToBranch();
      localStorage.setItem("SATFromBranch", "");
      localStorage.setItem("SATToBranch", "");
    }
    //     if (
    //       props.selectedFormOption != "SAT_AP" &&
    //       (props.Client["id"] == "" ||
    //         props.Client["id"] == undefined ||
    //         props.Client["id"] == null)
    //     ) {
    //       setsOption("Accounts");
    //     }else if(props.selectedFormOption != "SAT_AP" &&
    //       props.selectedFormOption != "DB_AP" &&
    //      props.selectedFormOption != "CR_AP" &&
    //     (props.Client["id"] != "" &&
    //       props.Client["id"] != undefined &&
    //       props.Client["id"] != null)){
    // setsOption("Items")
    //     }else{

    //     }
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
      if (
        props.selectedInvoice != "" &&
        props.selectedInvoice != "" &&
        props.selectedInvoice != null
      ) {
        ReleaseInvoice();
      }
      props.setSelectedInvoice("");
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
        mobile: "",
      });

      localStorage.setItem("InvoiceHistory", selectedValue);
      console.log("264", "sa_ap");
      props.setSelectedFormOption("SA_AP");
      setsOption("Accounts");
    } else {
      if (
        props.selectedInvoice != "" &&
        props.selectedInvoice != "" &&
        props.selectedInvoice != null
      ) {
        ReleaseInvoice();
      }
      // props.setSelectedInvoice(selectedValue);
      // localStorage.setItem("InvoiceHistory", selectedValue);
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
          if (response.data.Info == "authorized") {
            // Handle success response
            console.log("invProfile", response.data.InvProfile[0]);
            props.setSelectedItems(response.data.Invoices);
            console.log("muy", response.data.Invoices);
            props.setClient(response.data.InvProfile[0]);
            console.log("shikishikida", response.data.InvProfile[0]);
            props.setSelectedFormOption(response.data.InvProfile[0]["RefType"]);
            props.setRemovedItems([]);
            props.setSATFromBranch(response.data.InvProfile[0]["Branch"]);
            props.setSATToBranch(response.data.InvProfile[0]["TBranch"]);

            localStorage.setItem(
              "SATFromBranch",
              response.data.InvProfile[0]["Branch"]
            );
            localStorage.setItem(
              "SATToBranch",
              response.data.InvProfile[0]["TBranch"]
            );

            if (response.data.InvProfile[0]["RefType"] == "SAT_AP") {
              setsOption("Items");
            } else if (
              response.data.InvProfile[0]["RefType"] == "CR_AP" ||
              response.data.InvProfile[0]["RefType"] == "DB_AP"
            ) {
              setsOption("Amounts"); //hon
            } else {
              setsOption("Items");
            }

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
                mobile: response.data.InvProfile[0]["mobile"],
              },

              items: response.data.Invoices,
              RemovedItems: [],
            });
            props.setSelectedInvoice(selectedValue);
            localStorage.setItem("InvoiceHistory", selectedValue);
          } else {
            setErrorModal({
              show: true,
              message: <div>{response.data.message}</div>,
              title: "Invoice Unavailable",
            });
          }
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
    }
  };

  const ReleaseInvoice = () => {
    axios({
      method: "post", // or 'get', 'put', 'delete', etc.
      url:
        props.url +
        "/moh/ReleaseInvoice/" +
        localStorage.getItem("compname") +
        "/" +
        localStorage.getItem("username") +
        "/" +
        props.selectedInvoice +
        "/",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
    })
      .then((response) => {
        if (response.data.Info == "authorized") {
        } else {
          setErrorModal({
            show: true,
            message: <div>{response.data.message}</div>,
            title: "Release Invoice",
          });
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
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
        console.log("false455");
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
      console.log("lklklkllk", retrievedJson["accName"]);
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

      props.setSelectedInvoice(localStorage.getItem("InvoiceHistory"));

      if (localStorage.getItem("propertiesAreEqual") == "true") {
        props.setpropertiesAreEqual(true);
      } else if (localStorage.getItem("propertiesAreEqual") == "false") {
        console.log("false508");
        props.setpropertiesAreEqual(false);
      }
    }
    props.setSATFromBranch(localStorage.getItem("SATFromBranch"));
    props.setSATToBranch(localStorage.getItem("SATToBranch"));
    console.log("watchhttttt2222", localStorage.getItem("SATToBranch"));
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
      RefNo: props.selectedInvoice,
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
      RefNo: props.selectedInvoice,
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
          props.getInvoicesHistory();
        } else if (res.data.Info == "Failed") {
          console.log("erowwww");
          setErrorModal({
            show: true,
            message: res.data.msg,
            title: "Error Occured",
          });
        }
      })
      .catch((error) => {
        console.error("Error in getInvoicesHistory:", error);
        setErrorModal({ show: true, message: error, title: "Error Occured" });

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
        console.log("men info", data.CompanyInfo);
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
          console.log("fet aw mafetet");
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
        localStorage.setItem("GroupType", data.CompanyInfo["GroupType"]);
        localStorage.setItem("PrintFormat", data.CompanyInfo["PrintFormat"]);
        localStorage.setItem(
          "GrpSearchMethod",
          data.CompanyInfo["GrpSearchMethod"]
        );
        localStorage.setItem("CompanyCode", data.CompanyInfo["CompanyCode"]);
        localStorage.setItem("Notify", data.CompanyInfo["Notify"]);
      }
    } catch (error) {
      // Handle errors here if needed
      console.error("Error fetching data:", error);
    }
  };
  const checkChangesOnEdit = (oldtempa, newValue) => {
    let pAreEqual = true;
    if (oldtempa["qty"] !== newValue["qty"]) {
      console.log("fetttt qty");
      pAreEqual = false;
    }

    if (oldtempa["uprice"] != newValue["uprice"]) {
      console.log("fetttt uprice");

      pAreEqual = false;
    }
    if (oldtempa["branch"] !== newValue["branch"]) {
      console.log("fetttt branch");
      pAreEqual = false;
    }
    if (oldtempa["discount"] !== newValue["discount"]) {
      console.log("fetttt disc");
      pAreEqual = false;
    }

    if (oldtempa["tax"] !== newValue["tax"]) {
      console.log("fetttt tax");
      console.log(oldtempa["tax"], newValue["tax"]);
      pAreEqual = false;
    }
    if (oldtempa["PType"] !== newValue["PType"]) {
      console.log("fetttt edittype");
      pAreEqual = false;
    }
    return pAreEqual;
  };
  const getOldNewInputs = () => {
    let tempa = props.SelectedItems;
    let newdata;
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
            EditPrice * EditQty * (1 - EditDiscount / 100) * (1 + EditTax / 100)
          );
    newdata = {
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
      BranchesStock: EditItemBranchesStock,
      TotalStockQty: EditItemTotalStockQty,
    };
    return [oldtempa, newdata];
  };
  const GoodsInvoiceSaveChanges = (pAreEqual, tempa) => {
    if (!pAreEqual) {
      console.log("rouhhhhhhhhhhhh");
      console.log("false1983");
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
    EmptyVariable();
  };

  const printing = () => {
    if (
      props.propertiesAreEqual == true &&
      props.selectedInvoice != "" &&
      props.selectedInvoice != "" &&
      props.selectedInvoice != null
    ) {
      let type = props.selectedFormOption;
      let Client = props.Client;
      let items = props.SelectedItems;

      let RemovedItems = props.RemovedItems;
      let data = {
        type: type,
        accno: Client.id,
        accDate: Client.data,
        accTime: Client.time,
        accRefNo: Client.RefNo,
        accname: Client.name,
        items: items,
        RemovedItems: RemovedItems,
        username: localStorage.getItem("username"),
        invoiceTotal: finalTotal,
      };
      props.downloadPDF(data, props.selectedInvoice);
    } else {
      setErrorModal({
        show: true,
        message: "The Invoice Is Empty",
        title: "Empty Invoice",
      });
    }
  };
  async function sendWhastAPP(phoneNumber, items, invoiceTotal) {
    // Convert the items object to a JSON string
    if (
      props.propertiesAreEqual == true &&
      props.selectedInvoice != "" &&
      props.selectedInvoice != "" &&
      props.selectedInvoice != null
    ) {
      if (
        props.Client["mobile"] &&
        props.Client["mobile"] != "null" &&
        props.Client["mobile"] != undefined &&
        props.Client["mobile"] != ""
      ) {
        let invoiceMessage = "";

        for (let i = 0; i < items.length; i++) {
          invoiceMessage += `Item ${i + 1}:\n`;
          invoiceMessage += `------\n`;
          invoiceMessage += `Name: ${items[i].name}\n`;
          invoiceMessage += `Quantity: ${items[i].TotalPieces}\n`;
          invoiceMessage += `Price: ${items[i].uprice}\n`;
          invoiceMessage += `Total: ${items[i].Total}\n`;
          invoiceMessage += `------------------\n`;
        }
        invoiceMessage += `\n`;
        invoiceMessage += `Invoice Total: ${invoiceTotal}\n`;
        // Copy the invoice message to the clipboard
        const copyToClipboard = async (text) => {
          try {
            await navigator.clipboard.writeText(text);
            console.log("Text copied to clipboard:", text);
            // Optionally, you can show a success message to the user
          } catch (error) {
            console.error("Error copying text to clipboard:", error);
            // Optionally, you can show an error message to the user
          }
        };
        await copyToClipboard(invoiceMessage);

        // URL encode the message
        let encodedMessage = encodeURIComponent(invoiceMessage);

        window.open(
          `https://api.whatsapp.com:/send?phone=${phoneNumber}&text=${encodedMessage}`
        );
      } else {
        props.setsaveWhatsAppModel({
          show: true,
          message: "Do You Want To Save Mobile Number Of The Client",
          title: "Number Not Found",
        });
      }
    } else {
      setErrorModal({
        show: true,
        message: "The Invoice Is Empty",
        title: "Empty Invoice",
      });
    }
  }
  const saveNew = (flag) => {
    if (
      (props.SelectedItems.length == 0 && props.RemovedItems.length == 0) ||
      (props.Client &&
        props.Client.id === "" &&
        props.Client.name === "" &&
        props.Client.RefNo === "" &&
        props.Client.date === "" &&
        props.Client.time === "" &&
        props.Client.balance === "" &&
        props.Client.address === "" &&
        props.Client.cur === "" &&
        props.Client.Rate === "" &&
        props.selectedFormOption != "SAT_AP") ||
      props.propertiesAreEqual == true
    ) {
      if (flag == "saveNew") {
        setEmptyAlertModalShow(true);
      }
      console.log("//**/////");
      console.log(props.Client);
      return false;
    } else {
      console.log("//****/////");
      console.log(props.Client);
      props.setsaveNewFlag({ show: true, variable: flag });
      setConfirmModalShow(true);
      return true;
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
      props.getInvoicesHistory();
      props.setafterSubmitModal(false);
      // handleSelectChange("");
      // selectRef.current.value = "Accounts";
      //props.setSelectedInvoice("");
      if (props.selectedFormOption == "SAT_AP") {
        setsOption("Items");
      } else if (
        props.selectedFormOption == "CR_AP" ||
        props.selectedFormOption == "DB_AP"
      ) {
        setsOption("Amounts");
      } else {
        setsOption("Accounts");
      }

      selectInvRef.current.value = "";
      console.log("594");
      props.setSelectedFormOption(localStorage.getItem("selectedFormOption"));
      if (
        localStorage.getItem("selectedFormOption") == "CR_AP" ||
        localStorage.getItem("selectedFormOption") == "DB_AP"
      ) {
        setsOption("Accounts");
      } else if (localStorage.getItem("selectedFormOption") == "SAT_AP") {
        setsOption("Items");
      } else {
        // if (
        //   (localStorage.getItem("selectedFormOption") == "SA_AP" ||
        //     localStorage.getItem("selectedFormOption") == "SR_AP" ||
        //     localStorage.getItem("selectedFormOption") == "PR_AP" ||
        //     localStorage.getItem("selectedFormOption") == "PI_AP" ||
        //     localStorage.getItem("selectedFormOption") == "OD_AP") &&
        //   props.Client["id"] &&
        //   props.Client["id"] != "" &&
        //   props.Client["id"] != null &&
        //   props.Client["id"] != undefined
        // ) {
        //   console.log("heyyyyyyyy", props.Client["id"]);

        //   setsOption("Items");
        // } else {
        //   console.log("msh heyyyyyyyy", props.Client["id"]);
        //   setsOption("Accounts");
        setsOption("Accounts");
        // }
      }
      getCompanyInfo();
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
              //if(props.selectedInvoice!=""){
              //     if(props.propertiesAreEqual==false && props.selectedInvoice!="" && props.selectedInvoice !=undefined){

              //     console.log(props.propertiesAreEqual);
              //     console.log("lklklkk")
              //     console.log(props.selectedInvoice);
              //     setDiscardOldInvoiceModalShow(true);
              // }
              // else{

              //     props.inv("");
              // }
              window.location.href = "/";
              // props.inv("");
            }}
          />
          {/* <h6 className="h-[100%]">Sales Invoice</h6> */}
        </div>
        <div className="h-[12%]">
          <div className="  w-[97.5%] h-[100%]  mx-auto flex flex-row items-center">
            <div className="w-[36%]">
              <input
                type="text"
                ref={inputRef}
                className="text-lg font-semibold block rounded-md w-full  h-[3rem] border border-secondd bg-white px-4 py-2 focus:outline-none focus:border-secondd focus:ring-1 focus:ring-secondd text-lg"
                placeholder="Search Value"
                value={vInput}
                onChange={(e) => {
                  setvInput(e.target.value);
                }}
                id="tf"
              />
            </div>
            <div className="ml-[2%] w-[30%] flex justify-between">
              <button
                className="bg-secondd text-BgTextColor w-[70%] h-[3rem] rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md"
                onClick={() => {
                  if (
                    (props.Client["id"] == "" ||
                      props.Client["id"] == undefined) &&
                    sOption == "Items" &&
                    props.selectedFormOption != "SAT_AP"
                  ) {
                    setItemsWithoutAccount(true);
                  } else if (sOption == "Amounts") {
                    if (
                      props.Client["id"] == undefined ||
                      props.Client["id"] == "undefined" ||
                      props.Client["id"] == "" ||
                      props.Client["id"] == null
                    ) {
                      setErrorModal({
                        show: true,
                        message: <div>You Should Choose An Account First.</div>,
                        title: "No Account",
                      });
                    } else {
                      props.setModalVoucher(true);
                    }
                  } else {
                    getInvoiceOptions("");
                    setModalShow(true);
                    localStorage.setItem("InvoiceHistory", "");
                  }
                }}
              >
                Select {sOption}
              </button>
              <button
                className={`bg-secondd text-BgTextColor w-[25%] h-[3rem] rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md ${
                  props.selectedFormOption === "CR_AP" ||
                  props.selectedFormOption === "DB_AP"
                    ? "bg-white text-white cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  if (
                    (props.Client["id"] == "" ||
                      props.Client["id"] == undefined) &&
                    sOption == "Items" &&
                    props.selectedFormOption != "SAT_AP"
                  ) {
                    setItemsWithoutAccount(true);
                  } else {
                    console.log(
                      "GROUP TYPE",
                      localStorage.getItem("GroupType")
                    );
                    if (sOption == "Items") {
                      if (
                        localStorage.getItem("GroupType") &&
                        localStorage.getItem("GroupType") != "" &&
                        localStorage.getItem("GroupType") != "null"
                      ) {
                        getGroupOptions(localStorage.getItem("GroupType"));
                      } else {
                        getInitialGroupOptions();
                      }
                    } else {
                      setErrorModal({
                        show: true,
                        message: (
                          <div>
                            You Should Choose Search Items Selection First.
                          </div>
                        ),
                        title: "Select Items Search",
                      });
                    }
                    //setGroupModalShow(true);
                    // getInvoiceOptions();
                    // setModalShow(true);
                    // localStorage.setItem("InvoiceHistory", "");
                  }
                }}
                disabled={
                  props.selectedFormOption == "CR_AP" ||
                  props.selectedFormOption === "DB_AP"
                }
              >
                Select Group
              </button>
            </div>
            <div className="ml-[2%] w-[30%] h-[3rem]">
              <select
                className=" select-style "
                value={sOption}
                ref={selectRef}
                onChange={(e) => {
                  setsOption(e.target.value);
                  document.getElementById("tf").focus();
                  setvInput("");
                }}
              >
                {props.selectedFormOption != "SAT_AP" && (
                  <option className="py-2 text-lg">Accounts</option>
                )}
                {props.selectedFormOption != "DB_AP" &&
                props.selectedFormOption != "CR_AP" ? (
                  <option className="py-2 text-lg">Items</option>
                ) : (
                  <option className="py-2 text-lg">Amounts</option>
                )}
              </select>
            </div>
          </div>
        </div>
        <div className=" w-[97.5%] shadow-lg mx-auto h-[85%] rounded p-2 bg-third border-gray-300">
          <div className="flex flex-col justify-between h-[100%]">
            {" "}
            {/* Model content*/}
            <div className="invoiceRateOption">
              <div className="flex flex-row items-center justify-between ">
                <div className=" flex flex-row justify-between">
                  {/* <div className="text-xl font-semibold w-fit">Client:</div> */}

                  {/* <input
                    type={"text"}
                    className="block rounded-md w-1/2 h-100% border border-gray-400 mx-1 px-2 focus:border-second focus:ring-second sm:text-sm bg-white"
                    placeholder={"Client Id"}
                    value={props.Client["id"]}
                    disabled
                  /> */}
                  <div className="bg-fourth text-BgTextColor rounded p-0.5 w-50%">
                    {props.Client["id"] ? props.Client["id"] : "-"}
                  </div>
                  <div className="flex flex-row ml-[10%] bg-fourth text-BgTextColor rounded p-0.5">
                    {/* <div>AccCur: </div> */}
                    <div>
                      {props.Client["cur"] != undefined &&
                      props.Client["cur"] != null &&
                      props.Client["cur"] != ""
                        ? props.Client["cur"]
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className=" flex flex-row justify-center w-[20%]">
                  {props.SATFromBranch != "undefined" &&
                    props.SATFromBranch != null &&
                    props.SATFromBranch != "" &&
                    props.SATToBranch != "undefined" &&
                    props.SATToBranch != null &&
                    props.SATToBranch != "" && (
                      <>
                        <div className="flex flex-row ml-[10%]  text-BgTextColor rounded p-0.5">
                          <div style={{ marginRight: "3px" }}>From :</div>
                          <div>
                            {props.SATFromBranch !== "undefined"
                              ? "  " + props.SATFromBranch
                              : "-"}
                          </div>
                        </div>

                        <div className="flex flex-row ml-[10%]  text-BgTextColor rounded p-0.5">
                          <div style={{ marginRight: "3px" }}>To :</div>
                          <div>
                            {props.SATToBranch !== "undefined" &&
                            props.SATToBranch != null &&
                            props.SATToBranch !== ""
                              ? " " + props.SATToBranch
                              : "-"}
                          </div>
                        </div>
                      </>
                    )}
                </div>
                <div className="flex flex-row justify-end">
                  <div className="flex flex-row w-2/3 justify-end">
                    <div className="flex flex-row bg-fourth text-BgTextColor rounded p-0.5">
                      {/* <div>CompCur: </div> */}
                      <div>
                        {localStorage.getItem(
                          "Cur" + localStorage.getItem("mainCur")
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-fourth text-BgTextColor rounded p-0.5 ml-[5%]">
                    {/* CurRate:{" "} */}
                    {props.Client["Rate"] == null ||
                    props.Client["Rate"] == undefined ||
                    props.Client["Rate"] == ""
                      ? localStorage.getItem("Rate") != undefined &&
                        localStorage.getItem("Rate") != "" &&
                        localStorage.getItem("Rate") != null
                        ? localStorage.getItem("Rate")
                        : "--"
                      : props.Client["Rate"]}
                  </div>
                </div>
              </div>

              <h2
                className="text-center text-xl2 text-BgTextColor font-bold"
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
                  if (
                    props.selectedInvoice != "" &&
                    props.selectedInvoice != undefined
                  ) {
                    setErrorModal({
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
                      title: "Form Option",
                      variable: "",
                    });
                    return;
                  } else {
                    handleHeaderClick();
                  }
                }}
              >
                {props.selectedFormOptionDisplay}
              </h2>
              <div></div>
            </div>
            <div className="clientBalCall">
              {/**if mobile 40% if web 15% */}
              <div className="w-[100%] h-[47.5%] flex flex-row justify-between">
                <div className="w-[50%] flex flex-column justify-center items-end">
                  <div className="w-full flex flex-row justify-center bg-fourth text-black rounded p-0.5 h-[100%]">
                    {/* <div className="text-xl font-semibold mr-1">Name:</div> */}
                    <div className="Text">{props.Client["name"]}</div>
                  </div>
                </div>
                <div className="w-[24%] h-[100%] flex flex-row justify-center bg-fourth text-black rounded p-0.5">
                  {/* <div className="text-xl font-semibold mr-1">Bal:</div> */}
                  <div className="Text">
                    {props.Client["balance"] !== "" &&
                      props.Client["balance"] !== undefined &&
                      props.Client["balance"] !== null &&
                      props.Client["balance"].toLocaleString() +
                        " " +
                        props.Client["cur"]}
                  </div>
                </div>
                <div className="w-[24%] flex flex-row justify-center">
                  {/* <div className="text-xl font-semibold w-fit">Call:</div> */}

                  <select
                    className="select-style ReCall-select-style"
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
                    value={props.selectedInvoice}
                    onClick={props.getInvoicesHistory}
                  >
                    <option value="" className="optionText">
                      ReCall
                    </option>

                    {props.sInvoices.map((inv, idx) => {
                      return inv["RefType"] == "SAT_AP" ? (
                        <option
                          value={inv["RefNo"]}
                          key={idx}
                          className="optionText"
                        >
                          {inv["RefType"]}_{inv["RefNo"]}
                        </option>
                      ) : (
                        <option
                          value={inv["RefNo"]}
                          key={idx}
                          className="optionText"
                        >
                          {inv["RefType"]}_{inv["RefNo"]}_
                          {inv["AccName"].slice(0, 15)}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="w-[100%] h-[47.5%] flex flex-row bg-fourth text-black rounded p-0.5">
                <div className="w-[100%] flex flex-row justify-between">
                  <div className="w-full  flex flex-row justify-center ">
                    {/* <div className="text-xl font-semibold ">Address:</div> */}
                    <div className="Text">
                      {" "}
                      {props.Client["address"] !== "" &&
                        props.Client["address"] !== undefined &&
                        props.Client["address"] !== null &&
                        props.Client["address"]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="itemsTable ">
              {" "}
              {/**if mobile 30% if web 55% */}
              <Table bordered striped responsive>
                <thead className=" bg-secondd text-BgTextColor font-normal">
                  <tr className=" whitespace-nowrap ">
                    {props.selectedFormOption === "CR_AP" ||
                    props.selectedFormOption === "DB_AP" ? (
                      <>
                        <th>L</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Cur</th>
                        <th>Branch</th>
                        <th>Notes</th>
                        <th>Action</th>
                      </>
                    ) : (
                      <>
                        <th>L</th>
                        <th>ItemNo</th>
                        <th>Description</th>
                        <th>Br</th>
                        <th>PQty</th>
                        <th>PUnit</th>
                        <th>TQty</th>
                        <th>UPrice</th>
                        <th>D%</th>
                        <th>T%</th>
                        <th>Total</th>
                        <th>Notes</th>
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
                          className=" hover:bg-secondd hover:text-BgTextColor whitespace-nowrap"
                          onDoubleClick={() => {
                            if (
                              props.selectedFormOption != "CR_AP" &&
                              props.selectedFormOption != "DB_AP"
                            ) {
                              setItemStockDetailsShow(true);
                              setItemDetailsModalData({
                                ItemNo: si["no"],
                                ItemName: si["name"],
                              });
                            }
                          }}
                        >
                          {props.selectedFormOption === "CR_AP" ||
                          props.selectedFormOption === "DB_AP" ? (
                            <>
                              <td>{si["lno"]}</td>
                              <td>{si["PType"]}</td>
                              {/*type payment */}
                              <td>{si["uprice"].toLocaleString()}</td>
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
                                  Notes
                                </button>
                              </td>

                              <td>
                                <button
                                  className="text-blue-500 hover:text-blue-700"
                                  onClick={() => {
                                    EmptyVariable();

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
                              <td>{si["qty"]}</td>
                              <td>
                                {si["PType"] == "1"
                                  ? si["BPUnit"]
                                  : si["PType"] == "2"
                                  ? si["PUnit"]
                                  : si["SPUnit"]}
                              </td>
                              <td>{si["TotalPieces"]}</td>
                              <td>{si["uprice"].toLocaleString()}</td>
                              <td>{si["discount"].toLocaleString()}%</td>
                              <td>{si["tax"].toLocaleString()}%</td>
                              <td>{si["Total"].toLocaleString()}</td>

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
                                  Notes
                                </button>
                              </td>

                              {/*<td>{taxAmount}</td>*/}
                              <td>
                                <button
                                  className="text-blue-500 hover:text-blue-700"
                                  onClick={() => {
                                    EmptyVariable();
                                    //hhhh
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
                                    setEditItemBranchesStock(
                                      si["BranchesStock"]
                                    );
                                    setEditItemTotalStockQty(
                                      si["TotalStockQty"]
                                    );

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
                onHide={() => {
                  const updatedItems = [...props.SelectedItems];
                  if (updatedItems[selectedItemIndex]["Note"] !== noteInput) {
                    setShowNoteModal(false);
                    setCloseSave({
                      show: true,
                      OldDatavariable: "",
                      NewDatavariable: "",

                      title: "Save Changes",
                      flag: "Notes",
                      message: "Do You Want To Save Your Note Changes",
                    });
                  } else if (
                    updatedItems[selectedItemIndex]["Note"] == noteInput
                  ) {
                    setShowNoteModal(false);
                  }
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit Note (30 characters)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <textarea
                    value={noteInput}
                    onChange={(e) => {
                      if (e.target.value.length <= 30) {
                        setNoteInput(e.target.value);
                      }
                    }}
                    className="form-control"
                    rows={5}
                  />
                </Modal.Body>
                <Modal.Footer className="flex  justify-between">
                  <div className="flex flex-row justify-between w-[100%]">
                    <div>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          const updatedItems = [...props.SelectedItems];
                          if (
                            updatedItems[selectedItemIndex]["Note"] !==
                            noteInput
                          ) {
                            setShowNoteModal(false);
                            setCloseSave({
                              show: true,
                              OldDatavariable: "",
                              NewDatavariable: "",

                              title: "Save Changes",
                              flag: "Notes",
                              message: "Do You Want To Save Your Note Changes",
                            });
                          } else if (
                            updatedItems[selectedItemIndex]["Note"] == noteInput
                          ) {
                            setShowNoteModal(false);
                          }
                        }}
                      >
                        Close
                      </Button>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setNoteInput("");
                      }}
                    >
                      Clear
                    </Button>
                    <Button variant="primary" onClick={handleNoteSave}>
                      <FontAwesomeIcon icon={faSave} className="mr-2" />
                      Save
                    </Button>
                  </div>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="flex flex-col justify-center h-[20%] mb-[0.5%]">
              <div className="InvoiceFooterCalculation">
                <div className="InvoiceEqCur">
                  {/* {localStorage.getItem("mainCur") == "1" ? (
                    <h4>
                      EC:{" "}
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
                      EC:{" "}
                      {(
                        (finalTotal + finalTax) /
                        props.Client["Rate"]
                      ).toLocaleString()}{" "}
                      {localStorage.getItem("Cur1")}
                    </h4>
                  )}{" "} */}
                  <Button
                    className="h-[100%] w-[45%] hover:bg-black hover:shadow-md"
                    onClick={async () => {
                      let result = saveNew("savePrint");
                      if (!result) {
                        printing();
                      }
                    }}
                  >
                    Print
                  </Button>
                  <button
                    className="h-[100%] w-[45%] hover:bg-black hover:shadow-md btn btn-primary"
                    onClick={async () => {
                      let result = saveNew("saveWhatsApp");
                      if (!result) {
                        let phoneNumber = props.Client["mobile"];
                        sendWhastAPP(
                          phoneNumber,
                          props.SelectedItems,
                          finalTotal
                        );
                      }
                    }}
                  >
                    WhatsApp
                  </button>
                </div>
                <div className="flex flex-row justify-end items-center bg-fourth shadow-l  rounded p-2 sm:rounded p-1 mb-[0.5%]">
                  <div className="InvoiceGross">
                    {" "}
                    <div className="Text">
                      GT: {finalTotal.toLocaleString()}{" "}
                    </div>
                  </div>
                  <div className="InvoiceTax">
                    {" "}
                    <div className="Text">Tx: {finalTax.toLocaleString()}</div>
                  </div>

                  <div>
                    <div className="Text">
                      Total: {(finalTotal + finalTax).toLocaleString()}{" "}
                      {localStorage.getItem(
                        "Cur" + localStorage.getItem("mainCur")
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between h-[55%]">
                <Button
                  className="ActionButtons"
                  onClick={() => {
                    // if(props.propertiesAreEqual==false && localStorage.getItem("InvoiceHistory")!=null && localStorage.getItem("InvoiceHistory")!=undefined && localStorage.getItem("InvoiceHistory")!="")
                    if (props.propertiesAreEqual == false) {
                      setDiscardModalShow(true);
                    } else {
                      window.location.href = "/";
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
                        if (
                          props.selectedInvoice != "" &&
                          props.selectedInvoice != "" &&
                          props.selectedInvoice != null
                        ) {
                          ReleaseInvoice();
                        }
                        props.setSelectedInvoice("");

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
                  className="ActionButtons"
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
                  Clear
                </Button>
                <Button
                  className="ActionButtons"
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
                        props.selectedInvoice != undefined &&
                        props.selectedInvoice != "" &&
                        props.selectedInvoice != null
                      ) {
                        setDeleteInvoiceModal(true);
                      } else {
                        setNoSavedToDelete(true);
                      }
                    }
                  }}
                >
                  Delete
                </Button>
                <Button
                  className="ActionButtons"
                  onClick={() => {
                    saveNew("saveNew");
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
        setSelectedInvoice={props.setSelectedInvoice}
        setsInvoices={props.setsInvoices}
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
      {ItemStockDetails &&
      props.selectedFormOption != "CR_AP" &&
      props.selectedFormOption != "DB_AP" ? (
        <ItemStockDetails
          show={ItemStockDetailsShow}
          onHide={() => {
            setItemStockDetailsShow(false);
            setItemDetailsModalData({
              ItemNo: "",
              ItemName: "",
            });
          }}
          data={ItemDetailsModalData}
          url={props.url}
        />
      ) : null}

      <Modal
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={() => {
          let [oldtempa, newtempa] = getOldNewInputs();
          let pAreEqual = checkChangesOnEdit(oldtempa, newtempa);
          setShow(false);
          setIdOptions([]);
          setErrorMessage("");
          EmptyVariable();
          if (pAreEqual) {
          } else if (pAreEqual == false) {
            let tempa = props.SelectedItems;

            setCloseSave({
              show: true,
              OldDatavariable: tempa,
              NewDatavariable: newtempa,

              title: "Save Changes",
              flag: "goodsInvoice",
              message: "Do You Want To Save Your Changes",
            });
          }
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
                {EditItem["no"]}
                <br></br>
                Stock: {EditItemTotalStockQty}
                {EditItemBranchesStock && (
                  <div className="grid grid-cols-6 gap-1">
                    {Object.entries(EditItemBranchesStock).map(
                      ([key, value], idxbr) => {
                        if (value != "0" && value != null && value !== "") {
                          return (
                            <div key={idxbr} className="">
                              <p className="text-base">
                                <strong className="text-base">{key}:</strong>{" "}
                                {value}
                              </p>
                            </div>
                          );
                        }
                      }
                    )}
                  </div>
                )}
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
                      className="w-1/4 border rounded-md px-3 py-2 border-gray-400 focus:border-prime focus:ring-prime bg-prime"
                      placeholder={"Qty"}
                      value={EditQty}
                      onChange={(e) => {
                        setEditQty(e.target.value);
                      }}
                      onBlur={(e) => {
                        if (
                          e.target.value == null ||
                          e.target.value == "" ||
                          e.target.value == "-" ||
                          e.target.value == 0
                        ) {
                          e.target.value = 1;
                          setEditQty(e.target.value);
                        }
                      }}
                      onKeyPress={(e) => {
                        if (
                          (e.key == "-" && // If the pressed key is a minus symbol
                            // And not at the beginning of the input

                            (e.target.value.includes("-") ||
                              e.target.value.includes("+"))) ||
                          (e.key == "+" && // If the pressed key is a minus symbol
                            // And not at the beginning of the input

                            (e.target.value.includes("-") ||
                              e.target.value.includes("+")))
                        ) {
                          // Or if the minus symbol is already present
                          e.preventDefault(); // Prevent the default action (typing the minus symbol)
                        }
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
                      className="w-1/2 border rounded-md px-3 py-2 border-gray-400 focus:border-second focus:ring-second"
                      value={EditType}
                      onChange={(e) => {
                        setEditType(e.target.value);
                        setPerformCalculation(true);
                      }}
                    >
                      {/* {EditDBPUnit && EditDBPUnit.trim() !== '' ? setEditType("3"): EditDPUnit && EditDPUnit.trim() !== ''?setEditType("2"):setEditType("1")} */}
                      {EditDBPUnit && EditDBPUnit.trim() !== "" && (
                        <option value="1">{EditDBPUnit}</option>
                      )}

                      {EditDPUnit && EditDPUnit.trim() !== "" && (
                        <option value="2">{EditDPUnit}</option>
                      )}
                      {EditDSPUnit && EditDSPUnit.trim() !== "" && (
                        <option value="3">{EditDSPUnit}</option>
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
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-second focus:ring-second"
                    placeholder="Total Pieces"
                    value={parseFloat(
                      EditType == "1"
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
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-second focus:ring-second"
                    value={EditBranch}
                    onChange={(e) => {
                      setEditBranch(e.target.value);
                    }}
                  >
                    {props.branches.map((br) => {
                      let stockOfBranch = 0;
                      for (const key in EditItemBranchesStock) {
                        const formattedKey = /^Br(\d+)$/.test(key)
                          ? key.match(/^Br(\d+)$/)[1]
                          : key;
                        if (formattedKey == br.number) {
                          stockOfBranch = EditItemBranchesStock[key];
                        }
                      }
                      return (
                        <option key={br.number} value={br.number}>
                          {br.number} - {br.name} - (
                          {stockOfBranch != "0" &&
                          stockOfBranch != undefined &&
                          stockOfBranch != ""
                            ? stockOfBranch
                            : "-"}
                          )
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
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-second focus:ring-second"
                    placeholder={"Uprice"}
                    value={EditPrice}
                    onChange={(e) => {
                      setEditPrice(e.target.value);
                      console.log("hsebet men on change");
                    }}
                    onBlur={(e) => {
                      if (
                        e.target.value == null ||
                        e.target.value == "" ||
                        e.target.value == "-" ||
                        e.target.value == 0
                      ) {
                        e.target.value = 0;
                        setEditPrice(e.target.value);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (
                        (e.key == "-" && // If the pressed key is a minus symbol
                          // And not at the beginning of the input

                          (e.target.value.includes("-") ||
                            e.target.value.includes("+"))) ||
                        (e.key == "+" && // If the pressed key is a minus symbol
                          // And not at the beginning of the input

                          (e.target.value.includes("-") ||
                            e.target.value.includes("+")))
                      ) {
                        // Or if the minus symbol is already present
                        e.preventDefault(); // Prevent the default action (typing the minus symbol)
                      }
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
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-second focus:ring-second"
                    placeholder={"Discount"}
                    value={EditDiscount}
                    onChange={(e) => {
                      setEditDiscount(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (
                        e.target.value == null ||
                        e.target.value == "" ||
                        e.target.value == "-" ||
                        e.target.value == 0
                      ) {
                        e.target.value = 0;
                        setEditDiscount(e.target.value);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (
                        (e.key == "-" && // If the pressed key is a minus symbol
                          // And not at the beginning of the input

                          (e.target.value.includes("-") ||
                            e.target.value.includes("+"))) ||
                        (e.key == "+" && // If the pressed key is a minus symbol
                          // And not at the beginning of the input

                          (e.target.value.includes("-") ||
                            e.target.value.includes("+")))
                      ) {
                        // Or if the minus symbol is already present
                        e.preventDefault(); // Prevent the default action (typing the minus symbol)
                      }
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
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-second focus:ring-second"
                    placeholder={"Tax"}
                    value={EditTax}
                    onChange={(e) => {
                      setEditTax(e.target.value);
                    }}
                    onBlur={(e) => {
                      if (
                        e.target.value == null ||
                        e.target.value == "" ||
                        e.target.value == "-" ||
                        e.target.value == 0
                      ) {
                        e.target.value = 0;
                        setEditTax(e.target.value);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "-") {
                        // Or if the minus symbol is already present
                        e.preventDefault(); // Prevent the default action (typing the minus symbol)
                      }
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
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-second focus:ring-second"
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
                    onKeyPress={(e) => {
                      if (
                        (e.key == "-" && // If the pressed key is a minus symbol
                          // And not at the beginning of the input

                          (e.target.value.includes("-") ||
                            e.target.value.includes("+"))) ||
                        (e.key == "+" && // If the pressed key is a minus symbol
                          // And not at the beginning of the input

                          (e.target.value.includes("-") ||
                            e.target.value.includes("+")))
                      ) {
                        // Or if the minus symbol is already present
                        e.preventDefault(); // Prevent the default action (typing the minus symbol)
                      }
                    }}
                  />
                </div>
                {errorMessage && (
                  <div className="text-red-500 mb-2">{errorMessage}</div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="flex flex-row justify-between w-[100%]">
                <Button
                  variant="secondary"
                  onClick={() => {
                    let [oldtempa, newtempa] = getOldNewInputs();
                    let pAreEqual = checkChangesOnEdit(oldtempa, newtempa);
                    setShow(false);
                    setIdOptions([]);
                    setErrorMessage("");
                    EmptyVariable();
                    if (pAreEqual) {
                    } else if (pAreEqual == false) {
                      let tempa = props.SelectedItems;

                      setCloseSave({
                        show: true,
                        OldDatavariable: tempa,
                        NewDatavariable: newtempa,

                        title: "Save Changes",
                        flag: "goodsInvoice",
                        message: "Do You Want To Save Your Changes",
                      });
                    }
                  }}
                >
                  Close
                </Button>

                <Button
                  variant="danger"
                  onClick={() => {
                    setShow(false);

                    let tempa = [...props.SelectedItems]; // Create a copy of SelectedItems array
                    if (
                      props.selectedInvoice != undefined &&
                      props.selectedInvoice != null &&
                      props.selectedInvoice != ""
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
                          console.log("false2068");
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
                      console.log("false2096");
                      props.setpropertiesAreEqual(false);
                      setErrorMessage("");
                    }
                    EmptyVariable();
                  }}
                >
                  Remove
                </Button>

                <Button
                  variant="primary"
                  onClick={() => {
                    if (localStorage.getItem("SalesUnderZero") == "N") {
                      if (
                        EditItemStockQty &&
                        EditItemStockQty < EditTotalPieces
                      ) {
                        setDeletePermission({
                          show: true,
                          message:
                            "You Don't Have Permission To Sell Less Than Stock Quantity.",
                        });
                        return;
                      }
                    }

                    let [oldtempa, tempaData] = getOldNewInputs();
                    let tempa = props.SelectedItems;
                    tempa[EditIdx] = tempaData;
                    let pAreEqual = true;
                    pAreEqual = checkChangesOnEdit(oldtempa, tempa[EditIdx]);
                    // if (oldtempa["qty"] !== tempa[EditIdx]["qty"]) {
                    //   console.log("fetttt qty");
                    //   pAreEqual = false;
                    // }

                    // if (oldtempa["uprice"] != tempa[EditIdx]["uprice"]) {
                    //   console.log("fetttt uprice");

                    //   pAreEqual = false;
                    // }
                    // if (oldtempa["branch"] !== tempa[EditIdx]["branch"]) {
                    //   console.log("fetttt branch");
                    //   pAreEqual = false;
                    // }
                    // if (oldtempa["discount"] !== tempa[EditIdx]["discount"]) {
                    //   console.log("fetttt disc");
                    //   pAreEqual = false;
                    // }
                    // console.log("oldtempa", oldtempa["tax"]);
                    // console.log("tempa edsittxt", tempa[EditIdx]["tax"]);
                    // if (oldtempa["tax"] !== tempa[EditIdx]["tax"]) {
                    //   console.log("fetttt tax");
                    //   console.log(oldtempa["tax"], tempa[EditIdx]["tax"]);
                    //   pAreEqual = false;
                    // }
                    // if (oldtempa["PType"] !== tempa[EditIdx]["PType"]) {
                    //   console.log("fetttt edittype");
                    //   pAreEqual = false;
                    // }

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
                    GoodsInvoiceSaveChanges(pAreEqual, tempa);
                    // if (!pAreEqual) {
                    //   console.log("rouhhhhhhhhhhhh");
                    //   console.log("false1983");
                    //   props.setpropertiesAreEqual(false);
                    //   const currentDate = new Date();
                    //   const formattedDate = `${currentDate
                    //     .getDate()
                    //     .toString()
                    //     .padStart(2, "0")}/${(currentDate.getMonth() + 1)
                    //     .toString()
                    //     .padStart(2, "0")}/${currentDate.getFullYear()}`;
                    //   const formattedTime = `T${currentDate
                    //     .getHours()
                    //     .toString()
                    //     .padStart(2, "0")}:${currentDate
                    //     .getMinutes()
                    //     .toString()
                    //     .padStart(2, "0")}:${currentDate
                    //     .getSeconds()
                    //     .toString()
                    //     .padStart(2, "0")}`;
                    //   tempa[EditIdx]["DateT"] = formattedDate;
                    //   tempa[EditIdx]["TimeT"] = formattedTime;
                    // }
                    // setErrorMessage("");

                    // setShow(false);
                    // setIdOptions([]);

                    // props.setSelectedItems(tempa);
                    // let accName = props.Client;
                    // let items = props.SelectedItems;
                    // let RemovedItems = props.RemovedItems;
                    // let json = { accName, items, RemovedItems };
                    // let jsonString = JSON.stringify(json); // Convert data object to JSON string

                    // console.log("ghayrik enti", jsonString);
                    // localStorage.setItem("sales", jsonString);
                    // console.log(localStorage.getItem("sales"));
                    // EmptyVariable();
                  }}
                >
                  Apply
                </Button>
              </div>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {props.selectedFormOptionDisplay}
                <br />
                {props.Client["id"]} {" - "} {props.Client["name"]}
                <br />
                {props.Client["balance"] != null &&
                  props.Client["balance"] != "" &&
                  props.Client["balance"] != undefined &&
                  props.Client["balance"].toLocaleString()}{" "}
                {props.Client["cur"]}
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
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-second focus:ring-second"
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
                      className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-second focus:ring-second"
                      value={EditType}
                      onChange={(e) => {
                        setEditType(e.target.value);
                      }}
                    >
                      <option value="">Choose Payment Type</option>
                      {localStorage.getItem("CASH") &&
                        localStorage.getItem("CASH") !== "" &&
                        localStorage.getItem("CASH") != "null" && (
                          <option value={localStorage.getItem("CASH")}>
                            {localStorage.getItem("CASH")}
                          </option>
                        )}
                      {localStorage.getItem("VISA1") &&
                        localStorage.getItem("VISA1") !== "" &&
                        localStorage.getItem("VISA1") != "null" && (
                          <option value={localStorage.getItem("VISA1")}>
                            {localStorage.getItem("VISA1")}
                          </option>
                        )}
                      {localStorage.getItem("VISA2") &&
                        localStorage.getItem("VISA2") !== "" &&
                        localStorage.getItem("VISA2") != "null" && (
                          <option value={localStorage.getItem("VISA2")}>
                            {localStorage.getItem("VISA2")}
                          </option>
                        )}
                      {localStorage.getItem("VISA3") &&
                        localStorage.getItem("VISA3") !== "" &&
                        localStorage.getItem("VISA3") !== "null" && (
                          <option value={localStorage.getItem("VISA3")}>
                            {localStorage.getItem("VISA3")}
                          </option>
                        )}
                      {localStorage.getItem("VISA4") &&
                        localStorage.getItem("VISA4") !== "" &&
                        localStorage.getItem("VISA4") != "null" && (
                          <option value={localStorage.getItem("VISA4")}>
                            {localStorage.getItem("VISA4")}
                          </option>
                        )}
                      {localStorage.getItem("VISA5") &&
                        localStorage.getItem("VISA5") !== "" &&
                        localStorage.getItem("VISA5") != "null" && (
                          <option value={localStorage.getItem("VISA5")}>
                            {localStorage.getItem("VISA5")}
                          </option>
                        )}
                      {localStorage.getItem("VISA6") &&
                        localStorage.getItem("VISA6") !== "" &&
                        localStorage.getItem("VISA6") != "null" && (
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
                      className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-second focus:ring-second"
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
                    className="w-3/4 border rounded-md px-3 py-2 border-gray-400 focus:border-second focus:ring-second"
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
              <div className="flex flex-row justify-between w-[100%]">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCloseSave({
                      show: true,
                      variable: "",
                      title: "Save Changes",
                      flag: "AllGroups",
                      message: "Do You Want To Save Your Changes",
                    });
                    setShow(false);
                    setIdOptions([]);
                    setErrorMessage("");
                    EmptyVariable();
                  }}
                >
                  Close
                </Button>

                <Button
                  variant="danger"
                  onClick={() => {
                    setShow(false);

                    let tempa = [...props.SelectedItems]; // Create a copy of SelectedItems array
                    if (
                      props.selectedInvoice != undefined &&
                      props.selectedInvoice != null &&
                      props.selectedInvoice != ""
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
                          console.log("false2440");
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
                      console.log("false2468");
                      props.setpropertiesAreEqual(false);
                      setErrorMessage("");
                    }
                    EmptyVariable();
                  }}
                >
                  Remove
                </Button>

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
                        EditPPrice !=
                        localStorage.getItem(
                          "Cur" + localStorage.getItem("mainCur")
                        )
                          ? localStorage.getItem(
                              "Cur" + localStorage.getItem("mainCur")
                            ) == localStorage.getItem("Cur1")
                            ? EditPrice / props.Client["Rate"]
                            : EditPrice * props.Client["Rate"]
                          : EditPrice,
                      // EditPPrice != props.Client["cur"]
                      //   ? EditPrice / props.Client["Rate"]
                      //   : EditPrice,
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
                      BranchesStock: tempa[EditIdx]["BranchesStock"],
                    };
                    console.log("*//////ana bel edit vouchers///****");
                    let pAreEqual = true;

                    if (oldtempa["uprice"] !== tempa[EditIdx]["uprice"]) {
                      pAreEqual = false;
                    }
                    if (oldtempa["branch"] !== tempa[EditIdx]["branch"]) {
                      pAreEqual = false;
                    }
                    if (oldtempa["PType"] != tempa[EditIdx]["PType"]) {
                      pAreEqual = false;
                    }
                    if (oldtempa["PPrice"] !== tempa[EditIdx]["PPrice"]) {
                      pAreEqual = false;
                    }
                    if (!pAreEqual) {
                      console.log("rouhhhhhhhhhhhh");
                      console.log("false2349");
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
                    EmptyVariable();
                  }}
                >
                  Apply
                </Button>
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
        selectedInvoice={props.selectedInvoice}
        setSelectedInvoice={props.setSelectedInvoice}
        finalTotal={finalTotal}
        finalTax={finalTax}
        SATFromBranch={props.SATFromBranch}
        setSATFromBranch={props.setSATFromBranch}
        setSATToBranch={props.setSATToBranch}
        SATToBranch={props.SATToBranch}
        saveNewFlag={props.saveNewFlag}
        setsaveNewFlag={props.setsaveNewFlag}
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
                window.location.href = "/";
                props.setpropertiesAreEqual(true);
                console.log("dirigin", props.propertiesAreEqual);

                setsOption("Accounts");
                setvInput("");
                props.setSelectedInvoice("");
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
                       // props.setSelectedInvoice("");
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
            {props.Client["id"] == "" && props.selectedFormOption != "SAT_AP"
              ? "No Account Choosen"
              : props.propertiesAreEqual == true
              ? props.selectedFormOption == "SAT_AP" &&
                props.SelectedItems.length == 0
                ? "No Items in your invoice"
                : "No Changes In Your Invoice"
              : props.selectedFormOption == "CR_AP" ||
                props.selectedFormOption == "DB_AP"
              ? "No Accounts in your invoice"
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
                            props.setSelectedInvoice(passSelectedInvoiceToModal);
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

                getInvoiceOptions("");
                setModalShow(true);
                // props.setSelectedInvoice("");
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
            {ErrorModal.title}
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
        show={CloseSave.show}
        onHide={() => setCloseSave({ ...CloseSave, show: false })}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {CloseSave.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{CloseSave.message}</h4> {/* Display the message */}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-around">
            <Button
              variant="danger"
              onClick={() => {
                if (CloseSave.flag == "goodsInvoice") {
                  let tempa = CloseSave.OldDatavariable;
                  tempa[EditIdx] = CloseSave.NewDatavariable;
                  GoodsInvoiceSaveChanges(false, tempa);
                } else if (CloseSave.flag == "Notes") {
                  handleNoteSave();
                }

                setCloseSave({ ...CloseSave, show: false });
              }}
            >
              Yes
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setCloseSave({ ...SwitchFormOption, show: false });
              }}
            >
              No
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
              variant="danger"
              onClick={() => {
                clearInvoice();
                props.setSelectedFormOption(SwitchFormOption.variable);

                setSwitchFormOption({ ...SwitchFormOption, show: false });
              }}
            >
              Yes
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setSwitchFormOption({ ...SwitchFormOption, show: false });
              }}
            >
              No
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 ">
          <div className="FormOptionContainer">
            <h2 className="text-xl font-semibold mb-4 text-BgTextColor">
              Select an Option:
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Your six boxes here */}
              <button
                className="bg-secondd text-BgTextColor py-4 px-8 rounded-md text-center"
                onClick={() => formOptionProcessing("SA_AP")}
              >
                Sales
              </button>
              <button
                className="bg-secondd text-BgTextColor py-4 px-8  rounded-md text-center"
                onClick={() => formOptionProcessing("OD_AP")}
              >
                Order
              </button>
              <button
                className="bg-secondd text-BgTextColor py-4 px-8   rounded-md text-center"
                onClick={() => formOptionProcessing("PR_AP")}
              >
                Purchase Return
              </button>
              <button
                className="bg-secondd text-BgTextColor py-4 px-8  rounded-md text-center"
                onClick={() => formOptionProcessing("PI_AP")}
              >
                Purchase
              </button>
              <button
                className="bg-secondd text-BgTextColor py-4 px-8   rounded-md text-center"
                onClick={() => formOptionProcessing("SR_AP")}
              >
                Sales Return
              </button>
              <button
                className="bg-secondd text-BgTextColor py-4 px-8  rounded-md text-center"
                onClick={() => formOptionProcessing("SAT_AP")}
              >
                Branch Transfer
              </button>
              <button
                className="bg-secondd text-BgTextColor py-4 px-8 rounded-md text-center"
                onClick={() => formOptionProcessing("CR_AP")}
              >
                Receipt Voucher
              </button>
              <button
                className="bg-secondd text-BgTextColor py-4 px-8 rounded-md text-center"
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
              <label htmlFor="itemFromBranch" className="w-fit">
                From :{" "}
              </label>
              <select
                id="itemFromBranch"
                className="p-[0.5rem] w-full h-[100%] rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:border-second focus:ring-1 focus:ring-second text-sm font-semibold text-lg"
                // value={props.SATFromBranch}
                // onChange={(e) => {
                //   props.setSATFromBranch(e.target.value);
                // }}
              >
                {props.branches.map((br) => {
                  return (
                    <option key={br.number} value={br.number}>
                      {br.number} - {br.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="itemToBranch" className="w-fit">
                To :{" "}
              </label>
              <select
                id="itemToBranch"
                className="p-[0.5rem] w-full h-[100%] rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:border-second focus:ring-1 focus:ring-second text-sm font-semibold text-lg"
                // value={props.SATToBranch}
                // onChange={(e) => {
                //   props.setSATToBranch(e.target.value);
                // }}
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
                className="mt-4 bg-secondd hover:bg-secondd py-3 px-6  rounded-md"
                onClick={() => {
                  console.log(
                    "batal lebnen",
                    props.SelectedItems,
                    props.RemovedItems,
                    props.Client["id"]
                  );
                  if (
                    props.SelectedItems != [] &&
                    props.SelectedItems != undefined &&
                    props.RemovedItems != [] &&
                    props.RemovedItems != undefined &&
                    props.Client["id"] != "" &&
                    props.Client["id"] != undefined
                  ) {
                    setSATDialogOpen(false);
                    setErrorModal({
                      show: true,
                      message: (
                        <div>
                          There Is UnSaved Data. <br></br> Please Save Or Clear
                          Invoice Before Changing Form Option.
                        </div>
                      ),
                      title: "Branch Transfer",
                    });
                    return;
                  } else {
                    const itemFromBranchValue =
                      document.getElementById("itemFromBranch").value;

                    // Get the selected value from the second select element
                    const itemToBranchValue =
                      document.getElementById("itemToBranch").value;
                    console.log("itemFromBranchValue", itemFromBranchValue);
                    console.log("itemToBranchValue", itemToBranchValue);
                    if (itemFromBranchValue != itemToBranchValue) {
                      props.setSATToBranch(itemToBranchValue);
                      props.setSATFromBranch(itemFromBranchValue);

                      localStorage.setItem("SATToBranch", itemToBranchValue);
                      localStorage.setItem(
                        "SATFromBranch",
                        itemFromBranchValue
                      );
                      setSATDialogOpen(false);
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
                      handleSave({
                        accName: {
                          id: "",
                          name: "",
                          RefNo: "",
                          date: "",
                          time: "",
                          balance: "",
                          address: "",
                          cur: "",
                          Rate: "",
                        },
                        items: props.SelectedItems,
                        RemovedItems: props.RemovedItems,
                      });
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
                        title: "Branch Transfer",
                      });
                    }
                  }
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        show={GroupModalShow.show}
        onHide={() => setGroupModalShow({ ...GroupModalShow, show: false })}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {GroupModalShow.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Your six boxes here */}
          <div className="grid grid-cols-4 gap-4">
            {GroupModalShow.variable &&
              GroupModalShow.variable.map((type, idx) => {
                return (
                  <button
                    className="bg-secondd text-BgTextColor py-4 px-8 rounded-md text-center"
                    onClick={() => {
                      setGroupModalShow({ ...GroupModalShow, show: false });
                      if (GroupModalShow.flag == "AllGroups") {
                        getGroupOptions(type["GroupName"]);
                        setGroupType(type["GroupName"]);
                      } else {
                        getInvoiceOptions(type["GroupName"]);

                        setModalShow(true);
                      }
                    }}
                  >
                    {type["GroupName"]}
                  </button>
                );
              })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row w-full justify-start">
            <Button
              variant="primary"
              onClick={() =>
                setGroupModalShow({ ...GroupModalShow, show: false })
              }
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
  function getInvoiceOptions(GroupName) {
    let gType;
    if (
      localStorage.getItem("GroupType") &&
      localStorage.getItem("GroupType") != "" &&
      localStorage.getItem("GroupType") != null
    ) {
      gType = localStorage.getItem("GroupType");
    } else {
      gType = GroupType;
    }
    let data = {
      token: props.token,
      option: sOption,
      value: vInput,
      username: localStorage.getItem("compname"),
      SATFromBranch:
        props.selectedFormOption != "SAT_AP" ? "N" : props.SATFromBranch,
      SATToBranch:
        props.selectedFormOption != "SAT_AP" ? "N" : props.SATToBranch,
      groupName: GroupName,
      groupType: gType,
    };

    axios({
      method: "POST",
      url: props.url + "/INVOICE_DATA_SELECT/",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.data.info, "mmmmmmmm");
        if (res.data.Info == "authorized") {
          let lgt = res.data.opp;
          console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh", res.data.Info);
          if (lgt.length > 0) {
            console.log("jjjjjjjjjjjjjjjjjjj");
            setIdOptions(res.data.opp);
          } else {
            console.log("po", res.data.opp);
            setModalShow(false);

            setErrorModal({
              show: true,
              message: (
                <div>
                  There Is No {sOption} Matches Your Search <br></br> Please Try
                  a Different {sOption} .
                </div>
              ),
              title: "Empty " + sOption,
            });
          }
        } else if (res.data.Info == "error") {
          setModalShow(false);
          setErrorModal({
            show: true,
            message: <div>{res.data.msg}</div>,
            title: "Error Occured",
          });
        }
      })
      .catch((err) => {
        setModalShow(false);
        setErrorModal({
          show: true,
          message: <div>{err}</div>,
          title: "Error Occured",
        });
      });
  }
  function getGroupOptions(flag) {
    let data;

    data = {
      value: flag,
      username: localStorage.getItem("compname"),
    };

    axios({
      method: "POST",
      url: props.url + "/moh/Invoice_Group_Select",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.data.Info == "authorized") {
          let lgt = res.data.groupTypes;
          if (lgt.length > 0) {
            setGroupModalShow({
              show: true,
              variable: res.data.groupTypes,
              title: "Group Types",
              flag: "GroupAvailable",
            });
            //setIdOptions(res.data.opp);
          } else {
            console.log("po", res.data.opp);
            setModalShow(false);

            setErrorModal({
              show: true,
              message: (
                <div>
                  There Is No {sOption} Matches Your Search <br></br> Please Try
                  a Different {sOption} .
                </div>
              ),
              title: "Empty " + sOption,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getInitialGroupOptions() {
    let variable = [
      { GroupName: "SetG" },
      { GroupName: "Category" },
      { GroupName: "Unit" },
      { GroupName: "Brand" },
      { GroupName: "Origin" },
      { GroupName: "Supplier" },
      { GroupName: "Sizeg" },
      { GroupName: "Color" },
      { GroupName: "Family" },
      { GroupName: "Groupg" },
    ];
    setGroupModalShow({
      show: true,
      variable: variable,
      title: "Group Types",
      flag: "AllGroups",
    });
  }
  function discardInvoice() {
    console.log("selectedinvoiceexit", props.selectedInvoice);
    if (
      props.selectedInvoice != "" &&
      props.selectedInvoice != "" &&
      props.selectedInvoice != null
    ) {
      ReleaseInvoice();
    }
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

    props.setSelectedInvoice("");
    localStorage.setItem("InvoiceHistory", "");
    console.log("props.selectedInvoice");
    console.log(props.props.selectedInvoice);
    props.setSATFromBranch();
    props.setSATToBranch();
  }
  function clearInvoice() {
    setsOption("Accounts");

    props.setpropertiesAreEqual(true); //lola
    setvInput("");
    props.setSelectedInvoice("");
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
    if (
      props.selectedInvoice != "" &&
      props.selectedInvoice != "" &&
      props.selectedInvoice != null
    ) {
      ReleaseInvoice();
    }
    props.setSelectedInvoice("");
    //  inputRef.current.focus();
    props.setSATFromBranch();
    props.setSATToBranch();
    console.log("y777");

    getCompanyInfo();
  }
}
