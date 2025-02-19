import Button from "react-bootstrap/Button";
import Backoffice from "../media/backoffice1.png";
import paradox from "../media/paradox.png";
import { useCookies } from "react-cookie";
import React, { useRef } from "react";
import Modals2 from "../components/Modals/Modals2";
export default function Main(props) {
  const { t } = props; // Get t from props

  const [cookies, setCookie] = useCookies(["token"]);
  const modalsChildRef = useRef();
  function accountingClick() {
    if (localStorage.getItem("AccountingPage") == "Y") {
      if (localStorage.getItem("BackOffice") == "Y") {
        document.getElementById(t("Accounting")).click();
      } else {
        modalsChildRef.current.setRestrictionModal({
          show: true,
          message: t("p46"),
          title: t("Authorization Failed"),
        });
      }
    } else {
      modalsChildRef.current.setRestrictionModal({
        show: true,
        message: t("p47"),
        title: t("Authorization Failed"),
      });
    }
  }
  function stockClick() {
    if (localStorage.getItem("InventoryPage") == "Y") {
      if (localStorage.getItem("BackOffice") == "Y") {
        document.getElementById(t("Inventory")).click();
      } else {
        modalsChildRef.current.setRestrictionModal({
          show: true,
          message: t("p46"),
          title: t("Authorization Failed"),
        });
      }
    } else {
      modalsChildRef.current.setRestrictionModal({
        show: true,
        message: t("p48"),
        title: t("Authorization Failed"),
      });
    }
  }
  function invoiceClick() {
    if (localStorage.getItem("TransactionsPage") == "Y") {
      if (localStorage.getItem("BackOffice") == "Y") {
        document.getElementById(t("Transactions")).click();
      } else {
        modalsChildRef.current.setRestrictionModal({
          show: true,
          message: t("p46"),
          title: t("Authorization Failed"),
        });
      }
    } else {
      modalsChildRef.current.setRestrictionModal({
        show: true,
        message: t("p49"),
        title: t("Authorization Failed"),
      });
    }
  }
  function CheckInClick() {
    if (localStorage.getItem("CheckInPage") == "Y") {
      document.getElementById(t("Check In")).click();
    } else {
      modalsChildRef.current.setRestrictionModal({
        show: true,
        message: t("p50"),
        title: t("Authorization Failed"),
      });
    }
  }
  function logout() {
    setCookie("token", "", {
      path: "/",
    });
    localStorage.clear();
    window.location.href = "/";
  }
  window.scrollTo(0, 0);
  return (
    <div className="  flex flex-col items-center justify-between min-h-screen bg-white">
      <div className="rounded-xl items-center">
        <img
          src={Backoffice}
          className=" w-full  object-cover max-w-[20rem] m-auto "
          alt="Paradox Software Solutions"
        />
      </div>

      <div className="flex flex-col items-center justify-center ">
        <button
          className=" btn-lg active min-w-[10rem] m-3 bg-secondd rounded p-2.5 text-bgTextColor text-xl"
          role="button"
          aria-pressed="true"
          onClick={accountingClick}
        >
          {t("Accounting")}
        </button>
        <button
          className=" btn-lg active min-w-[10rem] m-3 bg-secondd rounded p-2.5 text-bgTextColor text-xl"
          aria-pressed="true"
          onClick={stockClick}
        >
          {t("Inventory")}
        </button>
        <button
          className=" btn-lg active min-w-[10rem] m-3 bg-secondd rounded p-2.5 text-bgTextColor text-xl"
          role="button"
          aria-pressed="true"
          onClick={invoiceClick}
        >
          {t("Transactions")}
        </button>
        <button
          className=" btn-lg active min-w-[10rem] m-3 bg-secondd rounded p-2.5 text-bgTextColor text-xl"
          role="button"
          aria-pressed="true"
          onClick={CheckInClick}
        >
          {t("Check In")}
        </button>
      </div>
      <div>
        <div className="flex flex-col justify-center">
          <div className=" font-semibold text-s italic flex justify-center">
            {t("DesignedDeveloped")}
          </div>
          <img
            src={paradox}
            className=" w-full  object-cover max-w-[20rem] m-auto"
            alt="Paradox Software Solutions"
          />
        </div>
      </div>
      <div>
        <Button
          onClick={logout}
          className="btn-lg active min-w-[10rem]  bg-secondd rounded p-2.5 text-bgTextColor font-bold text-xl"
        >
          {t("Sign out")}
        </Button>
      </div>
      <Modals2 ref={modalsChildRef} />
    </div>
  );
}
