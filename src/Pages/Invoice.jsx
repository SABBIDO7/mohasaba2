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
  const [SwitchFormOption, setSwitchFormOption] = useState(false);

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

  const downloadPDF = (data, ref_no) => {
    const htmlContent = `
    <div style="justify-items:space-between;align-items:center;">
    <div style="justify-items:center;align-items:center">
        <h1 style="color: #8B0000;">${data.accname}</h1>
        <p style="color: #8B0000;">Account ID: ${data.accno}</p>
        </div>
      
        <table style="width: 100%;
        border-collapse: collapse;">
            <thead style="background-color: #edd98a;
            color: #8B0000;">
                <tr style="border: 1px solid #8B0000;background-color: #edd98a; color:#8B0000;"> 
                    <th style=" padding: 0.75rem;
                    text-align: left;border: 1px solid #8B0000;">Item Name</th>
                    <th style=" padding: 0.75rem;
                    text-align: left;border: 1px solid #8B0000;">Unit Price</th>
                    <th style=" padding: 0.75rem;
                    text-align: left;border: 1px solid #8B0000;">Total</th>
                    <th style=" padding: 0.75rem;
                    text-align: left;border: 1px solid #8B0000;">Total Quantity</th>
                    <th style=" padding: 0.75rem;
                    text-align: left;border: 1px solid #8B0000;">Discount</th>
                    <th style=" padding: 0.75rem;
                    text-align: left;border: 1px solid #8B0000;">Tax</th>
                    <th style=" padding: 0.75rem;
                    text-align: left;border: 1px solid #8B0000;">Total Tax</th>
                    <th style=" padding: 0.75rem;
                    text-align: left;border: 1px solid #8B0000;">Type</th>
                    <th style=" padding: 0.75rem;
                    text-align: left;border: 1px solid #8B0000;">Notes</th>

                </tr>
            </thead>
            <tbody>
                ${data.items
                  .map(
                    (item) => `
                        <tr >
                            <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.name}</td>
                            <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.uprice}</td>
                            <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.Total}</td>
                            <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.TotalPieces}</td>
                            <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.discount}</td>
                            <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.tax}</td>
                            <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.TaxTotal}</td>
                            <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.PType}</td>
                            <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.Note}</td>
                        </tr>
                    `
                  )
                  .join("")}
            </tbody>
        </table>
        <div style="color:#8B0000;font-size:1.5rem;font-weight:600">Total: ${
          data.invoiceTotal
        }</div>
        <div style="height:45px"></div>
    </div>
`;

    console.log(htmlContent); // Log the HTML content to verify
    // Create a hidden div to render the HTML content
    const container = document.createElement("div");
    //  container.style.display = "none"; // Set display to none

    console.log("CONTAINER", container);
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
      html2canvas(container, { scale: 4 })
        .then((canvas) => {
          console.log("capturedd canvass", canvas); // Log the captured canvas to verify

          try {
            const imgData = canvas.toDataURL("image/png");
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            // Calculate the width and height of the content
            const contentWidth = canvas.width;
            const contentHeight = canvas.height;

            // Calculate the ratio of the content
            const ratio = contentWidth / contentHeight;
            console.log("rstioo", ratio);
            // Calculate the width and height that the content should be displayed at
            let displayWidth = pageWidth;
            let displayHeight = pageWidth / ratio;

            // If the display height is greater than the page height, adjust the display width and height
            if (displayHeight > pageHeight) {
              displayHeight = pageHeight;
              displayWidth = pageHeight * ratio;
            }
            console.log(displayHeight, displayWidth, "kkkkk");

            // Add the image to the PDF with the calculated dimensions
            doc.addImage(imgData, "PNG", 0, 0, displayWidth, displayHeight);

            doc.save(data.type + "_" + ref_no + "_" + data.accname);
            document.body.removeChild(container);
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
              downloadPDF={downloadPDF}
            />
            <Modal
              show={SwitchFormOption.show}
              onHide={() => {
                setSwitchFormOption({ ...SwitchFormOption, show: false });
                setafterSubmitModal(true);
              }}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Download Invoice
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Do You Want To Download The Invoice As Pdf ?</h4>{" "}
                {/* Display the message */}
              </Modal.Body>
              <Modal.Footer>
                <div className="flex flex-row w-full justify-around">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSwitchFormOption({ ...SwitchFormOption, show: false });
                      setafterSubmitModal(true);
                    }}
                  >
                    No
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      downloadPDF(
                        SwitchFormOption.variable,
                        SwitchFormOption.ref_no
                      );
                      console.log("je suis laaaa", SwitchFormOption.variable);
                      setSwitchFormOption({ ...SwitchFormOption, show: false });
                      setafterSubmitModal(true);
                    }}
                  >
                    Yes
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>
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
        localStorage.setItem("SATToBranch", "");
        localStorage.setItem("SATFromBranch", "");
        localStorage.setItem("selectedFormOption", "SA_AP");
        setSwitchFormOption({
          show: true,

          variable: data,
          ref_no: res.data.ref_no,
        });
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
