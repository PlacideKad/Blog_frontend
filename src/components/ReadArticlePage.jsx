import { useLocation , useNavigate} from "react-router-dom";
import { useEffect , useState , useRef} from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const ReadArticlePage=()=>{
  const editorRef=useRef(null);
  const location=useLocation();
  const navigate=useNavigate();
  const id=location.pathname.split('/')[2];
  const [article,setArticle]=useState({});

  useEffect(()=>{
    const fetchArticleData=async (article_id)=>{
      try{
        const res=await fetch(`http://localhost:3000/api/articles/${article_id}`);
        if(!res) throw new Error('Error happened when fetching the article page content');
        const resJson=await res.json();
        if(resJson.found){
          console.log(resJson.article);
          setArticle(resJson.article);
        }
      }catch(err){
        console.log(err);
        navigate('/404');
      }
    }
    (async()=>{await fetchArticleData(id)})();
  },[]);
  useEffect(()=>{
    if(editorRef.current){
      const options={
        modules:{
          toolbar:false
        },
        placeholder:'Redigez votre article ici...',
        theme:'snow',
        readOnly:true
      };
      const quill=new Quill(editorRef.current,options);
      if(article.content) quill.setContents(JSON.parse(article.content))
    }
  },[article])

  return(
    <div className="p-4 flex flex-col items-center justify-start min-h-[50vh] w-full space-y-4">

      {/* Title */}
      <section className="text-5xl font-bold [text-transform:capitalize] italic">
        {article.title}
      </section>

      {/* article content */}
      <div className="w-full ">
        <span className="text-[.7rem] text-neutral-400 [text-transform:capitalize]">{new Date(article.createdAt).toLocaleDateString('fr-FR',{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</span>
        <div className="w-full ![font-family:Noto Sans, sans-serif] !text-[1rem] !border-none" ref={editorRef}></div>
      </div>
    </div>
  );
}
export default ReadArticlePage;