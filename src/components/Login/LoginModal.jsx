import React, { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoginForm from "./LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginModal(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(true);
  };
  const handleShow = () => setShow(true);
  const [vResult, setVresult] = useState("");
  const [warning, setWarning] = useState(false);

  function verify(compname, username, password) {
    var bodyFormData = new FormData();
    if (username == "" || password == "" || compname == "") {
      setVresult("Invalid Username or Password");
      setWarning(true);
    } else {
      bodyFormData.append("compname", compname.toUpperCase());
      bodyFormData.append("username", username.toUpperCase());
      bodyFormData.append("password", password);

      axios({
        method: "post",
        url: props.url + "/moh/login/",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          if (response.data.Info == "authorized") {
            console.log("ffffff");
            console.log(response.data.Abranch);
            console.log(response.data.Sbranch);
            localStorage.setItem("username", response.data.name);
            localStorage.setItem("compname", response.data.compname);
            localStorage.setItem("password", response.data.password);
            localStorage.setItem("Sbranch", response.data.Sbranch);
            localStorage.setItem("Abranch", response.data.Abranch);
            localStorage.setItem("SalePrice", response.data.SalePrice);
            localStorage.setItem(
              "DeleteInvoice",
              response.data.Permissions["DeleteInvoice"]
            );
            localStorage.setItem(
              "DeleteItem",
              response.data.Permissions["DeleteItem"]
            );
            localStorage.setItem(
              "Discount",
              response.data.Permissions["Discount"]
            );
            localStorage.setItem("Price", response.data.Permissions["Price"]);
            localStorage.setItem(
              "CallInvoice",
              response.data.Permissions["CallInvoice"]
            );
            localStorage.setItem(
              "SA_AP",
              response.data.Permissions["SalesForm"]
            );
            localStorage.setItem(
              "SR_AP",
              response.data.Permissions["SalesReturnForm"]
            );
            localStorage.setItem(
              "OD_AP",
              response.data.Permissions["OrderForm"]
            );
            localStorage.setItem(
              "PI_AP",
              response.data.Permissions["PurchaseForm"]
            );
            localStorage.setItem(
              "PR_AP",
              response.data.Permissions["PurchaseReturnForm"]
            );
            localStorage.setItem(
              "SAT_AP",
              response.data.Permissions["BranchTransferForm"]
            );
            localStorage.setItem(
              "SalesUnderZero",
              response.data.Permissions["SalesUnderZero"]
            );
            localStorage.setItem(
              "ChangeBranch",
              response.data.Permissions["ChangeBranch"]
            );

            props.UserDataHandler(
              response.data.compname,
              response.data.name,
              response.data.token
            );

            handleClose();
          } else {
            setVresult(response.data.msg + " Please Try Again");
            setWarning(true);
          }
        })
        .catch(function (response) {
          setVresult(response.message + " Please Try Again");
          setWarning(true);
        });
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm verify={verify} />
          <div
            className={
              warning
                ? "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                : "hiddin"
            }
          >
            {vResult.toString()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" form="login">
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default LoginModal;
