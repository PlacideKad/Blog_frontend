import { useEffect, useRef , useState ,useContext} from "react";
import { useLocation ,useNavigate } from "react-router-dom";
import { GlobalAppContext } from "./App";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import Title from "./utils/Title";
import AttachedFiles from "./utils/AttachedFiles";
import Cover from "./utils/Cover";
import ErrorPopup from "./utils/ErrorPopup";
import Loader from "./utils/Loader";

const AdminEditStashPage=()=>{
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [title,setTitle]=useState('');
  const [subtitle,setSubtitle]=useState('');
  const [coverLink,setCoverLink]=useState(null);
  const [attachedFiles,setAttachedFiles]=useState([]);
  const [errorMessage,setErrorMessage]=useState(null);
  const [isLoadingOnSubmit, setIsLoadingOnSubmit]=useState(false);
  const [isLoading, setIsLoading]=useState(true);
  const [isSaveState,setIsSaveState]=useState(null);
  const [isReadyToSubmit,setIsReadyToSubmit]=useState(false);
  const [isPressed,setIsPressed]=useState(false);
  const [isSavePressed,setIsSavePressed]=useState(false);
  const [coversArray,setCoversArray]=useState([]);
  const {backendURL , defaultCover, user}=useContext(GlobalAppContext);
  const id=useLocation().pathname.split('/')[3];
  const navigate=useNavigate();

  useEffect(()=>{
    const options={
      modules:{
        toolbar:true
      },
      placeholder:'Redigez votre article ici...',
      theme:'snow'
    };

    const getStashContent=async ()=>{
      try{
        const res=await fetch(`${backendURL}/admin/stashes/${id}`);
        if(!res.ok) throw new Error('Error occured when fetching the stashed data');
        const {stash}=await res.json();
        setTitle(stash.title);
        setSubtitle(stash.summary);
        setCoverLink(stash.cover.link);
        setAttachedFiles(stash.related_files || []);
        if(!quillInstance.current && editorRef.current){
          quillInstance.current=new Quill(editorRef.current,options);
          quillInstance.current.setContents(JSON.parse(stash.content));
        }
      }catch(err){
        console.log(err);
        setErrorMessage(err.message);
      }finally {setIsLoading(false)};
    }
    (async()=>{await getStashContent()})();
  },[]);

  useEffect(()=>{
    setIsReadyToSubmit(
    title?.trim()?.length>=3 &&
    subtitle?.trim()?.length>=3) ;
  },[title,subtitle]);


  const handleSubmit=async (formData, saveArticle=false)=>{
    if(!isLoadingOnSubmit){
      setIsSaveState(saveArticle);
      const title=formData.get('title');
      const subtitle=formData.get('subtitle');
      const delta=quillInstance.current.getContents();
      let data={stash_id:id, admin_id:user._id};
      if(title && title.trim()) data.title=title.trim();
      if(subtitle && subtitle.trim()) data.summary=subtitle.trim();
      if(coverLink) data.cover={link:coverLink};
      if(coversArray.length>0) data.coversArray=coversArray;
      if(attachedFiles.length>0) data.related_files=attachedFiles;
      setIsLoadingOnSubmit(true);
      data.content=JSON.stringify(delta);
      if(!saveArticle){
        if(isReadyToSubmit){
          try{
            const res=await fetch(`${backendURL}/admin/article`,{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify(data)
            });
            if(!res.ok) throw new Error('Error when publishing the article');
            const resJson=await res.json();
            setIsLoadingOnSubmit(false);
            if(resJson.success) navigate('/dashboard');
          }catch(err){
            console.log(err);
            setErrorMessage(errorMessage);
            setIsLoadingOnSubmit(false);
          }
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
          setIsLoadingOnSubmit(false);
          if(resJson.success) navigate('/dashboard');
        }catch(err){
          console.log(err);
          setErrorMessage(err.message);
          setIsLoadingOnSubmit(false);
        }
      }
    }
  }
  return(
    <div className="h-full w-full flex flex-col items-center justify-start">
      <ErrorPopup
      message_={errorMessage}
      showState_={errorMessage?true:false}
      onCloseCallback_={()=>setErrorMessage(null)}/>

      {/* * title */}
      <section className="absolute top-0 left-0">
        <Title windowWidth={window.innerWidth}/>
      </section>
      {isLoading?
      <Loader
      message_="Chargement de l'article..."
      style_="w-full h-[100vh]"/>:
      <>
        <div className="mt-[15vh] px-4 md:w-8/10">
          <section className="text-neutral-400 text-[.8rem]">
            Les champs marqués de ( <span className="text-red-500">*</span> ) sont obligatoires.
          </section>

          {/* formulaire */}
          <form
          onSubmit={async (e)=>{
            e.preventDefault();
            const formData=new FormData(e.target);
            const clickedButton=e.nativeEvent.submitter;
            const isSave=clickedButton?.name==='save';
            await handleSubmit(formData, isSave);
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
          coverLink_={coverLink}
          setCoverLink_={setCoverLink}
          defaultCover_={defaultCover}
          setCoversArray_={setCoversArray}/>

          {/* pieces jointes */}
          <AttachedFiles
          attachedFiles_={attachedFiles}
          setAttachedFiles_={setAttachedFiles}
          pageId_={id}
          fromStash_={true}
          fromEdit_={true}/>

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
              {(isLoadingOnSubmit && !isSaveState)?(
                <Loader
                message_=""
                style_=""
                h_="h-6"
                w_="w-6"
                border_="border-2"/>):
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
              className={`px-4 py-2 flex transition-all ease duration-200 items-center justify-evenly rounded-lg ring-2 ring-purple-400 ${isSavePressed?'scale-97 cursor-pointer opacity-100':'shadow-lg cursor-pointer opacity-100'}`}>
              {(isLoadingOnSubmit && isSaveState)?(
                <Loader
                message_=""
                style_=""
                h_="h-6"
                w_="w-6"
                border_="border-2"/>):
                <>
                  <span className="material-symbols-outlined">archive</span>
                  <span>Enregistrer</span>
                </>
              }
              </button>
            </div>
          </form>
        </div>
      </>
      }
    </div>
  )
}
export default AdminEditStashPage;