import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../index.css"; // Import the CSS file
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const url = "http://localhost:8000";
//const url = "https://pssapi.net:444";
export async function checkInEndPoint(long, lat, method) {
  console.log("Calling from endpoint");
  console.log("mehod", method);
  const [date, time] = getTimeEndPoint();
  let data = {};
  if (method == "Note") {
    data = {
      method: method,
      type: "CHK_AP",
      compname: localStorage.getItem("compname"),
      username: localStorage.getItem("username"),
      accno: "",

      Note: localStorage.getItem("ScannedAccountId"),
      long: long,
      lat: lat,
      accDate: date,
      accTime: time,
      BackOffice: localStorage.getItem("BackOffice"),
    };
  } else {
    data = {
      method: method,

      type: "CHK_AP",
      compname: localStorage.getItem("compname"),
      username: localStorage.getItem("username"),
      accno: localStorage.getItem("ScannedAccountId"),
      Note: "",
      long: long,
      lat: lat,
      accDate: date,
      accTime: time,
      BackOffice: localStorage.getItem("BackOffice"),
    };
  }
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

export function getTimeEndPoint() {
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
}
export async function handleCheckInSearch(data) {
  try {
    return axios({
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
            console.log(res.data.opp);
            // setIdOptions(res.data.opp);

            return { status: "success", message: res.data.opp, flag: 1 };
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

export async function getCompanyInfo() {
  try {
    const resp = await axios({
      method: "get",
      url: url + "/moh/getCompanyInfo/" + localStorage.getItem("compname"),

      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = resp.data;

    if (data.Info === "authorized") {
      console.log("men info", data.CompanyInfo);
      localStorage.setItem("CompName", data.CompanyInfo["CompName"]);
      localStorage.setItem("CompAdd", data.CompanyInfo["CompAdd"]);
      localStorage.setItem("CompTell", data.CompanyInfo["CompTell"]);
      localStorage.setItem("CompEmail", data.CompanyInfo["CompEmail"]);
      localStorage.setItem("CompTax", data.CompanyInfo["CompTax"]);
      localStorage.setItem("mainCur", data.CompanyInfo["mainCur"]);
      // if (
      //   props.Client["id"] == "" ||
      //   props.Client["id"] == undefined ||
      //   props.Client["id"] == null
      // ) {
      //   console.log("fet aw mafetet");
      //   localStorage.setItem("Rate", data.CompanyInfo["Rate"]);
      // }

      localStorage.setItem("Cur1", data.CompanyInfo["Cur1"]);
      localStorage.setItem("Cur2", data.CompanyInfo["Cur2"]);
      localStorage.setItem("CASH", data.CompanyInfo["CASH"]);
      localStorage.setItem("VISA1", data.CompanyInfo["VISA1"]);
      localStorage.setItem("VISA2", data.CompanyInfo["VISA2"]);
      localStorage.setItem("VISA3", data.CompanyInfo["VISA3"]);
      localStorage.setItem("VISA4", data.CompanyInfo["VISA4"]);
      localStorage.setItem("VISA5", data.CompanyInfo["VISA5"]);
      localStorage.setItem("VISA6", data.CompanyInfo["VISA6"]);
      localStorage.setItem("GroupType", data.CompanyInfo["GroupType"]);
      localStorage.setItem("PrintFormat", data.CompanyInfo["PrintFormat"]);
      localStorage.setItem(
        "GrpSearchMethod",
        data.CompanyInfo["GrpSearchMethod"]
      );
      localStorage.setItem("CompanyCode", data.CompanyInfo["CompanyCode"]);
      localStorage.setItem("Notify", data.CompanyInfo["Notify"]);
      localStorage.setItem("BackOffice", data.CompanyInfo["BackOffice"]);
    }
  } catch (error) {
    // Handle errors here if needed
    console.error("Error fetching data:", error);
  }
}

export async function Notify(account, long, lat) {
  console.log("Notifyyyyy");
  //let locationUrl = "https://www.google.com/maps/?q=" + lat + "," + long;
  let message =
    localStorage.getItem("username") +
    " Has Checked In into The Store : " +
    account +
    "\nLocated In: " +
    lat +
    " , " +
    long;
  // let actions = `view, Open Maps, https://www.google.com/maps/?q=${lat},${long}`;
  // console.log(actions);
  console.log(message);
  console.log(localStorage.getItem("Notify"));
  fetch("https://ntfy.sh/" + localStorage.getItem("Notify"), {
    method: "POST", // PUT works too
    body: message,
    headers: {
      Title: "Paradox Notify",
      //Tags: "open Google Maps",
      //  Actions: actions,
    },
  });
}

export async function CheckInDashboardFiltering(data) {
  try {
    console.log("aayat lla funct");
    return await axios({
      method: "post",
      url: url + "/moh/CheckInDashboard/",
      data: data,
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.data.Info == "success") {
        console.log("sucess");
        return { status: "success", result: res.data.result };
      } else {
        return { status: "error", result: [], message: res.data.message };
      }
    });

    // const data = resp.data;

    // if (data.Info === "authorized") {
    // }
  } catch (error) {
    // Handle errors here if needed
    return { status: "error", result: [], message: error };
  }
}
export async function getUsers() {
  try {
    console.log("aayat lla funct");
    return await axios({
      method: "get",
      url: url + "/moh/getUsers/" + localStorage.getItem("compname") + "/",
    }).then((res) => {
      if (res.data.status == "success") {
        console.log("sucess getusers");
        return { status: "success", result: res.data.result };
      } else {
        return { status: "error", result: [], message: res.data.message };
      }
    });

    // const data = resp.data;

    // if (data.Info === "authorized") {
    // }
  } catch (error) {
    // Handle errors here if needed
    return { status: "error", result: [], message: error };
  }
}

export async function getUsersAccessManagement() {
  try {
    return await axios({
      method: "get",
      url:
        url + "/moh/AcccesManagement/" + localStorage.getItem("compname") + "/",
    }).then((res) => {
      console.log(res);
      if (res.data.status == "success") {
        console.log(res.data.status);
        return {
          status: res.data.status,
          users: res.data.users,
          permissionsName: res.data.permissionsName,
          branches: res.data.branches,
          salePrices: res.data.salePrices,
        };
      } else {
        return { status: res.data.status, message: res.data.message };
      }
    });
  } catch (error) {
    console.log("tabasgit", error);
    return { Info: "Error", message: error };
  }
}

export async function UpdateUsersPermissions(users, changedUsers) {
  try {
    let data = {
      users: users,
      changedUsers: changedUsers,
      compname: localStorage.getItem("compname"),
    };
    return await axios({
      method: "post",
      url: url + "/moh/UpdateUsersPermissions/",
      data: data,
    }).then((res) => {
      console.log(res);
      if (res.data.status == "success") {
        console.log(res.data.status);
        return {
          status: res.data.status,
        };
      } else {
        return { status: res.data.status, message: res.data.message };
      }
    });
  } catch (error) {
    return { status: "Error", message: error };
  }
}

export async function getCompanySettingsData() {
  try {
    return await axios({
      method: "get",
      url:
        url +
        "/moh/getCompanySettings/" +
        localStorage.getItem("compname") +
        "/",
    }).then((res) => {
      console.log(res);
      if (res.data.status == "success") {
        console.log(res.data.result);
        return {
          status: res.data.status,
          GroupType: res.data.result.GroupType,
          PrintFormat: res.data.result.PrintFormat,
          CompanyCode: res.data.result.CompanyCode,
          Holidays: res.data.result.Holidays,
        };
      } else {
        return { status: res.data.status, message: res.data.message };
      }
    });
  } catch (error) {
    console.log("tabasgit", error);
    return { Info: "Error", message: error };
  }
}
