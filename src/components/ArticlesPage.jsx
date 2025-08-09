import { useEffect , useContext , useState } from "react";
import { NavbarContext } from "./App";


const ArticlesPage=()=>{
  const [articles ,setArticles]=useState([]);
  // const [pageNumber,setPageNumber]=useState(1); sera utile pour la pagination
  const {handleButtonActive, setButtons}=useContext(NavbarContext);
  
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,0));
  },[]);

  useEffect(()=>{
    const getArticles=async()=>{
      try{
        const res=await fetch('http://localhost:3000/api/articles');
        if(!res.ok) throw new Error('Error when fetching the articles');
        const resJson=await res.json();
        setArticles(resJson);
      }catch(err){
        console.log(err);
      }
    };
    (async()=>{await getArticles()})();
  },[])

  return(
    <div className="min-h-screen bg-gray-50 p-6">
    {articles.length===0?
      <div className="h-full w-full flex items-center justify-center">
        No articles published yet
      </div>:
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            <img
              src={article.cover.link}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <span className="text-xs font-semibold text-white px-2 py-1 rounded bg-fuchsia-400 w-fit">
                {article.category}
              </span>
              <h2 className="mt-2 text-lg font-bold">{article.title}</h2>
              <p className="text-sm text-gray-600 mt-1 flex-1">
                {article.summary}
              </p>
              <button className="mt-3 text-fuchsia-400 font-semibold hover:underline">
                Lire →
              </button>
            </div>
          </div>
        ))}
      </div>
    }
    </div>
  )
}



export default ArticlesPage;