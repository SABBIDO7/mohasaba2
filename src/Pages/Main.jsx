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
  function logout() {
    setCookie("token", "", {
      path: "/",
    });
    localStorage.clear();
    window.location.href = "/";
  }
  window.scrollTo(0, 0);
  return (
    <div className=" h-[90vh] flex flex-col items-center justify-start bg-white min-h-screen">
      <div className=" w-[95%]  my-3 mb-3 rounded-xl items-center">
        <img
          src={Backoffice}
          className=" w-full  object-cover max-w-[20rem] m-auto"
          alt="Paradox Software Solutions"
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-3">
        <button
          className=" btn-lg active min-w-[10rem] m-3 bg-secondd rounded p-2.5 text-white font-normal text-xl"
          role="button"
          aria-pressed="true"
          onClick={accountingClick}
        >
          Accounting
        </button>
        <button
          className=" btn-lg active min-w-[10rem] m-3 bg-secondd rounded p-2.5 text-white font-normal text-xl"
          aria-pressed="true"
          onClick={stockClick}
        >
          Inventory
        </button>
        <button
          className=" btn-lg active min-w-[10rem] m-3 bg-secondd rounded p-2.5 text-white font-normal text-xl"
          role="button"
          aria-pressed="true"
          onClick={invoiceClick}
        >
          Transcations
        </button>
      </div>
      <div className="my-5">
        <div className=" font-semibold text-s">Designed And Developed By</div>
        <img
          src={paradox}
          className=" w-full  object-cover max-w-[20rem] m-auto"
          alt="Paradox Software Solutions"
        />
      </div>
      <div>
        <Button
          onClick={logout}
          className="btn-lg active min-w-[10rem] m-3 bg-secondd rounded p-2.5 text-white font-normal text-xl"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
