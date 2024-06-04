import { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Modals from "../Modals/Modals";
export default function ConfirmPostInvoiceModal(props) {
  const modalsChildRef = useRef();
  useEffect(() => {
    if (props.saveNewFlag.show == true) {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            console.log("Started");

            localStorage.setItem("latitude", position.coords.latitude);
            localStorage.setItem("longitude", position.coords.longitude);
            onYesPress(position.coords.latitude, position.coords.longitude);
          });
        } else {
          modalsChildRef.current.setInfoModal({
            show: true,
            message: (
              <div>{"Geolocation is not supported by this browser."}</div>
            ),
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
    }
  }, [props.saveNewFlag]);
  return (
    <>
      <Modals ref={modalsChildRef} />
    </>
  );
  function onYesPress(latitude, longitude) {
    let flag = props.saveNewFlag.variable;
    props.setsaveNewFlag({ ...props.saveNewFlag, show: false });
    if (props.accno == "") {
    } else if (props.items.length == 0) {
    } else {
      props.setModalShow(false);
      props.setSelectedInvoice("");
      let finalTotal = props.finalTotal + props.finalTax;
      console.log(
        "consolha",
        props.finalTotal,
        "   ",
        props.finalTax,
        finalTotal
      );
      props.postInvoice(
        props.type,
        props.Client,
        props.items,
        finalTotal,
        props.RemovedItems,
        flag,
        latitude,
        longitude
      );
      console.log("/*/*/*/*/*/*/*/**/");
      console.log(props.type, props.Client, props.items);
    }
  }
}
