import { useState , useContext, useEffect } from "react";
import { GlobalAppContext } from "../App";
import { getArticles } from "./getArticles";

const SearchBar=({placeholder_,setItems_,table_,page_=1,setTotalPages_=null})=>{
  const [inputText,setInputText]=useState('');
  const {backendURL}=useContext(GlobalAppContext);
  const handleResearch=async (fromData)=>{

    const search_input=fromData.get('search-input');
    if(search_input.trim()){
      try{
        const res=await fetch(`${backendURL}/${table_}${search_input.trim()?`/?search=${search_input.trim()}`:'/'}`)
        if(!res.ok) throw new Error('Error while researching');
        const resJson=await res.json();
        setItems_(resJson.data);
        setTotalPages_&& setTotalPages_(null);
      }catch(err){
        console.log(err);
      }
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
          if(!inputText){
            (async()=>{await getArticles(setItems_,backendURL,true,6,page_,setTotalPages_)})(); 
          } 
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