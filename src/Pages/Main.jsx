import Button from "react-bootstrap/Button";
import Backoffice from "../media/backoffice1.png";
import paradox from "../media/paradox.png";
import { useCookies } from "react-cookie";

export default function Main(props) {
  const [cookies, setCookie] = useCookies(["token"]);

  function accountingClick() {
    document.getElementById("Accounting").click();
  }
  function stockClick() {
    document.getElementById("Inventory").click();
  }
  function invoiceClick() {
    document.getElementById("Transactions").click();
  }
  function CheckInClick() {
    document.getElementById("Check In").click();
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
          Accounting
        </button>
        <button
          className=" btn-lg active min-w-[10rem] m-3 bg-secondd rounded p-2.5 text-bgTextColor text-xl"
          aria-pressed="true"
          onClick={stockClick}
        >
          Inventory
        </button>
        <button
          className=" btn-lg active min-w-[10rem] m-3 bg-secondd rounded p-2.5 text-bgTextColor text-xl"
          role="button"
          aria-pressed="true"
          onClick={invoiceClick}
        >
          Transcations
        </button>
        <button
          className=" btn-lg active min-w-[10rem] m-3 bg-secondd rounded p-2.5 text-bgTextColor text-xl"
          role="button"
          aria-pressed="true"
          onClick={CheckInClick}
        >
          Check In
        </button>
      </div>
      <div>
        <div className="flex flex-col justify-center">
          <div className=" font-semibold text-s italic flex justify-center">
            Designed And Developed By
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
          Sign out
        </Button>
      </div>
    </div>
  );
}
