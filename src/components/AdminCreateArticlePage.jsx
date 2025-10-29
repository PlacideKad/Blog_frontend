import { useEffect, useRef , useState ,useContext} from "react";
import { GlobalAppContext } from "./App";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import AttachedFiles from "./utils/AttachedFiles";
import Cover from './utils/Cover';
import ErrorPopup from "./utils/ErrorPopup";
import Loader from "./utils/Loader";

const AdminCreateArticlePage=()=>{
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [title,setTitle]=useState('');
  const [subtitle,setSubtitle]=useState('');
  const [isReadyToSubmit,setIsReadyToSubmit]=useState(false);
  const [isPressed,setIsPressed]=useState(false);
  const [isSavePressed,setIsSavePressed]=useState(false);
  const {backendURL,defaultCover}=useContext(GlobalAppContext);
  const [coverLink,setCoverLink]=useState(null);
  const [attachedFiles,setAttachedFiles]=useState([]);
  const [coversArray,setCoversArray]=useState([]);
  const [errorMessage,setErrorMessage]=useState(null);
  const [isLoading, setIsLoading]=useState(false);
  const [isSaveState,setIsSaveState]=useState(null);
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
    setIsReadyToSubmit(
    title.trim()?.length>=3 &&
    subtitle.trim()?.length>=3) ;
  },[title,subtitle]);
  const handleSubmit=async (formData, saveArticle=false)=>{
    if(!isLoading){
      setIsSaveState(saveArticle);
      const title=formData.get('title');
      const subtitle=formData.get('subtitle');
      const delta=quillInstance.current.getContents();
      let data={};
      if(title && title.trim()) data.title=title.trim();
      if(subtitle && subtitle.trim()) data.summary=subtitle.trim();
      if(coverLink) data.cover={link:coverLink};
      if(coversArray.length>0) data.coversArray=coversArray;
      if(attachedFiles.length>0) data.related_files=attachedFiles;
      data.content=JSON.stringify(delta);
      setIsLoading(true);
      if(!saveArticle){
        if(isReadyToSubmit)try{
          const res=await fetch(`${backendURL}/admin/article`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
          });
          if(!res.ok) throw new Error('Error when publishing the article');
          const resJson=await res.json();
          setTimeout(()=>{setIsLoading(false);},50000)
          if(resJson.success) window.location.reload();
        }catch(err){
          console.log(err);
          setErrorMessage(err.message);
          setTimeout(()=>{setIsLoading(false);},50000)
        }
      }else{
        try{
          const res=await fetch(`${backendURL}/admin/stash`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
          });
          if(!res.ok) throw new Error('Error when saving the article');
          const resJson=await res.json();
          setTimeout(()=>{setIsLoading(false);},50000);
          if(resJson.success) window.location.reload();
        }catch(err){
          console.log(err);
          setErrorMessage(err.message);
          setTimeout(()=>{setIsLoading(false);},50000);
        }
      }
    }
  }
  return(
    <div className="h-full w-full">
      <ErrorPopup
      message_={errorMessage}
      showState_={errorMessage?true:false}
      onCloseCallback_={()=>setErrorMessage(null)}/>
      {/* nota */}
      <section className="text-neutral-400 text-[.8rem]">
        Les champs marqués de ( <span className="text-red-500">*</span> ) sont obligatoires.
      </section>

      {/* formulaire */}
      <form 
      onSubmit={async(e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        const clickedButton=e.nativeEvent.submitter;
        const isSave=clickedButton?.name==='save';
        await handleSubmit(formData,isSave);
      }}
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

        {/* couverture */}
        <Cover
        coverLink_={coverLink || defaultCover}
        setCoverLink_={setCoverLink}
        defaultCover_={defaultCover}
        setCoversArray_={setCoversArray}/>

        {/* pieces jointes */}
        <AttachedFiles
        attachedFiles_={attachedFiles}
        setAttachedFiles_={setAttachedFiles}
        fromStash_={false}
        fromEdit_={false}/>
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
        <div className="flex flex-col md: md:flex-row md:justify-evenly space-y-2 items-center justify-evenly w-full md:mb-15 mb-6">
          <button 
          onMouseDown={()=>{setIsPressed(true)}}
          onMouseUp={()=>{setIsPressed(false)}}
          onTouchStart={()=>{setIsPressed(true)}}
          onTouchEnd={()=>{setIsPressed(false)}}
          className={`bg-linear-to-r transition-all ease duration-200  flex items-center justify-evenly from-fuchsia-400 to-purple-400 text-gray-50 px-8 py-2 rounded-lg ${!isReadyToSubmit?'opacity-30':isPressed?'scale-97 cursor-pointer opacity-100':'shadow-lg cursor-pointer opacity-100'}`}
          type="submit"
          name="publish">
          {(isLoading && !isSaveState)?(
            <Loader
            message_=""
            style_="w-full h-full"/>):
            <>
              <span>Publier</span>
              <span className="material-symbols-outlined">ios_share</span>
            </>
          }
          </button>
          <button 
          onMouseDown={()=>{setIsSavePressed(true)}}
          onMouseUp={()=>{setIsSavePressed(false)}}
          onTouchStart={()=>{setIsSavePressed(true)}}
          onTouchEnd={()=>{setIsSavePressed(false)}}
          type="submit"
          name="save"
          className={`px-4 py-2 transition-all ease duration-200 flex items-center justify-evenly rounded-lg ring-2 ring-purple-400 ${isSavePressed?'scale-97 cursor-pointer':'shadow-lg cursor-pointer'} opacity-100`}>
          {(isLoading && isSaveState)?(
            <Loader
            message_=""
            style_="w-full h-full"/>):
            <>
              <span className="material-symbols-outlined">archive</span>
              <span>Enregistrer</span>
            </>
          }
          </button>
        </div>
      </form>
    </div>
  )
}
export default AdminCreateArticlePage;