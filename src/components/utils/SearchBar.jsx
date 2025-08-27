import { useState , useContext } from "react";
import { GlobalAppContext } from "../App";
import { getArticles } from "./getArticles";
import { href } from "react-router-dom";

const SearchBar=({placeholder_,setItems_,table_,page_=1,setTotalPages_=null})=>{
  const [inputText,setInputText]=useState('');
  const {backendURL}=useContext(GlobalAppContext);
  const [showMore,setShowMore]=useState(false);
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
    className="w-full h-fit md:w-1/2 lg:w-1/3 my-4 items-center justify-start flex flex-col "
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
      <div className="my-2 w-full flex flex-col items-center justify-evenly">
        <div 
        onClick={()=>{setShowMore(prev=>!prev)}}
        className="flex items-center justify-evenly space-y-1">
          <span className={`italic text-[.9rem] ${showMore?'text-purple-400':'text-neutral-400'} border-dashed border-b-2 ${showMore?'border-b-purple-400':'border-b-neutral-400'} transition-all ease duration-200`}>
            Plus de paramètres de recherche
          </span>
          <span 
          className={`material-symbols-outlined !text-purple-400 cursor-pointer ${showMore?'rotated':''}`}>
            keyboard_arrow_down
          </span>
        </div>
        <div className={`bg-purple-400 rounded-2xl w-full ${showMore?'h-90 px-4 py-2':'h-0'} transition-all ease duration-300 flex flex-col space-y-1`}>
          <div className="w-full flex items-center justify-start space-x-2">
            <input className={`${!showMore&&'h-0'} transition-all ease duration-300 accent-fuchsia-600`} id="exact-match" name="exact-match" type="checkbox" value={true} />
            <label className={`${!showMore&&'text-[0rem]'} transition-all ease duration-300 text-gray-50`} htmlFor="exact-match">Recherche exacte</label>
          </div>
          {showMore &&
            <fieldset className="border-purple-300 rounded-2xl border-1 px-4 py-2 [&>div]:space-x-1 [&>div]:text-gray-50">
              <legend className="text-gray-50">Filtre</legend>
              <div>
                <input name="filter" id="title" type="radio" className="accent-fuchsia-300" />
                <label htmlFor="title">Titre</label>
              </div>
              <div>
                <input type="radio" name="filter" id="likes" className="accent-fuchsia-300" />
                <label htmlFor="likes">Likes</label>
              </div>
              <div>
                <input type="radio" name="filter" id="comments" className="accent-fuchsia-300" />
                <label htmlFor="comments">Commentaires</label>
              </div>
              <div>
                <input type="radio" name="filter" id="views" className="accent-fuchsia-300" />
                <label htmlFor="views">Lectures</label>
              </div>
              <div>
                <input type="radio" name="filter" id="date" className="accent-fuchsia-300" />
                <label htmlFor="date">Date de publication</label>
              </div>
            </fieldset>
          }{showMore &&
            <fieldset className="border-purple-300 rounded-2xl border-1 px-4 py-2 [&>div]:space-x-1 [&>div]:text-gray-50">
              <legend className="text-gray-50">Order</legend>
              <div>
                <input type="radio" name="order" id="ascendant" className="accent-fuchsia-300" />
                <label htmlFor="ascendant">Croissant</label>
              </div>
              <div>
                <input type="radio" name="order" id="descendant" className="accent-fuchsia-300" />
                <label htmlFor="descendant">Déroissant</label>
              </div>
            </fieldset>
          }
          {
            showMore && 
            <button className={`py-2 my-1 bg-fuchsia-300 text-gray-50 rounded-lg ${!showMore&&'h-0'} transition-all ease duration-300`}>
              Appliquer
            </button>
          }
        </div>
      </div>
    </form>
  );
}
export default SearchBar