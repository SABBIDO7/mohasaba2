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

  function verify(compname,username, password) {
    var bodyFormData = new FormData();
    if (username == "" || password == "" || compname == "") {
      setVresult("Invalid Username or Password");
      setWarning(true);
  
    } else {
      bodyFormData.append("compname", compname.toLowerCase());
      bodyFormData.append("username", username.toLowerCase());
      bodyFormData.append("password", password);
      axios({
        method: "post",
        url: props.url+"/moh/login/",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          if (response.data.Info == "authorized") {
            localStorage.setItem("username", response.data.name);
            localStorage.setItem("compname", response.data.compname);
            localStorage.setItem("password",response.data.password);
           
            props.UserDataHandler(response.data.compname, response.data.name, response.data.token);
            

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
