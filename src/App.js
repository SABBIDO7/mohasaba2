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
import { useCookies } from "react-cookie";
import fullScreenToggle from './media/5642608.png'
import QuickMenuToggle from './media/Arrow2.png'
import Button from "react-bootstrap/Button";
import {animate, motion} from 'framer-motion'
import axios from "axios";



function App() {
  const [token, setToken] = useState("");
  const [isVerified, setisVerified] = useState(false)
  const [Username, setUsername] = useState("")
  const [Compname, setCompname] = useState("")
  const [QuickMenu,setQuickMenu ] = useState(false);
  const [FullScreen,setFullScreen ] = useState(false);
  const [url,setUrl ] = useState("https://pssapi.net:444");
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

      if(!FullScreen){
        document.body.requestFullscreen()
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
    let expDate = new Date('2023-12-17T03:24:00')
    setCookie("token", vToken, {
      path: "/",
      expires : expDate
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!isVerified) {
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
            
           } else {
             if (isVerified) {
               
               setisVerified(false);
             }
             
           }
         } catch (error) {
           // Handle errors here if needed
           console.error("Error fetching data:", error);
         }
       } 
      }
    };

    fetchData(); // Call the function when the component mounts

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
    return(
      <>
      <motion.div id="QM" className={"fixed top-48 m-auto w-[10rem] flex h-[25rem] bg-gradient-to-r from-gray-500 rounded-3xl z-10 ".concat(QuickMenu?"right-[-10rem]":"right-[-5rem]")} animate={{x: QuickMenu? "-5rem":"5rem" }} >
          <div  onClick={QuickMenuHandler} className={"absolute left-[-30px] top-[70px] bg-gray-500 p-1 rounded-full transition-all ".concat(QuickMenu?"-rotate-90":"rotate-90")} >
                <img onClick={QuickMenuHandler} className="QuickMenuToggle w-7 rounded-full bg-gray-600" src={QuickMenuToggle}/>
          </div>
          <div className="flex flex-col justify-evenly p-2 tra">
        
              <Button variant={!FullScreen?"light":"outline-light"} onClick={fullScreenHandler} className=" w-[4.2rem]"><img className="h-[2.8rem] m-auto" src={fullScreenToggle} /></Button>
              <div></div>
              <div></div>
              <div></div>
          </div>
          </motion.div>
      </>
    )
  }

  return (
    <div className="App min-h-[100vh] max-h-[100vh] bg-neutral-300">
      <BrowserRouter>
      {isVerified ? null : (<LoginModal url={url} UserDataHandler={UserDataHandler} />)}
        <Header name ={Username} compname={Compname} url={url}>
         <Quickmenu /> 
          <Routes>
            <Route path="/" element={<Main compname={Compname}/>}/>
            <Route path="/Accounting" element={<Accounting url={url} UserDataHandler={UserDataHandler} token={token} />} />
            <Route path="/Inventory" element={<Stock url={url} UserDataHandler={UserDataHandler} token={token} />} />
            <Route path="/Invoice" element={<Invoice url={url} UserDataHandler={UserDataHandler} token={token} name ={Username} />} />
           </Routes>
        </Header>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
