import React, { useState, useEffect } from "react";
import searchImg from "../../media/searchnbg.png"

export default function AccountingInput(props){
 // const [isactive,setIsActive] = useState(true)
 let isactive = false;
if(props.vSelect["name"] == "<0" || props.vSelect["name"] == ">0" || props.vSelect["name"] == "=0"){
 // setIsActive(false)
 isactive = true
}

  


function setSearchValue(e){
  props.InputHandler(props.tempSearch)
}

useEffect(()=>{

  
  const keyDownHandler = event => {

    if (event.key === 'Enter') {

      setSearchValue();
    }
  };
  document.addEventListener('keydown', keyDownHandler);
  return () => {
    document.removeEventListener('keydown', keyDownHandler);
  };
  
})
    return(
        <div className="max-w-[12rem] min-w-[10rem] m-auto pl-1 px-3">
      
        <div className="relative mt-1 rounded-md shadow-sm">
          
          <input
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-gray-300 pl-5 pr-12 pt-[0.45rem] pb-[0.5rem] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search"
            value={props.tempSearch}
            disabled={isactive}
           
            onChange={(e)=>{
              props.setTempSearch(e.target.value)
            }}
          />
           <img 
          onClick={()=>{
            setSearchValue()
          }} 
          src={searchImg} id='SI' className={`absolute h-full top-0 right-0 bg-slate-100 rounded-r-lg`} />
        </div>
      </div>
    )
}