import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../index.css"; // Import the CSS file
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const url = "http://localhost:8000";
//const url = "https://pssapi.net:444";
export async function checkInEndPoint(long, lat) {
  console.log("Calling from endpoint");
  const [date, time] = getTimeEndPoint();
  let data = {
    type: "CHK_AP",
    compname: localStorage.getItem("compname"),
    username: localStorage.getItem("username"),
    accno: localStorage.getItem("ScannedAccountId"),
    long: long,
    lat: lat,
    accDate: date,
    accTime: time,
  };

  console.log("dataaaaa", data);

  try {
    const response = await axios({
      method: "post",
      url: url + "/moh/CheckIn/",
      data: data,
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
    });

    if (response.data.Info == "authorized") {
      console.log("Success");

      return {
        status: "authorized",
        message: response.data.message,
        flag: response.data.flag,
        Account: response.data.Account,
      };
    } else {
      console.log("not success");
      return { status: "error", message: response.data.message };
    }
  } catch (error) {
    console.log("catch error", error);
    return { status: "error", message: error.message };
  }
}

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
export async function handleCheckInSearch(data) {
  try {
    axios({
      method: "POST",
      url: url + "/INVOICE_DATA_SELECT/",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.data.Info == "authorized") {
          let lgt = res.data.opp;
          console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh", res.data.Info);
          if (lgt.length > 0) {
            console.log("jjjjjjjjjjjjjjjjjjj");
            console.log(res.data.op);
            // setIdOptions(res.data.opp);
            return { status: "success", message: res.data.op, flag: 1 };
          } else {
            console.log("po", res.data.opp);
            return { status: "empty", message: "Account Not Found", flag: -1 };

            // setInfoModal({
            //   show: true,
            //   flag: -1,
            //   message: (
            //     <div>
            //       There Is No Account Matches Your Search <br></br> Please Try a
            //       Different Account .
            //     </div>
            //   ),
            //   title: "Empty Account",
            // });
          }
        } else if (res.data.Info == "error") {
          return { status: "error", message: res.data.msg, flag: -2 };
        }
      })
      .catch((err) => {
        return { status: "error", message: err, flag: -3 };
      });
  } catch (e) {
    // setInfoModal({
    //   show: true,
    //   message: <div>{"Error No 100 :  " + e}</div>,
    //   flag: -1,
    //   title: "Error Occured",
    // });
    return { status: "error", message: e, flag: -4 };
  }
  // Call the endpoint with the searchValue
  // Update state or perform any necessary actions based on the result
}
