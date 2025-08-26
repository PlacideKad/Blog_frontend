import { useState , useContext, useEffect } from "react";
import { GlobalAppContext } from "../App";

const SearchBar=({placeholder_,setItems_,table_,resetResearchFunction_})=>{
  const [inputText,setInputText]=useState('');
  const {backendURL}=useContext(GlobalAppContext);
  const handleResearch=async (fromData)=>{
    const searchKey=fromData.get('search-input')
    console.log(searchKey);
    try{
      const res=await fetch(`${backendURL}/${table_}${searchKey.trim()?`/?search=${searchKey.trim()}`:null}`)
      if(!res.ok) throw new Error('Error while researching');
      const resJson=await res.json();
      setItems_(resJson.data)
    }catch(err){
      console.log(err);
    }
  };

  return(
    <form 
    className="w-full h-10 md:w-1/2 lg:w-1/3 my-4 items-center justify-center flex"
    action={handleResearch}>
      <div className="w-full h-full ring-fuchsia-400 ring-2 rounded-full flex items-center justify-evenly">
        <input
        className="w-8/10 h-full rounded-l-full outline-none px-4" 
        name="search-input"
        type="text" 
        value={inputText}
        onChange={(event)=>{setInputText(event.target.value)}}
        placeholder={placeholder_}  />
        <button 
        onClick={()=>{
          if(!inputText) resetResearchFunction_(setItems_,backendURL);
        }}
        className="w-2/10 h-full cursor-pointer flex items-center justify-center rounded-r-full bg-fuchsia-400">
          <span className="material-symbols-outlined !text-white !text-[2rem]">
            search
          </span>
        </button>
      </div>
    </form>
  );
}
export default SearchBar