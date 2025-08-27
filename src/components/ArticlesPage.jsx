import { useEffect , useContext , useState } from "react";
import { GlobalAppContext } from "./App";
import { getArticles } from "./utils/getArticles";
import EmptyItemList from "./utils/EmptyItemList";
import ArticlesItem from "./utils/ArticlesItems";
import '../../index.css';
import { useLocation , useNavigate } from "react-router-dom";


const ArticlesPage=()=>{
  const [articles ,setArticles]=useState([]);
  const [totalPages,setTotalPages]=useState(null);
  const [pagesList,setPagesList]=useState(null);
  const page=parseInt(useLocation().pathname.split('/')[2]) || 1;
  const navigate=useNavigate();

  // const [pageNumber,setPageNumber]=useState(1); sera utile pour la pagination
  const {handleButtonActive, setButtons,backendURL}=useContext(GlobalAppContext);
  
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,0));
  },[]);

  useEffect(()=>{
    (async()=>{await getArticles(setArticles,backendURL,true,6,page,setTotalPages)})();
  },[page]);

  useEffect(()=>{
    if(!pagesList && totalPages){
      let list=[];
      for(let i=0;i<totalPages;i++){
        list.push(i+1);
      }
      setPagesList(list);
    }
  },[pagesList,totalPages])

  return(
    <div className="min-h-screen w-full bg-gray-50 p-6 flex flex-col items-center justify-start space-y-8">
      {articles.length===0?
        <EmptyItemList text='Aucun Article Publié' style="h-screen flex flex-col items-center justify-center"/>:
        <ArticlesItem articlesList={articles} readOnClick={true} bottomText="Lire"/>
      }
      <div className="w-full flex items-center justify-center">
        {totalPages && pagesList && totalPages>1 &&
          <div className="w-8/10 space-x-2 flex items-center justify-center">
            <span 
            onClick={()=>{page-1>0?navigate(`/articles/${page-1}`):null}}
            className={`material-symbols-outlined box-content w-fit h-fit cursor-pointer ${page-1>0?'text-fuchsia-400':'text-neutral-400'}`}>
              arrow_left
            </span>

            {pagesList.map((nb_page)=>(
              <div className="w-fit h-fit" onClick={()=>{
                navigate(nb_page!==page?`/articles/${nb_page}`:null)
              }}>
                <span className={`mx-2 ${nb_page===page?'text-fuchsia-400 text-[1.4rem]':'text-purple-800 underline'}`}>
                  {nb_page}
                </span>
              </div>))
            }
           
            <span 
            onClick={()=>{
              page+1<=totalPages?navigate(`/articles/${page+1}`):null}
            }
            className={`material-symbols-outlined box-content w-fit h-fit cursor-pointer ${page+1<=totalPages?'text-fuchsia-400':'text-neutral-400'}`}>
              arrow_right
            </span>
          </div>
        }
      </div>
    </div>
  )
}

export default ArticlesPage;