import InvoiceTypeSelect from "../components/Invoice/InvoiceTypeSelect";
import React, { useState, useEffect,ReactDOM } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import SalesForm from "../components/Invoice/SalesForm";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';



export default function Invoice(props) {
    const [Client, setClient] = useState("");
    const [SelectedItems, setSelectedItems] = useState([]);

    const [sInvoice, setSInvoice] = useState("");
    
    const [invResponse, setInvResponse] = useState({
        Info:"No Invoice Created",
        msg:"No Invoice Created"
    });
    const [propertiesAreEqual, setpropertiesAreEqual] = useState(true);

    function sInvoiceHandler(e) {
        setSInvoice(e);
    }

    useEffect(() => {
        getBranches();
    }, []);

    const [Hisab, setHisab] = useState([]);
    const [branches, setBranches] = useState([]);

    const [afterSubmitModal, setafterSubmitModal] = useState(false);
    function discardInvoice(){
        
    }

    const downloadPDF = (data) => {
        const htmlContent = `
        <div>
            <h1>${data.accname}</h1>
            <p>Account ID: ${data.accno}</p>
            <h2>Items</h2>
            <ul>
                ${data.items.map(item => `<li>${item.name}: ${item.uprice}</li>`).join('')}
            </ul>
        </div>
    `;

    
    console.log(htmlContent); // Log the HTML content to verify
        // Create a hidden div to render the HTML content
        const container = document.createElement('div');
        console.log("CONTAINER", container);
        container.style.visibility = 'hidden';
        container.innerHTML = htmlContent;
        document.body.appendChild(container);
        console.log("appendd",document.body.appendChild(container));
        console.log("innerHTML",container.innerHTML);
        // const capture = document.querySelector('#sales-form-container');

        // if (!capture) {
        //     console.error('Error: Unable to find #sales-form-container element');
        //     return;
        // }
       // Delay capturing to allow for rendering
       setTimeout(() => {
        html2canvas(container).then((canvas) => {
            console.log(canvas); // Log the captured canvas to verify

            try {
                const imgData = canvas.toDataURL('image/png');
                const doc = new jsPDF('p', 'mm', 'a4');
                const componentWidth = doc.internal.pageSize.getWidth();
                const componentHeight = doc.internal.pageSize.getHeight();
                doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
                doc.save('invoice.pdf');
            } catch (error) {
                console.error('Error generating PDF:', error);
            }
        }).catch((error) => {
            console.error('Error capturing HTML to canvas:', error);
        });
    }, 1000); // Adjust the delay time as needed

    };
    return (
        <div className="h-[90vh] overscroll-contain">
            {(() => {
                switch (sInvoice) {
                    case "":
                        return <InvoiceTypeSelect url={props.url} inv={sInvoiceHandler} />;
                    case "Sales":
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
                                
                            />
                          
                            </>
                        );
                    case "won":
                        return null;
                    case "lost":
                        return null;
                }
            })()}
            <AfterSubmit />
        </div>
    );

    function getBranches() {
        axios({
            method: "get",
            url: props.url + "/moh/getBranches/" + localStorage.getItem("compname") + "/",
            headers: { content_type: "application/json" },
        })
            .then((res) => {
                
                setBranches(res.data.branches);
            })
            .catch((e) => {
                window.location.href = props.url;
            });
    }

    function postInvoice(type, acc, items) {
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
        let data = {
            compname: localStorage.getItem("compname"),
            type: type,
            accno: acc.id,
            accDate:acc.date,
            accTime:acc.time,
            accRefNo:acc.RefNo,
            Sbranch : localStorage.getItem("Sbranch"),
            Abranch : localStorage.getItem("Abranch"),
            accname: acc.name,
            items: items,
            username: localStorage.getItem("username"),

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
                setInvResponse(
                    {
                        Info:"Successful",
                        msg:"Sales Invoice Created Successfully"
                    }
                );
                
                //discardInvoice()
                setClient({
                    id:"",
                    name:"",
                    RefNo:"",
                    date:"",
                    time:"",
                })
                setSelectedItems([])
                localStorage.setItem("sales", "")
                setpropertiesAreEqual(true);
                downloadPDF(data);
               
                
            } else if (res.data.Info == "Failed") {
                setInvResponse(
                    {
                        Info:"Failed",
                        msg:res.data.msg
                    }
                )
            }
            setafterSubmitModal(true)
        });
    }

    function AfterSubmit() {
        return (
            <>
                <Modal
                    show={afterSubmitModal}
                    onHide={() => setafterSubmitModal(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">{invResponse["Info"]}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>{invResponse["msg"]}</div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>{setafterSubmitModal(false)}}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
   
}
