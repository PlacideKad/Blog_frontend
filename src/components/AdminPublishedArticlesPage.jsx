import { useEffect , useContext , useState } from "react";
import { GlobalAppContext } from "./App";
import { getArticles } from "./utils/getArticles";
import ArticlesItem from "./utils/ArticlesItems";

const AdminPublishedArticlesPage=()=>{
  const {backendURL}=useContext(GlobalAppContext);
  const [articles,setArticles]=useState([]);
  const [stashes,setStashes]=useState([]);
  useEffect(()=>{
    (async()=>{await getArticles(setStashes,backendURL,false)})();
    (async()=>{await getArticles(setArticles,backendURL)})();
  },[])
  return(
    <div className="h-full w-full mb-5 md:mb-15">
      {/* En cours d'ecriture */}
      <section className="my-2">
        <h2 className="text-3xl text-fuchsia-400 font-semibold [text-transform:upperCase] italic m-4">Articles en cours : </h2>
        <ArticlesItem stash={true} articlesList={stashes} readOnClick={false}/>
      </section>
      {/* publies */}
      <section className="my-2">
        <h2 className="text-3xl text-fuchsia-400 font-semibold [text-transform:upperCase] italic m-4">Articles publiés :</h2>
        <ArticlesItem stash={false} articlesList={articles} readOnClick={false}/>
      </section>
    </div>
  );
}
export default AdminPublishedArticlesPage;