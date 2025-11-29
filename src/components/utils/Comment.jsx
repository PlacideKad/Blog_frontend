import { useState , useEffect , useContext} from "react";
import { GlobalAppContext } from "../App";

const Comment=({comment_, setIsAnimated_})=>{
  const [isLiked,setIsLiked]=useState(false);
  const [likes,setLikes]=useState(comment_?.likes);
  const {user, isAuthenticated , backendURL}=useContext(GlobalAppContext);

  useEffect(()=>{
    if(user){
      if(comment_?.likes?.includes(user._id)) setIsLiked(true);
    }else setIsLiked(false);
  },[user]);

  const handleNewLike=async ()=>{
    setIsLiked(isLiked?false:true);
    if(isAuthenticated && !user?.blocked){
      try{
        const res=await fetch(`${backendURL}/comments/${comment_?._id}`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({id:user?._id})
        });
        const resJson=await res.json();
        setIsLiked(resJson.userLiked);
        setLikes(resJson.likes);
      }catch(err){
        console.log(err);
      }
    }else setIsAnimated_(true)
  }

  return(
    <div className="comment-container min-h-[60px] w-fit max-w-[9/10] md:max-w-250">
      <div className="name-zone text-[.7rem] text-neutral-400 italic">{comment_?.author_infos?.given_name} {comment_?.author_infos?.family_name}</div>
      <div className=" profile-picture-zone flex flex-col items-center justify-start py-2 ">
        <img className="w-full [aspect-ratio:1/1] rounded-full" src={comment_?.author_infos?.picture} alt="author_profile_picture" />
      </div>
      <div className="comment-zone bg-fuchsia-100 px-4 py-2 rounded-lg flex flex-col">{comment_?.content?.split('\n').map(
        (line,n_line)=>(<span key={n_line}>{line?line:<div className="h-2 w-full"></div>}</span>)
      )}
      </div>
      <div className="like-zone flex items-center justify-end md:justify-start gap-5">
        <div className="flex items-center">
          <span className="font-bold text-[.9rem]">{likes?.length||0}</span>
          <span 
          onClick={async()=>{await handleNewLike(comment_?._id)}}
          className="material-symbols-outlined text-fuchsia-400 !text-[1rem] cursor-pointer" style={{'--FILL':isLiked?1:0}}>
            favorite
          </span>
        </div>

        {/* Reply to other people comments later */}
        {/* <div className="flex items-center">
          <span className="font-bold text-[.9rem]">0</span>
          <span className="material-symbols-outlined !text-[1rem] !text-purple-400">reply_all</span>
        </div> */}
      </div>
    </div>
  );
}
export default Comment;