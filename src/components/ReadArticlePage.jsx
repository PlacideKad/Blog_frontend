import { useLocation , useNavigate} from "react-router-dom";
import { useEffect , useState , useRef , useContext} from "react";
import {AuthenticatedContext} from './App';
import "quill/dist/quill.snow.css";
import Quill from "quill";

const ReadArticlePage=()=>{
  const editorRef=useRef(null);
  const location=useLocation();
  const navigate=useNavigate();
  const id=location.pathname.split('/')[2];
  const [article,setArticle]=useState({});
  const [comments,setComments]=useState([]);
  const [likes,setLikes]=useState([]);
  const [isLiked,setIsLiked]=useState(false);//when we fetch article from the data base, we must verify if the user has liked this article or not and accordingly setIsLiked inside the useEffect
  const [isPressed,setIsPressed]=useState(false);
  const {isAuthenticated,user}=useContext(AuthenticatedContext);
  const [isAnimated,setIsAnimated]=useState(false);

  useEffect(()=>{
    const fetchArticleData=async (article_id)=>{
      try{
        const res=await fetch(`http://localhost:3000/api/articles/${article_id}`);
        if(!res) throw new Error('Error happened when fetching the article page content');
        const resJson=await res.json();
        if(resJson.found){
          setArticle(resJson.article);
          setComments(resJson.comments);
          setLikes(resJson.article?.likes);
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
  },[article]);

  const handleNewComment=()=>{
    console.log('hello');
  }

  return(
    <div className="flex flex-col items-center justify-start min-h-[50vh] w-full space-y-4">
      {/* cover */}
      <img className=" w-full [aspect-ratio:30/12]" style={{
        objectFit:'cover'
      }} src={article.cover?.link} alt="article cover" />

      {/* Title */}
      <section className="text-5xl font-bold [text-transform:capitalize] italic">
        {article.title}
      </section>

      {/* article content */}
      <section className="w-full px-2 ">
        <span className="text-[.7rem] text-neutral-400 [text-transform:capitalize]">{new Date(article.createdAt).toLocaleDateString('fr-FR',{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</span>
        <div className="w-full ![font-family:Noto Sans, sans-serif] !text-[1rem] !border-none" ref={editorRef}></div>
      </section>

      {/* comment section */}
      <section className="w-full mt-2 p-1 border-t-2 border-fuchsia-400">
        {/* Check if the user is authenticated */}
        {!isAuthenticated&&
        <span onAnimationEnd={()=>{setIsAnimated(false)}} className={`italic text-sm bg-yellow-400 w-full h-fit block p-2 ${isAnimated&&'shake-div'}`}>Connectez-vous à votre compte pour pouvoir liker et commenter</span>}
        {/* likes & comments */}
        <div className="flex items-center space-x-2">
          {/* likes number */}
          <div className="w-fit flex items-center">
            <span className="font-bold">{likes.length}</span>
            <div onClick={()=>{isAuthenticated?setIsLiked(prev=>!prev):setIsAnimated(true)}} className="cursor-pointer h-full grid content-center">
              <span className="material-symbols-outlined text-fuchsia-400 !text-[2rem]" style={{'--FILL':isLiked?1:0}}>
                favorite
              </span>
            </div>
          </div>

          {/* comments number */}
          <div className="w-fit flex items-center">
            <span className="font-bold">{comments.length}</span>
            <div className="cursor-pointer h-full grid content-center">
              <span className="material-symbols-outlined text-fuchsia-400 !text-[2rem]">
                comment
              </span>
            </div>
          </div>
        </div>

        {/* posted comments */}
        <div className="p-2 w-full flex flex-col items-start justify-start space-y-4">
        {
          comments.map((comment,index)=>(
            <div className="w-9/10 flex flex-col" key={index}>
              <div className="w-full min-h-15 max-h-40 h-auto flex items-start justify-evenly">
                <img className="w-1/10 [aspect-ratio:1/1] rounded-full" src={comment.picture} alt="author_profile_picture" />
                <span className="w-8/10 h-full py-1 px-2 bg-purple-100 rounded-lg">{comment.content}</span>
              </div>
              <div className="w-95/100 flex items-center space-x-2 justify-end">
                <div className="flex items-center">
                  <span className="font-bold text-[.9rem]">0</span>
                  <span className="material-symbols-outlined !text-[1rem] !text-purple-400">favorite</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-[.9rem]">0</span>
                  <span className="material-symbols-outlined !text-[1rem] !text-purple-400">reply_all</span>
                </div>
              </div>
            </div>
          ))
        }
        </div>
      </section>

      {/* Laisser un commentaire */}
      <section className={`w-full px-2 ${isAuthenticated?'opacity-100':'opacity-30'}`}>
        <form action={handleNewComment} className="flex flex-col items-center space-y-2">
          <textarea 
          className="w-full h-30 px-2 py-1 rounded-2xl outline-none ring-1 ring-fuchsia-900 focus:ring-fuchsia-400 focus:ring-3 transition-all ease duration-200" 
          name="newComment" id="newComment" 
          placeholder="Ajouter un commentaire..." disabled={isAuthenticated?false:true}></textarea>
          <button className={`px-4 py-2 bg-linear-to-r from-fuchsia-400 to-purple-500 text-white rounded-lg ${isAuthenticated&& `${isPressed?'scale-97':'shadow-md shadow-neutral-700'}`} transition-all ease duration-200 flex items-center space-x-1`}
          onMouseUp={()=>{setIsPressed(false)}}
          onMouseDown={()=>{setIsPressed(true)}}
          onTouchStart={()=>{setIsPressed(true)}}
          onTouchEnd={()=>{setIsPressed(false)}}>
            <span>Envoyer</span>
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </section>
    </div>
  );
}
export default ReadArticlePage;