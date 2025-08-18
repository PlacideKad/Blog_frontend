import { useEffect, useRef , useState ,useContext} from "react";
import { AuthenticatedContext } from "./App";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const AdminCreateArticlePage=()=>{
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [title,setTitle]=useState('');
  const [subtitle,setSubtitle]=useState('');
  const [isReadyToSubmit,setIsReadyToSubmit]=useState(false);
  const [isPressed,setIsPressed]=useState(false);
  const {backendURL}=useContext(AuthenticatedContext);
  useEffect(()=>{
    const options={
      modules:{
        toolbar:true
      },
      placeholder:'Redigez votre article ici...',
      theme:'snow'
    };
    if(!quillInstance.current && editorRef.current){
      quillInstance.current=new Quill(editorRef.current,options)
    }
  },[]);
  useEffect(()=>{
    if(title.trim() && subtitle.trim()) setIsReadyToSubmit(true);
  },[title,subtitle]);

  const handleSubmit=async (formData)=>{
    if(isReadyToSubmit){
      const title=formData.get('title');
      const subtitle=formData.get('subtitle');
      const delta=quillInstance.current.getContents();
      let data={};
      if(title && title.trim()) data.title=title.trim();
      if(subtitle && subtitle.trim()) data.summary=subtitle.trim();
      data.content=JSON.stringify(delta);
      try{
        const res=await fetch(`${backendURL}/admin/article`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(data)
        });
        if(!res.ok) throw new Error('Error when publishing the article');
        const resJson=await res.json();
        if(resJson.success) window.location.reload();
      }catch(err){
        console.log(err);
      }
    }
  }
  return(
    <div className="min-h-full w-full md:px-16 lg:px-24 pt-8">

      {/* nota */}
      <section className="text-neutral-400 text-[.8rem]">
        Les champs marqués de ( <span className="text-red-500">*</span> ) sont obligatoires.
      </section>

      {/* formulaire */}
      <form action={handleSubmit}
      className="w-full min-h-full flex flex-col items-center justify-start space-y-4 mt-2">

        {/* titre */}
        <div className="w-full flex space-x-2 items-center justify-between">
          <label 
          className="w-min  font-extrabold text-xl text-nowrap"
          htmlFor="title">Titre <span className="text-[.8rem] text-red-500">*</span>
          </label>
          <input 
          type="text" 
          id="title"
          name="title"
          value={title}
          onChange={(event)=>{setTitle(event.target.value)}}
          className="grow-1 max-w-7/10 ring-fuchsia-500 ring-2 rounded-md outline-none px-4 py-1 focus:ring-4 transition-all ease duration-200"
          placeholder="" />
        </div>

        {/* Sous-titre */}
        <div className="w-full flex items-center justify-between space-x-2">
          <label 
          className="w-min font-extrabold text-xl text-nowrap"
          htmlFor="subtitle">Sous-Titre <span className="text-[.8rem] text-red-500">*</span>
          </label>
          <input 
          type="text" 
          id="subtitle"
          name="subtitle"
          value={subtitle}
          onChange={(event)=>{setSubtitle(event.target.value)}}
          className=" grow-1 max-w-7/10 ring-fuchsia-500 ring-2 rounded-md outline-none px-4 py-1 focus:ring-4 transition-all ease duration-200"
          placeholder="" />
        </div>

        {/* pieces jointes */}
        <div>

        </div>

        {/* Article content */}
        <div 
        className="flex flex-col w-full min-h-[70vh]">
          <label 
          className="font-extrabold text-xl"
          htmlFor="content">Article <span className="text-[.8rem] text-red-500">*</span></label>
          <div 
          className="w-full !h-[69vh] !border-2 !border-fuchsia-400 !rounded-b-xl" 
          ref={editorRef}>
          </div>
        </div>
        <button 
        onMouseDown={()=>{setIsPressed(true)}}
        onMouseUp={()=>{setIsPressed(false)}}
        onTouchStart={()=>{setIsPressed(true)}}
        onTouchEnd={()=>{setIsPressed(false)}}
        className={`bg-linear-to-r from-fuchsia-400 to-purple-400 text-gray-50 px-8 py-2 rounded-lg ${!isReadyToSubmit?'opacity-30':isPressed?'scale-97 opacity-100':'shadow-lg opacity-100'}`}
        type="submit">Publier</button>
      </form>
    </div>
  )
}
export default AdminCreateArticlePage;