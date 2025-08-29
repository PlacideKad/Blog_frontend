import { useEffect , useContext , useState } from "react";
import { GlobalAppContext } from "./App";
import { getArticles } from "./utils/getArticles";
import ArticlesItem from "./utils/ArticlesItems";
import EmptyItemList from "./utils/EmptyItemList";
import { Link } from "react-router-dom";

const AdminPublishedArticlesPage=()=>{
  const {backendURL}=useContext(GlobalAppContext);
  const [articles,setArticles]=useState([]);
  const [stashes,setStashes]=useState([]);
  const setTotalPages=()=>{}
  const [refreshPublish,setRefreshPublish]=useState(true);
  const refresh=()=>{setRefreshPublish(prev=>!prev)};
  useEffect(()=>{
    try{
      (async()=>{await getArticles(setStashes,backendURL,false,6,1,setTotalPages,null,false,'createdAt',-1)})();
      (async()=>{await getArticles(setArticles,backendURL,true,6,1,setTotalPages,null,false,'createdAt',-1)})();
    }catch(err){
      console.log(err);
    }
  },[refreshPublish]);
  return(
    <div className="h-full w-full mb-5 md:mb-15">
      {/* En cours d'ecriture */}
      <section className="my-2">
        <h2 className="text-3xl text-fuchsia-400 font-semibold [text-transform:upperCase] italic m-4">Articles en cours</h2>
        {stashes.length===0?
          <EmptyItemList text="Aucun article en cours" style="flex flex-col items-center justify-center"/>:
          <ArticlesItem stash={true} articlesList={stashes} readOnClick={false} refresh={refresh}/>
        }
        {stashes.length>6&&
          <div className="w-full my-2 flex items-center justify-center">
            <Link className="text-purple-400 font-extrabold">
              Voir plus →
            </Link>
          </div>
        }

      </section>
      {/* publies */}
      <section className="my-2">
        <h2 className="text-3xl text-fuchsia-400 font-semibold [text-transform:upperCase] italic m-4">Articles publiés</h2>
        {articles.length===0?
          <EmptyItemList text="Aucun article publié" style="flex flex-col items-center justify-center"/>:
          <ArticlesItem stash={false} articlesList={articles} readOnClick={false} refresh={refresh}/>
        }
        {articles.length>6&&
          <div className="w-full my-2 flex items-center justify-center">
            <Link className="text-purple-400 font-extrabold">
              Voir plus →
            </Link>
          </div>
        }
      </section>
    </div>
  );
}
export default AdminPublishedArticlesPage;