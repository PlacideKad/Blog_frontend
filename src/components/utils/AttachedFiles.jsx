import ButtonClikable from "./ButtonClikable";
import { useState } from "react";
import { getFileColor } from "./getFileColor";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const AttachedFiles=()=>{
  const [attachedFiles, setAttachedFiles]=useState([]);
    return(
        <div className="w-full flex items-center justify-between space-x-2">
          <span className="w-min font-extrabold text-xl text-nowrap">
            Pièces jointes
          </span>
          <div className="grow-1 max-w-7/10 flex items-center justify-start space-x-4">
          {
            attachedFiles.length>0 &&
            <div className="py-1 w-8/10 max-w-100 space-y-3">
            {
              attachedFiles.map(file=>(
                <div className="py-2 relative bg-neutral-100 rounded-2xl shadow shadow-neutral-300">
                  <div className="w-full h-full flex items-center justify-evenly">
                    <span className="h-full w-8/10 italic !text-sm">{file.title}</span>  
                    <div className={`w-fit [aspect-ratio:1/1] p-1 flex items-center justify-center ${getFileColor(file.format).color} text-white font-semibold !text-[.5rem] uppercase`}>{file.format}</div>            
                  </div>
                  <div className="absolute -top-2 -right-2 w-5  [aspect-ratio:1/1] rounded-full shadow shadow-neutral-600 bg-neutral-500 flex items-center justify-center">
                    <span className="material-symbols-outlined !text-white !text-[.8rem]">close</span>
                  </div>
                </div>
              ))
            }
            </div>
          }
            <CloudinaryUploadWidget
            className_="w-5/100 min-w-8 [aspect-ratio:1/1] shadow shadow-sm shadow-neutral-900 flex items-center justify-center rounded-md cursor-pointer bg-linear-to-r from-fuchsia-400 to-purple-400  text-white"
            child_={<span className="material-symbols-outlined">add</span>}
            setAttachedFiles_={setAttachedFiles}/>
          </div>
        </div>
    );
}
export default AttachedFiles