import InvoiceTypeSelect from "../components/Invoice/InvoiceTypeSelect";
import React, { useState, useEffect, ReactDOM } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import SalesForm from "../components/Invoice/SalesForm";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Invoice(props) {
  const [Client, setClient] = useState("");
  const [SelectedItems, setSelectedItems] = useState([]);
  const [RemovedItems, setRemovedItems] = useState([]);
  const [sInvoice, setSInvoice] = useState("");

  const [selectedFormOptionDisplay, setSelectedFormOptionDisplay] = useState();
  const [invResponse, setInvResponse] = useState({
    Info: "No Invoice Created",
    msg: "No Invoice Created",
  });
  let p = true;
  if (localStorage.getItem("propertiesAreEqual") == "true") {
    p = true;
  } else if (localStorage.getItem("propertiesAreEqual") == "false") {
    console.log("false28");
    p = false;
  } else {
    p = true;
  }
  let selectedForm = "";
  if (
    localStorage.getItem("selectedFormOption") != "null" &&
    localStorage.getItem("selectedFormOption") != "" &&
    localStorage.getItem("selectedFormOption") != "undefined" &&
    localStorage.getItem("selectedFormOption") != null
  ) {
    selectedForm = localStorage.getItem("selectedFormOption");
    console.log("jjjjjjjjjj", selectedForm);
  } else {
    selectedForm = "SA_AP";
    console.log("hhhhhhhhhhhhhhh", selectedForm);
  }
  const [propertiesAreEqual, setpropertiesAreEqual] = useState(p);
  const [selectedFormOption, setSelectedFormOption] = useState(selectedForm);
  const [handlingAccWhenChanging, sethandlingAccWhenChanging] = useState();
  const [SATFromBranch, setSATFromBranch] = useState();
  const [SATToBranch, setSATToBranch] = useState();
  const [modalItems, setModalItems] = useState(false);
  const [modalVoucher, setModalVoucher] = useState(false);

  function sInvoiceHandler(e) {
    setSInvoice(e);
  }

  useEffect(() => {
    getBranches();
  }, []);
  // useEffect(() => {
  //   localStorage.setItem("SATFromBranch", SATFromBranch);
  //   localStorage.setItem("SATToBranch", SATToBranch);
  //   console.log("watch ouuttttttttt", SATFromBranch);
  //   console.log("watch ouuttttttttt", SATToBranch);
  // }, [SATFromBranch, SATToBranch]);

  const [Hisab, setHisab] = useState([]);
  const [branches, setBranches] = useState([]);

  const [afterSubmitModal, setafterSubmitModal] = useState(false);
  const [afterSubmitModal2, setafterSubmitModal2] = useState(false);

  function discardInvoice() {}

  const downloadPDF = (data) => {
    const htmlContent = `
        <div>
            <h1>${data.accname}</h1>
            <p>Account ID: ${data.accno}</p>
            <h2>Items</h2>
            <ul>
                ${data.items
                  .map((item) => `<li>${item.name}: ${item.uprice}</li>`)
                  .join("")}
            </ul>
        </div>
    `;

    console.log(htmlContent); // Log the HTML content to verify
    // Create a hidden div to render the HTML content
    const container = document.createElement("div");
    console.log("CONTAINER", container);
    container.style.visibility = "hidden";
    container.innerHTML = htmlContent;
    document.body.appendChild(container);
    console.log("appendd", document.body.appendChild(container));
    console.log("innerHTML", container.innerHTML);
    // const capture = document.querySelector('#sales-form-container');

    // if (!capture) {
    //     console.error('Error: Unable to find #sales-form-container element');
    //     return;
    // }
    // Delay capturing to allow for rendering
    setTimeout(() => {
      html2canvas(container)
        .then((canvas) => {
          console.log(canvas); // Log the captured canvas to verify

          try {
            const imgData = canvas.toDataURL("image/png");
            const doc = new jsPDF("p", "mm", "a4");
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
            doc.save("invoice.pdf");
          } catch (error) {
            console.error("Error generating PDF:", error);
          }
        })
        .catch((error) => {
          console.error("Error capturing HTML to canvas:", error);
        });
    }, 1000); // Adjust the delay time as needed
  };
  return (
    <div className="h-[90vh] overscroll-contain">
      {(() => {
        // setSelectedFormOption("SA_AP");
        // setSelectedFormOptionDisplay("Sales Form");
        return (
          <>
            <SalesForm
              url={props.url}
              inv={sInvoiceHandler}
              token={props.token}
              hisab={Hisab}
              postInvoice={postInvoice}
              branches={branches}
              setafterSubmitModal={setafterSubmitModal}
              afterSubmitModal={afterSubmitModal}
              discardInvoice={discardInvoice}
              Client={Client}
              setClient={setClient}
              SelectedItems={SelectedItems}
              setSelectedItems={setSelectedItems}
              propertiesAreEqual={propertiesAreEqual}
              setpropertiesAreEqual={setpropertiesAreEqual}
              sethandlingAccWhenChanging={sethandlingAccWhenChanging}
              handlingAccWhenChanging={handlingAccWhenChanging}
              RemovedItems={RemovedItems}
              setRemovedItems={setRemovedItems}
              setafterSubmitModal2={setafterSubmitModal2}
              afterSubmitModal2={afterSubmitModal2}
              setSelectedFormOption={setSelectedFormOption}
              selectedFormOption={selectedFormOption}
              setSelectedFormOptionDisplay={setSelectedFormOptionDisplay}
              selectedFormOptionDisplay={selectedFormOptionDisplay}
              setSATToBranch={setSATToBranch}
              SATToBranch={SATToBranch}
              setSATFromBranch={setSATFromBranch}
              SATFromBranch={SATFromBranch}
              setModalItems={setModalItems}
              modalItems={modalItems}
              modalVoucher={modalVoucher}
              setModalVoucher={setModalVoucher}
            />
          </>
        );
      })()}
      <AfterSubmit />
    </div>
  );

  function getBranches() {
    axios({
      method: "get",
      url:
        props.url +
        "/moh/getBranches/" +
        localStorage.getItem("compname") +
        "/",
      headers: { content_type: "application/json" },
    })
      .then((res) => {
        setBranches(res.data.branches);
      })
      .catch((e) => {
        window.location.href = props.url;
      });
  }

  function postInvoice(type, acc, items, InvoiceTotal, RemovedItems) {
    let tempItem = "";

    items.forEach((item) => {
      tempItem =
        tempItem +
        item.no +
        ";" +
        item.qty +
        ";" +
        item.uprice +
        ";" +
        item.branch +
        ";" +
        item.discount +
        ";" +
        item.tax +
        "!";
    });
    console.log("**//---", acc.RefNo);
    console.log("maambariff shou yali", acc);
    let data = {
      compname: localStorage.getItem("compname"),
      type: type,
      accno: acc.id,
      accDate:
        selectedFormOption == "SAT_AP"
          ? acc.date != undefined && acc.date != null && acc.date != ""
            ? acc.date
            : items[0]["DateT"]
          : acc.date,
      accTime:
        selectedFormOption == "SAT_AP"
          ? acc.time != undefined && acc.time != null && acc.time != ""
            ? acc.time
            : items[0]["TimeT"]
          : acc.time,

      accRefNo: acc.RefNo,
      Sbranch: localStorage.getItem("Sbranch"),
      Abranch: localStorage.getItem("Abranch"),
      accname: acc.name,
      items: items,
      RemovedItems: RemovedItems,
      username: localStorage.getItem("username"),
      invoiceTotal: InvoiceTotal,
      // Cur:
      //   acc.cur == localStorage.getItem("Cur" + localStorage.getItem("mainCur"))
      //     ? localStorage.getItem("mainCur")
      //     : localStorage.getItem("mainCur") == "1"
      //     ? "2"
      //     : localStorage.getItem("mainCur") == "2" && "1",
      Cur: localStorage.getItem("mainCur"),
      Rate:
        Client["Rate"] == null ||
        Client["Rate"] == undefined ||
        Client["Rate"] == ""
          ? localStorage.getItem("Rate") != undefined &&
            localStorage.getItem("Rate") != "" &&
            localStorage.getItem("Rate") != null
            ? localStorage.getItem("Rate")
            : undefined
          : Client["Rate"],
      SATFromBranch: SATFromBranch,
      SATToBranch: SATToBranch,
    };
    console.log("n bl invoice");
    console.log(data);
    axios({
      method: "post",
      url: props.url + "/moh/newInvoice/",
      data: data,
      headers: { content_type: "application/json" },
    }).then((res) => {
      if (res.data.Info == "authorized") {
        // setInvResponse(
        //     {
        //         Info:"Successful",
        //         msg:"Sales Invoice Created Successfully"
        //     }
        // );

        //discardInvoice()
        setClient({
          id: "",
          name: "",
          RefNo: "",
          date: "",
          time: "",
        });
        setSelectedItems([]);
        console.log("y2");
        localStorage.setItem("sales", "");
        setpropertiesAreEqual(true);
        localStorage.setItem("InvoiceHistory", "");
        setSATToBranch();
        setSATFromBranch();
        downloadPDF(data);
        setafterSubmitModal(true);
      } else if (res.data.Info == "Failed") {
        setInvResponse({
          Info: "Failed",
          msg: res.data.msg,
        });
        setSelectedFormOption("SA_AP");
        setafterSubmitModal(true);
        setafterSubmitModal2(true);
      }
    });
  }

  function AfterSubmit() {
    return (
      <>
        <Modal
          show={afterSubmitModal2}
          onHide={() => setafterSubmitModal2(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {invResponse["Info"]}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{invResponse["msg"]}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                setafterSubmitModal2(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
