import { useEffect , useContext , useState } from "react";
import { GlobalAppContext } from "./App";
import { getArticles } from "./utils/getArticles";
import EmptyItemList from "./utils/EmptyItemList";
import ArticlesItem from "./utils/ArticlesItems";
import '../../index.css';


const ArticlesPage=()=>{
  const [articles ,setArticles]=useState([]);
  // const [pageNumber,setPageNumber]=useState(1); sera utile pour la pagination
  const {handleButtonActive, setButtons,backendURL}=useContext(GlobalAppContext);
  
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,0));
  },[]);

  useEffect(()=>{
    (async()=>{await getArticles(setArticles,backendURL)})();
  },[])

  return(
    <div className="min-h-screen bg-gray-50 p-6">
    {articles.length===0?
      <EmptyItemList text='Aucun Article Publié' style="h-screen flex flex-col items-center justify-center"/>:
      <ArticlesItem articlesList={articles} readOnClick={true} bottomText="Lire"/>
    }
    </div>
  )
}

export default ArticlesPage;