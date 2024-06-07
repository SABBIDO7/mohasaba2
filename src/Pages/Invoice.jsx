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
  //const [sInvoice, setSInvoice] = useState("");
  const [SwitchFormOption, setSwitchFormOption] = useState(false);
  const [sInvoices, setsInvoices] = useState([]);

  const [selectedFormOptionDisplay, setSelectedFormOptionDisplay] = useState();
  const [selectedInvoice, setSelectedInvoice] = useState("");
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
  const [saveNewFlag, setsaveNewFlag] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("CompanyCode")
  );
  const [ErrorInvoiceModel, setErrorInvoiceModel] = useState(false);
  // function sInvoiceHandler(e) {
  //   setSInvoice(e);
  // }

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
  const [saveWhatsAppModel, setsaveWhatsAppModel] = useState(false);
  function discardInvoice() {}

  const downloadPDF = (data, ref_no) => {
    let htmlContent = "";
    if (localStorage.getItem("PrintFormat") == "1") {
      if (data.type == "CR_AP" || data.type == "DB_AP") {
        htmlContent = `
        <div style="justify-items:space-between;align-items:center;">
        <div style="justify-items:center;align-items:center">
        <h1 style="color: #8B0000;">${data.type}</h1>

            <h1 style="color: #8B0000;">${data.accname}</h1>
            <p style="color: #8B0000;">Account ID: ${data.accno}</p>
            </div>
          
            <table style="width: 100%;
            border-collapse: collapse;">
                <thead style="background-color: #edd98a;
                color: #8B0000;">
                    <tr style="border: 1px solid #8B0000;background-color: #edd98a; color:#8B0000;"> 
                        <th style=" padding: 0.75rem;
                        text-align: left;border: 1px solid #8B0000;">Type</th>
                        <th style=" padding: 0.75rem;
                        text-align: left;border: 1px solid #8B0000;">Amount</th>
                        <th style=" padding: 0.75rem;
                        text-align: left;border: 1px solid #8B0000;">Cur</th>
                        <th style=" padding: 0.75rem;
                        text-align: left;border: 1px solid #8B0000;">Branch</th>
                        <th style=" padding: 0.75rem;
                        text-align: left;border: 1px solid #8B0000;">Notes</th>
                       
                    </tr>
                </thead>
                <tbody>
                    ${data.items
                      .map(
                        (item) => `
                            <tr >
                                <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${
                                  item.PType
                                }</td>
                                
                                <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.uprice.toLocaleString()}</td>
                                <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${
                                  item.PPrice
                                }</td>
                                <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${
                                  item.branch
                                }</td>
                           
                                <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${
                                  item.Note
                                }</td>
                            </tr>
                        `
                      )
                      .join("")}
                </tbody>
            </table>
            <div style="color:#8B0000;font-size:1.5rem;font-weight:600">Total: ${data.invoiceTotal.toLocaleString()}${" "}${localStorage.getItem(
          "Cur" + localStorage.getItem("mainCur")
        )}</div>
            <div style="height:45px"></div>
        </div>
    `;
      } else {
        htmlContent = `
      <div style="justify-items:space-between;align-items:center;">
      <div style="justify-items:center;align-items:center">
      <h1 style="color: #8B0000;">${data.type}</h1>

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
                              <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${
                                item.name
                              }</td>
                              <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.uprice.toLocaleString()}</td>
                              <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${item.Total.toLocaleString()}</td>
                              <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${
                                item.TotalPieces
                              }</td>
                              <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${
                                item.discount
                              }</td>
                              <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${
                                item.tax
                              }</td>
                              <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${
                                item.TaxTotal
                              }</td>
                              <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${
                                item.PType
                              }</td>
                              <td style="border: 1px solid #8B0000;text-align: center;padding: 0.75rem;">${
                                item.Note
                              }</td>
                          </tr>
                      `
                    )
                    .join("")}
              </tbody>
          </table>
          <div style="color:#8B0000;font-size:1.5rem;font-weight:600">Total: ${data.invoiceTotal.toLocaleString()} ${" "}${localStorage.getItem(
          "Cur" + localStorage.getItem("mainCur")
        )}</div>
          <div style="height:45px"></div>
      </div>
  `;
      }
    } else if (localStorage.getItem("PrintFormat") == "2") {
      if (data.type != "CR_AP" && data.type != "DB_AP") {
        htmlContent = `
      
      <div style="justify-items:space-between;align-items:center;">
      <h1 style="color: #8B0000;font-size:5.5rem">${data.type}</h1>

          <h1 style="color: #8B0000;font-size:5.5rem">${data.accname}</h1>
          <p style="color: #8B0000;font-size:4.75rem">Account ID: ${
            data.accno
          }</p>
          ${data.items
            .map(
              (item) => `
                  <div  style="padding: 0.75rem; display:flex;justify-items:space-between;flex-direction: column;"">
                      <h1 style="font-size: 4.75rem;"> Name: ${item.name}</h1>
                      <h1 style="font-size: 4.75rem;">Price: ${item.uprice.toLocaleString()}</h1>
                      <h1 style="font-size: 4.75rem;">TotalP: ${item.Total.toLocaleString()}</h1>
                      <h1 style="font-size: 4.75rem;">Qty:${
                        item.TotalPieces
                      }</h1>
                     
                  </div>
                  <hr style="margin: 0 auto; width: 90%;border-width: 6px;"> 

              `
            )
            .join("")}
            <div style="color:#8B0000;font-size:5.5rem;font-weight:600">Total: ${data.invoiceTotal.toLocaleString()} ${" "}${localStorage.getItem(
          "Cur" + localStorage.getItem("mainCur")
        )}</div>
            <div style="height:25px"></div>
            </div>
         `;
      } else {
        htmlContent = `
      
      <div style="justify-items:space-between;align-items:center;">
      <h1 style="color: #8B0000;font-size:5.5rem">${data.type}</h1>

      <h1 style="color: #8B0000;font-size:5.5rem">${data.accname}</h1>
          <p style="color: #8B0000;font-size:4.75rem">Account ID: ${
            data.accno
          }</p>
          ${data.items
            .map(
              (item) => `
                  <div  style="padding: 0.75rem; display:flex;justify-items:space-between;flex-direction: column;"">
                      <h1 style="font-size: 4.75rem;"> Type: ${item.PType}</h1>
                      <h1 style="font-size: 4.75rem;">Amount: ${item.uprice.toLocaleString()} ${" "} ${
                item.PPrice
              }</h1>
                      
                      <h1 style="font-size: 4.75rem;">Branch:${item.branch}</h1>
                     
                  </div>
                  <hr style="margin: 0 auto; width: 90%;border-width: 6px;"> 

              `
            )
            .join("")}
            <div style="color:#8B0000;font-size:5.5rem;font-weight:600">Total: ${data.invoiceTotal.toLocaleString()} ${" "}${localStorage.getItem(
          "Cur" + localStorage.getItem("mainCur")
        )}</div>
            <div style="height:25px"></div>
            </div>
         `;
      }
    }

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
      html2canvas(container, { scale: 0.75 })
        .then((canvas) => {
          console.log("capturedd canvass", canvas); // Log the captured canvas to verify

          try {
            let doc;
            const imgData = canvas.toDataURL("image/png");
            if (localStorage.getItem("PrintFormat") == "1") {
              doc = new jsPDF();
            } else if (localStorage.getItem("PrintFormat") == "2") {
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");
              context.font = "16px Arial";
              context.fillText(htmlContent, 0, 0);

              // Measure the rendered content
              const metrics = context.measureText(htmlContent);
              const contentHeight =
                metrics.actualBoundingBoxAscent +
                metrics.actualBoundingBoxDescent;

              // Create the PDF with the calculated height
              doc = new jsPDF({
                orientation: "portrait",
                unit: "cm",
                format: [5, contentHeight / 10], // Convert pixels to cm
              });
            }

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

            doc.save(data.type + "_" + ref_no + "_" + data.accname + ".pdf");
            document.body.removeChild(container);
          } catch (error) {
            console.error("Error generating PDF:", error);
          }
        })
        .catch((error) => {
          console.error("Error capturing HTML to canvas:", error);
        });
    }, 200); // Adjust the delay time as needed
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
        } else if (res.data.Info == "Failed") {
          setsInvoices([]);
        }
      })
      .catch((error) => {
        console.error("Error in getInvoicesHistory:", error);
        // Handle error (e.g., set error state)
      });
  };
  function savePhoneNumber(phoneNumber, var1, var2, var3) {
    axios({
      method: "post",
      url:
        props.url +
        "/moh/savePhoneNumber/" +
        localStorage.getItem("compname") +
        "/" +
        phoneNumber +
        "/" +
        Client["id"],
      headers: { content_type: "application/json" },
    })
      .then((res) => {
        if (res.data.Info == "authorized") {
          setClient({ ...Client, mobile: phoneNumber });
          sendWhastAPP(phoneNumber, var2, var3);
          setPhoneNumber("");
        } else if (res.data.Info == "Failed") {
          setPhoneNumber("");
          setErrorInvoiceModel({
            show: true,
            message: res.data.msg,
            title: "Error Occured 100",
          });
        }
      })
      .catch((error) => {
        setPhoneNumber("");
        setErrorInvoiceModel({
          show: true,
          message: error,
          title: "Error Occured 101",
        });
        // Handle error (e.g., set error state)
      });
  }

  return (
    <div className="h-[90vh] overscroll-contain">
      {(() => {
        // setSelectedFormOption("SA_AP");
        // setSelectedFormOptionDisplay("Sales Form");
        return (
          <>
            <SalesForm
              url={props.url}
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
              saveNewFlag={saveNewFlag}
              setsaveNewFlag={setsaveNewFlag}
              setSelectedInvoice={setSelectedInvoice}
              selectedInvoice={selectedInvoice}
              sInvoices={sInvoices}
              setsInvoices={setsInvoices}
              getInvoicesHistory={getInvoicesHistory}
              sendWhastAPP={sendWhastAPP}
              setsaveWhatsAppModel={setsaveWhatsAppModel}
              saveWhatsAppModel={saveWhatsAppModel}
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
            <Modal
              show={saveWhatsAppModel.show}
              onHide={() => {
                setsaveWhatsAppModel({ ...saveWhatsAppModel, show: false });
              }}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  {saveWhatsAppModel.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>{saveWhatsAppModel.message}</div>
                <div style={{ fontStyle: "italic" }}>
                  Ex:+{localStorage.getItem("CompanyCode")}+xxxxxx
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => {
                    setsaveWhatsAppModel({ ...saveWhatsAppModel, show: false });
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setsaveWhatsAppModel({ ...saveWhatsAppModel, show: false });
                    console.log("var1", saveWhatsAppModel.variable1);
                    console.log("var2", saveWhatsAppModel.variable2);
                    console.log("var3", saveWhatsAppModel.variable3);
                    savePhoneNumber(
                      phoneNumber,
                      saveWhatsAppModel.variable1,
                      saveWhatsAppModel.variable2,
                      saveWhatsAppModel.variable3
                    );
                  }}
                >
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={ErrorInvoiceModel.show}
              onHide={() => {
                setErrorInvoiceModel({ ...ErrorInvoiceModel, show: false });
              }}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  {ErrorInvoiceModel.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>{ErrorInvoiceModel.message}</div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => {
                    setErrorInvoiceModel({ ...ErrorInvoiceModel, show: false });
                  }}
                >
                  Close
                </Button>
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
  function printing(selectedInvoice, invoiceTotal) {
    // if (
    //   props.propertiesAreEqual == true &&
    //   selectedInvoice != "" &&
    //   selectedInvoice != "" &&
    //   selectedInvoice != null
    // ) {
    let type = selectedFormOption;

    let data = {
      type: type,
      accno: Client.id,
      accDate: Client.data,
      accTime: Client.time,
      accRefNo: Client.RefNo,
      accname: Client.name,
      items: SelectedItems,
      RemovedItems: RemovedItems,
      username: localStorage.getItem("username"),
      invoiceTotal: invoiceTotal,
    };
    console.log("ppppppp");
    downloadPDF(data, selectedInvoice);
    // } else {
    //   setErrorModal({
    //     show: true,
    //     message: "You Need To Save Before Printing",
    //     title: "Unsaved changes",
    //   });
    // }
  }
  function clearAfterSave() {
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
    // setSwitchFormOption({
    //   show: true,

    //   variable: data,
    //   ref_no: res.data.ref_no,
    // });
    setafterSubmitModal(true);
  }
  async function sendWhastAPP(phoneNumber, items, invoiceTotal, type) {
    // Convert the items object to a JSON string

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
  }
  function postInvoice(
    type,
    acc,
    items,
    InvoiceTotal,
    RemovedItems,
    flag,
    lat,
    long
  ) {
    let tempItem = "";

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
      long: long,

      lat: lat,
      deliveryDays: Client["deliveryDays"],
    };
    console.log("n bl invoice");
    console.log(data);
    axios({
      method: "post",
      url: props.url + "/moh/newInvoice/",
      data: data,
      headers: { content_type: "application/json" },
    }).then(async (res) => {
      if (res.data.Info == "authorized") {
        console.log(flag, "lklkl");
        if (flag == "saveNew") {
          clearAfterSave();
        } else {
          setpropertiesAreEqual(true);
          getInvoicesHistory();
          setSelectedInvoice(res.data.ref_no);
          localStorage.setItem("InvoiceHistory", res.data.ref_no);
          if (flag == "savePrint") {
            printing(res.data.ref_no, data.invoiceTotal);
          } else if (flag == "saveWhatsApp") {
            let phoneNumber = Client["mobile"]; // replace with the actual phone number
            let invoiceMessage = items;
            if (
              Client["mobile"] &&
              Client["mobile"] != "null" &&
              Client["mobile"] != undefined &&
              Client["mobile"] != ""
            ) {
              sendWhastAPP(
                phoneNumber,
                invoiceMessage,
                data.invoiceTotal,
                type
              );
            } else {
              console.log("phoneNumber", phoneNumber);
              setsaveWhatsAppModel({
                show: true,
                message: "Do You Want To Save Mobile Number Of The Client?",
                title: "Number Not Found",
                variable1: phoneNumber,
                variable2: invoiceMessage,

                variable3: data.invoiceTotal,
              });
            }
          }
        }
      } else if (res.data.Info == "Failed") {
        setInvResponse({
          Info: "Failed",
          msg: res.data.msg,
        });
        setSelectedFormOption("SA_AP");
        setafterSubmitModal(true);
        setafterSubmitModal2(true);
      }
      return res.data.Info;
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
