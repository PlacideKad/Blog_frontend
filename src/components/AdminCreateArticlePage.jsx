import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const AdminCreateArticlePage=()=>{
  const editorRef = useRef(null);
  const quillInstance = useRef(null);  
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
  const handleSubmit=(formData)=>{
    const delta=quillInstance.current.getContents();
    console.log(delta);
  }
  return(
    <div className="min-h-full w-full pt-8">

      {/* nota */}
      <section className="text-neutral-400 text-[.8rem]">
        Les champs marqués de ( <span className="text-red-500">*</span> ) sont obligatoires.
      </section>

      {/* formulaire */}
      <form action={handleSubmit}
      className="w-full min-h-full flex flex-col items-center justify-start space-y-4 mt-2">

        {/* titre */}
        <div className="w-full flex space-x-2 items-center justify-evenly">
          <label 
          className="w-min  font-extrabold text-xl text-nowrap"
          htmlFor="title">Titre <span className="text-[.8rem] text-red-500">*</span>
          </label>
          <input 
          type="text" 
          id="title"
          className="grow-1 ring-fuchsia-500 ring-2 rounded-md outline-none px-4 py-1 focus:ring-4 transition-all ease duration-200"
          placeholder="" />
        </div>

        {/* Sous-titre */}
        <div className="w-full flex items-center justify-evenly space-x-2">
          <label 
          className="w-min font-extrabold text-xl text-nowrap"
          htmlFor="subtitle">Sous-Titre <span className="text-[.8rem] text-red-500">*</span>
          </label>
          <input 
          type="text" 
          id="subtitle"
          className=" grow-1 ring-fuchsia-500 ring-2 rounded-md outline-none px-4 py-1 focus:ring-4 transition-all ease duration-200"
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
          className="w-full !h-[69vh] !border-2 !border-fuchsia-400 !rounded-b-lg" 
          ref={editorRef}>
          </div>
        </div>
        <button 
        className="bg-linear-to-r from-fuchsia-400 to-purple-400 text-gray-50 px-8 py-2 rounded-lg shadow-md"
        type="submit">Publier</button>
      </form>
    </div>
  )
}
export default AdminCreateArticlePage;