import InvoiceTypeSelect from "../components/Invoice/InvoiceTypeSelect";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import SalesForm from "../components/Invoice/SalesForm";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

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
    return (
        <div className=" h-[90vh] overscroll-contain">
            {(() => {
                switch (sInvoice) {
                    case "":
                        return <InvoiceTypeSelect url={props.url} inv={sInvoiceHandler} />;
                    case "Sales":
                        return (
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
                )
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
