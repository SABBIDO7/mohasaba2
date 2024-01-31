import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function LoginForm(props) {
  const [compname, setCompname] = useState("");
  const [username, setuserName] = useState("");
  const [password, setpassword] = useState("");

  return (
    <Form
      id="login"
      onSubmit={(e) => {
        e.preventDefault();
        props.verify(compname ,username, password);
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Company Code</Form.Label>
        <Form.Control
          onChange={(e) => {
            setCompname(e.target.value);
          }}
          name="Compname"
          type="username"
          placeholder="Company Name"
          autoFocus
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={(e) => {
            setuserName(e.target.value);
          }}
          name="username"
          type="username"
          placeholder="Username"
          
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
      </Form.Group>
    </Form>
  );
}

export default LoginForm;
