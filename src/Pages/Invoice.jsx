import InvoiceTypeSelect from "../components/Invoice/InvoiceTypeSelect";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import SalesForm from "../components/Invoice/SalesForm";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function Invoice(props) {
    const [sInvoice, setSInvoice] = useState("");
    
    const [invResponse, setInvResponse] = useState({
        Info:"No Invoice Created",
        msg:"No Invoice Created"
    });

    function sInvoiceHandler(e) {
        setSInvoice(e);
    }

    useEffect(() => {
        getBranches();
    }, []);

    const [Hisab, setHisab] = useState([]);
    const [branches, setBranches] = useState([]);

    const [afterSubmitModal, setafterSubmitModal] = useState(false);

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
                console.log(res.data);
                setBranches(res.data.branches);
            })
            .catch((e) => {
                window.location.href = props.url;
            });
    }

    function postInvoice(type, accno, items) {
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
            accno: accno.id,
            accname: accno.name,
            items: tempItem,
            username: props.name,

        };
        axios({
            method: "post",
            url: props.url + "/moh/newInvoice/",
            data: data,
            headers: { content_type: "application/json" },
        }).then((res) => {
            console.log(res.data);
            if (res.data.Info == "authorized") {
                setInvResponse(
                    {
                        Info:"Successful",
                        msg:"Sales Invoice Created Successfully"
                    }
                )
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
