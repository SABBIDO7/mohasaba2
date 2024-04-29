import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../index.css"; // Import the CSS file
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const url = "http://localhost:8000";
export const checkInEndPoint = () => {
  console.log("Calling from endpoint");
  const [date, time] = getTimeEndPoint();
  let data = {
    type: "CHK_AP",
    compname: localStorage.getItem("compname"),
    username: localStorage.getItem("username"),
    accno: localStorage.getItem("ScannedAccountId"),
    long: localStorage.getItem("longitude"),
    lat: localStorage.getItem("latitude"),
    accDate: date,
    accTime: time,
  };
  axios({
    method: "post", // or 'get', 'put', 'delete', etc.
    url: url + "/moh/CheckIn/",
    data: data,
    headers: {
      "Content-Type": "application/json",
      // Add any additional headers if needed
    },
  })
    .then((response) => {
      if (response.data.Info == "authorized") {
        console.log("Success");
        return { status: "authorized" };
      } else {
        return { status: "error", message: response.data.message };
      }
    })
    .catch((error) => {
      // Handle error
      return { status: "error", message: error };
    });
};

const getTimeEndPoint = () => {
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
    .padStart(2, "0")}:${currentDate.getSeconds().toString().padStart(2, "0")}`;

  return [formattedDate, formattedTime];
};
