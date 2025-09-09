import { useState , useContext  } from "react";
import { GlobalAppContext } from "../App";
import { getArticles } from "./getArticles";
import { getUsers } from "./getUsers";

const SearchBar=({placeholder_,setItems_,orderState_,setOrderState_,sortBy_,setSortBy_,searchOptions_,limit_,searchArticle_,isPublished_,page_=1,setTotalPages_=null})=>{
  const [inputText,setInputText]=useState('');
  const {backendURL}=useContext(GlobalAppContext);
  const [showMore,setShowMore]=useState(false);
  const [isExactSearch,setIsExactSearch]=useState(false);

  const handleResearch=async (event)=>{
    event.preventDefault();
    const formData=new FormData(event.target);
    const search_input=formData.get('search-input');
    const exact=formData.get('exact-match')==="on";
    const sort_by=formData.get('sort_by');
    const order=formData.get('order');
    try{
      if(searchArticle_){
        await getArticles(setItems_,backendURL,isPublished_,limit_,1,setTotalPages_,search_input,exact,sort_by||sortBy_,order||orderState_);
      } 
      else{await getUsers(setItems_,backendURL,search_input,sort_by||sortBy_,order||orderState_,exact)}
      setShowMore(false);
    }catch(err){
      console.log(err);
    }
  };
  return(
    <form 
    className="w-full h-fit md:w-1/2 lg:w-1/3 my-4 items-center justify-start flex flex-col "
    onSubmit={handleResearch}>
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
          if(!inputText && searchArticle_){
            (async()=>{await getArticles(setItems_,backendURL,isPublished_,limit_,page_,setTotalPages_,null,false,sortBy_,orderState_,)})(); 
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
          <span className={`italic text-[.9rem] cursor-pointer ${showMore?'text-purple-400':'text-neutral-400'} border-dashed border-b-2 ${showMore?'border-b-purple-400':'border-b-neutral-400'} transition-all ease duration-200`}>
            Plus de paramètres de recherche
          </span>
          <span 
          className={`material-symbols-outlined !text-purple-400 cursor-pointer ${showMore?'rotated':''}`}>
            keyboard_arrow_down
          </span>
        </div>
        <div className={`bg-gradient-to-tr from-purple-400 to-fuchsia-600 rounded-2xl w-full ${showMore?`${!searchArticle_?'h-82':isPublished_?'h-82':'h-70'} px-4 py-2 shadow-md`:'h-0'} transition-all ease duration-300 flex flex-col space-y-1`}>
          <div className="w-full flex items-center justify-start space-x-2">
            <input 
            className={`${!showMore&&'h-0'} transition-all ease duration-300 accent-fuchsia-600`} 
            id="exact-match" 
            name="exact-match" 
            type="checkbox" 
            onChange={(event)=>{setIsExactSearch(event.target.checked)}}
            checked={isExactSearch} />
            <label className={`${!showMore&&'text-[0rem]'} transition-all ease duration-300 text-gray-50`} htmlFor="exact-match">Recherche exacte</label>
          </div>
          {showMore &&
            <fieldset className="border-purple-300 rounded-2xl border-1 px-4 py-2 [&>div]:space-x-1 [&>div]:text-gray-50" disabled={isExactSearch}>
              <legend className="text-gray-50">Ranger Selon</legend>
              {
                searchOptions_.sortBy?.map((option,index)=>(
                  <div key={index}>
                    <input type="radio" name={option.name} id={option.id} value={option.value} checked={sortBy_===option.value} onChange={(event)=>setSortBy_(event.target.value)} className="accent-fuchsia-300" />
                    <label htmlFor={option.id}>{option.label}</label>
                  </div>
                ))
              }
            </fieldset>
          }{showMore &&
            <fieldset className="border-purple-300 rounded-2xl border-1 px-4 py-2 [&>div]:space-x-1 [&>div]:text-gray-50" disabled={isExactSearch}>
              <legend className="text-gray-50">Order</legend>
              {
                searchOptions_.order?.map((option,index)=>(
                  <div key={index}>
                    <input type="radio" name={option.name} id={option.id} value={option.value} checked={orderState_===option.value} onChange={(event)=>setOrderState_(parseInt(event.target.value))} className="accent-fuchsia-300" />
                    <label htmlFor={option.id}>{option.label}</label>
                  </div>
                ))
              }
            </fieldset>
          }
          {
            showMore && 
            <button 
            type="submit"
            className={`py-2 my-1 bg-fuchsia-300 text-gray-50 rounded-lg ${!showMore&&'h-0'} transition-all ease duration-300`}>
              Appliquer
            </button>
          }
        </div>
      </div>
    </form>
  );
}
export default SearchBar

{/**
  We must next genralize the search bar for users too. To do so, we must pass a data set with all the necessary informations to render
  a good sort_by section.
*/}