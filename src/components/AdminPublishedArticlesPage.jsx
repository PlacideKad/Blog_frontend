import { useEffect , useContext , useState } from "react";
import { GlobalAppContext } from "./App";
import { getArticles } from "./utils/getArticles";
import ArticlesItem from "./utils/ArticlesItems";

const AdminPublishedArticlesPage=()=>{
  const {backendURL}=useContext(GlobalAppContext);
  const [articles,setArticles]=useState([]);
  useEffect(()=>{
    (async()=>{await getArticles(setArticles,backendURL)})();
  },[])
  return(
    <div className="h-full w-full mb-5 md:mb-15">
      {/* En cours d'ecriture */}
      <section>

      </section>
      {/* publies */}
      <section>
        <ArticlesItem bottomText="Modifier" articlesList={articles} readOnClick={false}/>
      </section>
    </div>
  );
}
export default AdminPublishedArticlesPage;