import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Modals from "../Modals/Modals";

import {
  checkInEndPoint,
  handleCheckInSearch,
  Notify,
} from "../BackendEndPoints/Endpoint1";
import { info } from "autoprefixer";
export default function Location(props) {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [infoSearchModal, setInfoSearchModal] = useState({ show: false });

  // const [searchValue, setSearchValue] = useState(
  //   infoSearchModal.accountId || ""
  // ); // Default value is infoModal.accountId
  const [modelsVar, setmodelsVar] = useState("");
  const [modelsToSetVar, setmodelsToSetVar] = useState("");
  const [modelsShowPage, setModelsShowPage] = useState(false);

  const modalsChildRef = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    console.log("an abkl useeffect location");
    console.log(props.method);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("Started");
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(position.coords.latitude);
          if (
            props.method == "scan" ||
            props.method == "search" ||
            props.method == "Note"
          ) {
            CheckInSaveLongLat(
              position.coords.latitude,
              position.coords.longitude,
              props.method
            );
          } else if (props.method == "showSearchInput") {
            console.log("erch guid");
            SearchSaveLongLat(
              position.coords.latitude,
              position.coords.longitude,
              props.method
            );
          } else if (props.method == "Transactions") {
            localStorage.setItem("latitude", position.coords.latitude);
            localStorage.setItem("longitude", position.coords.longitude);
          }
        });
      } else {
        modalsChildRef.current.setInfoModal({
          show: true,
          message: <div>{"Geolocation is not supported by this browser."}</div>,
          flag: 1,
          title: "Error Occured",
        });
        console.log("Geolocation is not supported by this browser.");
      }
    } catch (e) {
      modalsChildRef.current.setInfoModal({
        show: true,
        message: <div>{"Error No : " + e}</div>,
        flag: 1,
        title: "Error Occured",
      });
    }
  }, [props.method]);

  const CheckInSaveLongLat = (lat, long, method) => {
    localStorage.setItem("longitude", long);
    localStorage.setItem("latitude", lat);
    console.log("Started...");
    checkInEndPoint(long, lat, method).then((response) => {
      console.log("fettt baad");
      console.log(response);

      if (response.status == "authorized") {
        if (response.flag == 1) {
          console.log("fet authorized");
          setModelsShowPage(true);
          // Pass data directly without setting it in state
          modalsChildRef.current.setInfoModal({
            show: true,
            message: (
              <div>
                {"You Have Been Checked In With The Account : " +
                  response.Account}
              </div>
            ),
            flag: 1,
            title: response.message,
          });
          Notify(response.Account, long, lat);
          // navigate("/invoice");
        } else if (response.flag == 0) {
          console.log("mano mawjoud l idddd");
          setModelsShowPage(true);

          // setSearchValue(response.Account);
          modalsChildRef.current.setInfoSearchModal({
            show: true,
            message: (
              <div>{"No Account Found with ID:" + response.Account}</div>
            ),
            flag: 0,
            accounntId: response.Account,
            title: response.message,
          });
        }
      } else {
        setModelsShowPage(true);

        modalsChildRef.current.setInfoModal({
          show: true,
          message: <div>{response.message}</div>,
          flag: -1,
          title: "Error Occured",
        });
      }
    });

    //window.location.href = "/invoice";
  };
  const SearchSaveLongLat = (lat, long) => {
    localStorage.setItem("longitude", long);
    localStorage.setItem("latitude", lat);
    setModelsShowPage(true);
    modalsChildRef.current.setInfoSearchModal({
      show: true,
      message: <div>Search By ID, Name, PhoneNumber,Address: </div>,
      flag: 0,
      accounntId: "",
      title: "Search Account",
    });
  };

  return (
    <div>
      <Modals
        modelsShowPage={modelsShowPage.show}
        setModelsShowPage={setModelsShowPage}
        ref={modalsChildRef}
        var={modelsShowPage.var}
        varToSet={modelsShowPage.varToSet}
        data={modelsShowPage.data}
        setShowLocation={props.setShowLocation}
        setMethod={props.setMethod}
        method={props.method}
      />
    </div>
  );
}
