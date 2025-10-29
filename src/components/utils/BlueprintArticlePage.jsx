import { useEffect , useContext , useState } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import { GlobalAppContext } from "../App";
import { getArticles } from "./getArticles";
import EmptyItemList from "./EmptyItemList";
import ArticlesItem from "./ArticlesItems";
import SearchBar from "./SearchBar";
import Title from "./Title";
import Loader from "./Loader";
import ErrorPopup from "./ErrorPopup";

const BlueprintArticlePage=({isPublished_,isAdmin_,limit_})=>{
  const [articles ,setArticles]=useState([]);
  const [totalPages,setTotalPages]=useState(null);
  const [pagesList,setPagesList]=useState(null);
  const [sortBy,setSortBy]=useState('createdAt');
  const [orderState,setOrderState]=useState(-1);
  const [isLoading, setIsLoading]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);  
  const page=parseInt(useLocation().pathname.split('/')[isAdmin_?3:2]) || 1;
  const navigate=useNavigate();

  const {handleButtonActive,setButtons,backendURL}=useContext(GlobalAppContext);
  const searchOptions=isPublished_?{
    sortBy:[
      {
        label:"Titre",
        name:"sort_by",
        id:"title",
        value:'title'
      },
      {
        label:"Likes",
        name:"sort_by",
        id:"likes",
        value:'likes'
      },
      {
        label:"Lectures",
        name:"sort_by",
        id:"read",
        value:'read'
      },
      {
        label:"Date de publication",
        name:"sort_by",
        id:"createdAt",
        value:'createdAt'
      }
    ],
    order:[
      {
        label:"Croissant",
        name:"order",
        id:"ascendant",
        value:1
      },
      {
        label:"Décroissant",
        name:"order",
        id:"descendant",
        value:-1
      },
    ]
  }:{
    sortBy:[
      {
        label:"Titre",
        name:"sort_by",
        id:"title",
        value:'title'
      },
      {
        label:"Date de publication",
        name:"sort_by",
        id:"createdAt",
        value:'createdAt'
      }
    ],
    order:[
      {
        label:"Croissant",
        name:"order",
        id:"ascendant",
        value:1
      },
      {
        label:"Décroissant",
        name:"order",
        id:"descendant",
        value:-1
      },
    ]
  }
  
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,0));
  },[]);

  const loadingStateCallback=(loadingState)=>{
    setIsLoading(loadingState);
  }
  const errorMessageCallback=(error)=>{
    setErrorMessage(error)
  }
  useEffect(()=>{
    (async()=>{await getArticles(setArticles,backendURL,isPublished_,limit_,page,setTotalPages,null,false,sortBy,orderState,
      loadingStateCallback,
      errorMessageCallback
    )})();
  },[page]);

  useEffect(()=>{
    if(totalPages){
      let list=[];
      for(let i=0;i<totalPages;i++){
        list.push(i+1);
      }
      setPagesList(list);
    }
  },[totalPages]);
  return(
    <div className="min-h-screen h-fit w-full">
      <ErrorPopup
      showState_={errorMessage?true:false}
      onCloseCallback_={()=>{setErrorMessage(null)}}
      message_={errorMessage? errorMessage.message : ''}
      />
      {isAdmin_&&
        <section className="absolute top-0 left-0">
          <Title windowWidth={window.innerWidth}/>
        </section>
      }

      <div className={`w-full min-h-screen h-full bg-fuchsia-50 p-6 ${isAdmin_?'mt-[8vh] lg:mt-[10vh]':''} flex flex-col items-start justify-start space-y-8 relative z-0`}>
        <SearchBar
          placeholder_="Entrer un titre d'article ou un mot clé"
          setItems_={setArticles}
          table_='articles'
          setTotalPages_={setTotalPages}
          sortBy_={sortBy}
          setSortBy_={setSortBy}
          orderState_={orderState}
          setOrderState_={setOrderState}
          searchArticle_={true}
          isPublished_={isPublished_}
          searchOptions_={searchOptions}
          limit_={limit_}/>
        {isLoading?
        <Loader
        message_='We are loading'
        style_="w-full h-[70vh]"/>:
        articles.length===0?
          <EmptyItemList text="Aucun Résultat" style="h-screen w-full flex flex-col items-center justify-center"/>:
          <ArticlesItem articlesList={articles} readOnClick={!isAdmin_} bottomText="Lire"/>
        }
        <div className="w-full absolute bottom-0 my-4 left-0 flex items-center justify-center">
          {totalPages && pagesList && totalPages>1 &&
            <div className="w-8/10 space-x-2 flex items-center justify-center">
              <span 
              onClick={()=>{page-1>0?navigate(`${isAdmin_?'/admin':''}/${isPublished_?'articles':'stashes'}/${page-1}`):null}}
              className={`material-symbols-outlined box-content w-fit h-fit cursor-pointer ${page-1>0?'text-fuchsia-400':'text-neutral-400'}`}>
                arrow_left
              </span>

              {pagesList.map((nb_page,index)=>(
                <div key={index} className="w-fit h-fit" onClick={()=>{
                  navigate(nb_page!==page?`${isAdmin_?'/admin':''}/${isPublished_?'articles':'stashes'}/${nb_page}`:null)
                }}>
                  <span className={`mx-2 cursor-pointer ${nb_page===page?'text-fuchsia-400 text-[1.3rem]':'text-purple-800 underline'}`}>
                    {nb_page}
                  </span>
                </div>))
              }
            
              <span 
              onClick={()=>{
                page+1<=totalPages?navigate(`${isAdmin_?'/admin':''}/${isPublished_?'articles':'stashes'}/${page+1}`):null}
              }
              className={`material-symbols-outlined box-content w-fit h-fit cursor-pointer ${page+1<=totalPages?'text-fuchsia-400':'text-neutral-400'}`}>
                arrow_right
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default BlueprintArticlePage;