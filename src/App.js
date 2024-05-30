import React, { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Accounting from "./Pages/Accounting";
import Soon from "./Pages/Soon";
import Main from "./Pages/Main";
import LoginModal from "./components/Login/LoginModal";
import Stock from "./Pages/Stock";
import Invoice from "./Pages/Invoice";
import CheckIn from "./Pages/CheckIn";
import CheckInReport from './components/CheckIn/CheckInReport'
import { useCookies } from "react-cookie";
import { getCompanyInfo } from "./components/BackendEndPoints/Endpoint1";
import fullScreenToggle from './media/5642608.png'
import QuickMenuToggle from './media/Arrow2.png'
import Button from "react-bootstrap/Button";
import {animate, motion} from 'framer-motion'
import axios from "axios";
import CompanyPortal from "./Pages/CompanyPortal";



function App() {
  const [token, setToken] = useState("");
  const [isVerified, setisVerified] = useState(false)
  const [Username, setUsername] = useState("");
  
  const [Compname, setCompname] = useState("");
  const [QuickMenu,setQuickMenu ] = useState(false);
  const [FullScreen,setFullScreen ] = useState(false);
  const [url,setUrl ] = useState("http://localhost:8000");
  //const [url,setUrl ] = useState("https://pssapi.net:444");

  const [cookies, setCookie] = useCookies(["token"]);



  function UserDataHandler (compname,vName, vToken = ""){
    setUsername(vName)
    setToken(vToken)
    setCompname(compname)  
    setisVerified(true)
    handleCookie(vToken)
  }

  function fullScreenHandler(){
    try{
      var elem = document.documentElement;

      if(!FullScreen){
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
        }
        
        setFullScreen(true)
      }
      else if(FullScreen){
        document.exitFullscreen();
        setFullScreen(false)
      }
    }catch{
      
    }
  }

  function QuickMenuHandler(){
    if(!QuickMenu){
      
      setQuickMenu(true)
    }
    else if(QuickMenu){
      
      setQuickMenu(false)
    }
  }






  function handleCookie(vToken) { 
    let expDate = new Date('2099-12-17T03:24:00')
    setCookie("token", vToken, {
      path: "/",
      expires : expDate
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!isVerified) {
        setisVerified(null);
        var bodyFormData = new FormData();
        

        let username = localStorage.getItem("username");
        let compname =localStorage.getItem("compname");
        let password =localStorage.getItem("password");
        // console.log(password);
        // console.log(compname);
        // console.log(username);
        if((username==null || username ==undefined) || (compname == null || compname ==undefined) || (password==null || password==undefined)){
              setisVerified(false);
        }
       else{
         bodyFormData.append("compname", compname.toLowerCase());
       bodyFormData.append("username", username.toLowerCase());
       bodyFormData.append("password", password);
         // ... (code inside if(!isVerified) block)
 
         // Your axios request can be asynchronous, so you can use `await`.
         // For this, make the enclosing function `async`.
         try {
           const resp = await axios({
             method: "post",
             url: url + "/moh/login/",
             data: bodyFormData,
             headers: { "Content-Type": "multipart/form-data" },
           });
 
           const data = resp.data;
 
           if (data.Info === "authorized") {
            
             setisVerified(true);
             setCompname(data.compname);
             setUsername(data.name);
             setToken(cookies.token);
            //  let Sbranch = localStorage.getItem("Sbranch");
            //  let Abranch = localStorage.getItem("Abranch");
            //  let SalePrice = localStorage.getItem("SalePrice");
             
            
             
              localStorage.setItem("Sbranch",data.Sbranch);
              localStorage.setItem("Abranch",data.Abranch);
            
            
              localStorage.setItem("SalePrice",data.SalePrice);
            
            localStorage.setItem("DeleteInvoice",data.Permissions["DeleteInvoice"]);
            localStorage.setItem("DeleteItem",data.Permissions["DeleteItem"]);
            localStorage.setItem("Discount",data.Permissions["Discount"]);
            localStorage.setItem("Price",data.Permissions["Price"]);
            localStorage.setItem("CallInvoice",data.Permissions["CallInvoice"]);
            localStorage.setItem(
              "SA_AP",
              data.Permissions["SalesForm"]
            );
            localStorage.setItem(
              "SR_AP",
              data.Permissions["SalesReturnForm"]
            );
            localStorage.setItem(
              "OD_AP",
              data.Permissions["OrderForm"]
            );
            localStorage.setItem(
              "PI_AP",
              data.Permissions["PurchaseForm"]
            );
            localStorage.setItem(
              "PR_AP",
              data.Permissions["PurchaseReturnForm"]
            );
            localStorage.setItem(
              "SAT_AP",
              data.Permissions["BranchTransferForm"]
            );
            localStorage.setItem(
              "SalesUnderZero",
             data.Permissions["SalesUnderZero"]
            );
            localStorage.setItem(
              "ChangeBranch",
             data.Permissions["ChangeBranch"]
            );
            localStorage.setItem(
              "CheckInReport",
              data.Permissions["CheckInReport"]
            );
            localStorage.setItem(
              "AccountingPage",
              data.Permissions["AccountingPage"]
            );
            localStorage.setItem(
              "InventoryPage",
              data.Permissions["InventoryPage"]
            );
            localStorage.setItem(
              "TransactionsPage",
              data.Permissions["TransactionsPage"]
            );
            localStorage.setItem(
              "CheckInPage",
              data.Permissions["CheckInPage"]
            );

            
           } else {
          
               
               setisVerified(false);
             
             
           }
         } catch (error) {
           // Handle errors here if needed
           console.error("Error fetching data:", error);
         }
       } 
      }
    };

    fetchData(); // Call the function when the component mounts
    getCompanyInfo();
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // if(cookies.token != undefined && !isVerified ){
  //   fetch(url+"/moh/" + "/login/")
  //   .then((resp)=>resp.json())
  //   .then((data)=>{
  //     if (data.Info == "authorized"){
  //       setisVerified(true)
  //       setCompname(data.compname)
  //       setUsername(data.name)
  //       setToken(cookies.token)
  //     }else{
  //       if (isVerified){
  //         setisVerified(false)
  //       }
  //     }
  //   })
  // }

  function Quickmenu(){
    // return(
    //   <>
    //   <motion.div id="QM" className={"fixed top-48 m-auto w-[10rem] flex h-[25rem] bg-gradient-to-r from-gray-500 rounded-3xl z-10 ".concat(QuickMenu?"right-[-10rem]":"right-[-5rem]")} animate={{x: QuickMenu? "-5rem":"5rem" }} >
    //       <div  onClick={QuickMenuHandler} className={"absolute left-[-30px] top-[70px] bg-gray-500 p-1 rounded-full transition-all ".concat(QuickMenu?"-rotate-90":"rotate-90")} >
    //             <img onClick={QuickMenuHandler} className="QuickMenuToggle w-7 rounded-full bg-gray-600" src={QuickMenuToggle}/>
    //       </div>
    //       <div className="flex flex-col justify-evenly p-2 tra">
        
    //           <Button variant={!FullScreen?"light":"outline-light"} onClick={fullScreenHandler} className=" w-[4.2rem]"><img className="h-[2.8rem] m-auto" src={fullScreenToggle} /></Button>
    //           <div></div>
    //           <div></div>
    //           <div></div>
    //       </div>
    //       </motion.div>
    //   </>
    // )
  }

  
  return (
    <>
    {isVerified!=null ?
      (
    <div className="App min-h-[100vh] max-h-[100vh] bg-prime">
      <BrowserRouter>
      {isVerified ? null : (<LoginModal url={url} UserDataHandler={UserDataHandler} />)}
        <Header name ={Username} compname={Compname} url={url}>
         <Quickmenu /> 
          <Routes>
            <Route path="/" element={<Main compname={Compname}/>}/>
            {localStorage.getItem("AccountingPage") == "Y" &&   localStorage.getItem("BackOffice") == "Y" 
&& (
            <Route path="/Accounting" element={<Accounting url={url} UserDataHandler={UserDataHandler} token={token} />} />
            )}
            {localStorage.getItem("InventoryPage") == "Y" &&   localStorage.getItem("BackOffice") == "Y" 
&& (
            <Route path="/Inventory" element={<Stock url={url} UserDataHandler={UserDataHandler} token={token} />} />
            )}
            {localStorage.getItem("TransactionsPage") == "Y" &&     localStorage.getItem("BackOffice") == "Y" 
&& (
            <Route path="/Invoice" element={<Invoice url={url} UserDataHandler={UserDataHandler} token={token} name ={Username} />
           
          } />
        )}
        {localStorage.getItem("CheckInPage") == "Y" && (
          <Route path="/CheckIn" element={<CheckIn url={url} UserDataHandler={UserDataHandler} token={token} name ={Username} />
            
          } />
        )}
            {localStorage.getItem("CheckInReport") == "Y" && (
          <Route path="/CheckIn/CheckInReport" element={<CheckInReport  />
            
          } />
        )}
        <Route path="/CompanyPortal" element={<CompanyPortal url={url}  />
            
          } />
           </Routes>
        </Header>
      </BrowserRouter>
     
    </div>
      ):(
        // loading indicator designed well at the center of the screen
        <div className="App min-h-[100vh] max-h-[100vh] bg-neutral-300">
      <div className="flex justify-center items-center h-screen">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    </div>
      )
  }
  </>
  );
  

}

export default App;
