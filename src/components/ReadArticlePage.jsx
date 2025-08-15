import { useLocation , useNavigate} from "react-router-dom";
import { useEffect } from "react";

const ReadArticlePage=()=>{
  const location=useLocation();
  const navigate=useNavigate();
  const id=location.pathname.split('/')[2];

  useEffect(()=>{
    const fetchArticleData=async (article_id)=>{
      try{
        const res=await fetch(`http://localhost:3000/api/articles/${article_id}`);
        if(!res) throw new Error('Error happened when fetching the article page content');
        const resJson=await res.json();
        if(resJson.found){
          const article=resJson.article;
          console.log(article);
        }
      }catch(err){
        console.log(err);
        navigate('/404');
      }
    }
    (async()=>{await fetchArticleData(id)})()
  },[]);

  return(
    <div className="px-4 flex flex-col items-center justify-start min-h-[50vh] w-full">

      {/* Title */}
      <section>

      </section>
    </div>
  );
}
export default ReadArticlePage;