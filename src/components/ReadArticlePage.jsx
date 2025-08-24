import { useLocation , useNavigate} from "react-router-dom";
import { useEffect , useState , useRef , useContext} from "react";
import {GlobalAppContext} from './App';
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
  const {isAuthenticated,user,backendURL}=useContext(GlobalAppContext);
  const [isAnimated,setIsAnimated]=useState(false);
  const [triggerComments,setTriggerComments]=useState(false);

  useEffect(()=>{
    const fetchArticleData=async (article_id)=>{
      try{
        const res=await fetch(`${backendURL}/articles/${article_id}`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:isAuthenticated?JSON.stringify({user_id:user._id}):null
        });
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
  },[triggerComments]);
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
  useEffect(()=>{
    if(comments.length>0){
      console.log(comments);
    }
  },[comments])
  useEffect(()=>{
    if(likes.includes(user._id)) setIsLiked(true);
  },[likes,user]);

  const handleNewComment=async (formData)=>{
    if(isAuthenticated && !user.blocked){
      const content_=formData.get('newComment');
      const content=content_.trim();
      if(content){
        const author_id=user._id;
        const parent_id=id;
        const parentModel='article';
        const data={content,author_id,parent_id,parentModel};
        try{
          const res=await fetch(`${backendURL}/comment`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
          });
          setTriggerComments(prev=>!prev);
        }catch(err){
          console.log(err);
        }
      }
    }
  }
  
  const handleNewLike=async ()=>{
    if(isAuthenticated && !user.blocked){
      try{
        const res=await fetch(`${backendURL}/articles/${id}/like`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({id:user._id})
        });
        const resJson=await res.json();
        setIsLiked(resJson.userLiked);
        setLikes(resJson.likes);
      }catch(err){
        console.log(err);
      }
    }else setIsAnimated(true)
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
      <section className="w-full mt-2 p-1 border-t-2 border-fuchsia-400 relative">
        {/* Check if the user is authenticated */}
        {(!isAuthenticated || user.blocked)&&
        <div onAnimationEnd={()=>{setIsAnimated(false)}} className={`mb-2 italic text-sm w-full md:w-5/10 h-20 rounded-xl flex items-center ${user.blocked?'from-red-400 to-pink-600':'from-purple-400 to-fuchsia-400'} bg-linear-45  text-neutral-100 justify-center p-2 color-animation ${isAnimated&&'shake-div'} shadow shadow-neutral-400`}> 
          {user.blocked?'Vous avez été bloqué par les administrateurs. Vous ne pouvez plus ni commenter , ni liker les articles':'Connectez-vous à votre compte pour pouvoir liker et commenter'}
        </div>}
        {/* likes & comments */}
        <div className="flex items-center space-x-2">
          {/* likes number */}
          <div className="w-fit flex items-center">
            <span className="font-bold">{likes.length}</span>
            <div onClick={handleNewLike} className="cursor-pointer h-full grid content-center">
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
            <div className="comment-container min-h-[60px] w-9/10 md:w-6/10" key={index}>
              <div className="name-zone text-[.7rem] text-neutral-400 italic">{comment.author_infos?.given_name} {comment.author_infos?.family_name}</div>
              <div className=" profile-picture-zone flex flex-col items-center justify-start py-2 ">
                <img className="w-full [aspect-ratio:1/1] rounded-full" src={comment.author_infos?.picture} alt="author_profile_picture" />
              </div>
              <div className="comment-zone bg-fuchsia-100 px-2 py-1 rounded-lg flex flex-col">{comment.content?.split('\n').map(
                (line,n_line)=>(<span key={n_line}>{line?line:<div className="h-2 w-full"></div>}</span>)
              )}
              </div>
              <div className="like-zone flex items-center justify-end md:justify-start gap-5">
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
      <section className={`w-full md:w-6/10 !h-50 px-2 ${(isAuthenticated && !user.blocked)?'opacity-100':'opacity-30'}`}>
        <form action={handleNewComment} className="flex flex-col items-center space-y-2">
          <textarea 

          className="w-full !h-30 px-2 py-1 rounded-2xl outline-none ring-1 ring-fuchsia-900 focus:ring-fuchsia-400 focus:ring-3 transition-all ease duration-200
          [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-fuchsia-100
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:rounded-full 
        [&::-webkit-scrollbar-thumb]:bg-purple-400" 
          name="newComment" id="newComment" 
          placeholder="Ajouter un commentaire..." disabled={(isAuthenticated && !user.blocked)?false:true}></textarea>
          <button className={`px-4 py-2 bg-linear-to-r from-fuchsia-400 to-purple-500 text-white rounded-lg ${(isAuthenticated && !user.blocked)&& `${isPressed?'scale-97':'shadow-md shadow-neutral-700'}`} transition-all ease duration-200 flex items-center space-x-1`}
          onMouseUp={()=>{setIsPressed(false)}}
          onMouseDown={()=>{setIsPressed(true)}}
          onTouchStart={()=>{setIsPressed(true)}}
          onTouchEnd={()=>{setIsPressed(false)}}
          >
            <span>Envoyer</span>
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </section>
    </div>
  );
}
export default ReadArticlePage;