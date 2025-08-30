import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {GlobalAppContext} from "../App";

const ArticlesItem=({articlesList,readOnClick,stash,refresh})=>{
  const navigate=useNavigate();
  const {backendURL}=useContext(GlobalAppContext);
  const handleDeleteItem=async (isStash,id)=>{
    try{
      const link=`${backendURL}/admin/${isStash?'stashes':'articles'}`;
      const res=await fetch(link,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({id})
      });
      if(!res.ok) throw new Error('Error when deleting an item');
      const resJson=await res.json();
      if(resJson.success) refresh() ;
    }catch(err){
      console.log(err);
    }
  }
  return(
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative -z-0">
      {articlesList.map((article) => (
        <div key={article._id} className="relative">
          {!readOnClick && 
            <div 
            onClick={()=>{handleDeleteItem(stash,article._id)}}
            className="absolute cursor-pointer h-10 md:h-13 [aspect-ratio:1/1] -top-3 -right-0 md:-right-3 rounded-full bg-[#ff6f6fd1] flex items-center justify-center">
              <span className="material-symbols-outlined !text-[1.5rem] !md:text-[2rem] !text-white">delete</span>
            </div>
          }
          <div
            onClick={()=>{navigate(`${readOnClick?`/articles/read/${article._id}`:stash?`/edit/stash/${article._id}`:`/edit/article/${article._id}`}`)}}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            <img
              src={article.cover?.link}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              {!stash&&
              <div className="w-fit flex items-center justify-between px-2 py-2 bg-fuchsia-400 rounded-full space-x-5">
                <div className="flex items-center justify-between space-x-0.5 !text-gray-100">
                  <span className="">{article.read?.length}</span>
                  <span className="material-symbols-outlined">visibility</span>
                </div>
                <div className="flex items-center justify-between space-x-0.5 !text-gray-100">
                  <span className="">{article.likes?.length}</span>
                  <span className="material-symbols-outlined" style={{'--FILL':1}}>favorite</span>
                </div>
              </div>
              }
              <h2 className="mt-2 text-lg font-bold">{article.title}</h2>
              <p className="text-sm text-gray-600 mt-1 flex-1">
                {article.summary}
              </p>
              <button className="mt-3 text-fuchsia-400 font-semibold hover:underline">
                {stash?'Poursuivre':readOnClick?'Lire':'Modifier'} →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ArticlesItem;