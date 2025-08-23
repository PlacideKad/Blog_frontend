import { useEffect , useContext , useState } from "react";
import { GlobalAppContext } from "./App";
import { getArticles } from "./utils/getArticles";
import ArticlesItem from "./utils/ArticlesItems";
import EmptyItemList from "./utils/EmptyItemList";

const AdminPublishedArticlesPage=()=>{
  const {backendURL}=useContext(GlobalAppContext);
  const [articles,setArticles]=useState([]);
  const [stashes,setStashes]=useState([]);
  const [refreshPublish,setRefreshPublish]=useState(true);
  const refresh=()=>{setRefreshPublish(prev=>!prev)};
  useEffect(()=>{
    (async()=>{await getArticles(setStashes,backendURL,false)})();
    (async()=>{await getArticles(setArticles,backendURL)})();
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
      </section>
      {/* publies */}
      <section className="my-2">
        <h2 className="text-3xl text-fuchsia-400 font-semibold [text-transform:upperCase] italic m-4">Articles publiés</h2>
        {articles.length===0?
          <EmptyItemList text="Aucun article publié" style="flex flex-col items-center justify-center"/>:
          <ArticlesItem stash={false} articlesList={articles} readOnClick={false} refresh={refresh}/>
        }
      </section>
    </div>
  );
}
export default AdminPublishedArticlesPage;