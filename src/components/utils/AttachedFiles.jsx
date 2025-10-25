import { getFileColor } from "./getFileColor";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { GlobalAppContext } from "../App";
import { useContext } from "react";
const AttachedFiles=({attachedFiles_, setAttachedFiles_,pageId_,fromStash_, fromEdit_})=>{
  //fromStash_ can be true or false if it respectively called from editStash or edit article
  //fromEdit will be false only if we call from create new article
  const {backendURL, setDisplayChangedCloudinaryRefresh}=useContext(GlobalAppContext);

  const handleRemoveFile=async (displayName)=>{
    // setAttachedFiles_(prev=>prev.filter(file=>file.display_name!==displayName));
    try{
      const res=await fetch(`${backendURL}/admin/delete/cloudinary/file/${pageId_}`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({related_files:attachedFiles_,display_name_to_delete:displayName,from_stash:fromStash_, from_edit:fromEdit_})
      });
      if(!res.ok) throw new Error('Error while deleting a file from cloudinary');
      const resJson=await res.json();
      let updatedFiles=null;
      if(!fromEdit_) updatedFiles=resJson?.data?.related_files;
      else{
        if(fromStash_) updatedFiles=resJson?.stash?.related_files;
        else updatedFiles=resJson?.article?.related_files;
      }
      setAttachedFiles_(updatedFiles);
      setDisplayChangedCloudinaryRefresh(prev=>!prev);
    }catch(err){
      console.log(err);
    }
  }

  return(
      <div className="w-full flex items-center justify-between space-x-2">
        <span className="w-min font-extrabold text-xl text-nowrap">
          Pièces jointes
        </span>
        <div className="grow-1 max-w-7/10 flex items-center justify-start space-x-4">
        {
          attachedFiles_.length>0 &&
          <div className="py-1 w-8/10 max-w-100 space-y-3">
          {
            attachedFiles_.map((file,key)=>(
              <div key={key} className="py-2 relative bg-neutral-100 rounded-2xl shadow shadow-neutral-300">
                <div className="w-full h-full flex items-center justify-evenly">
                  <span className="h-full w-8/10 italic !text-sm">{`${file.title}.${getFileColor(file.format, file.display_name).extension.toLowerCase()}`}</span>  
                  <div className={`w-fit [aspect-ratio:1/1] p-1 flex items-center justify-center ${getFileColor(file.format, file.display_name).color} text-white font-semibold !text-[.5rem] uppercase`}>{getFileColor(file.format,file.display_name).extension}</div>            
                </div>
                <div className="absolute -top-2 -right-2 w-5  [aspect-ratio:1/1] rounded-full shadow shadow-neutral-600 bg-neutral-500 flex items-center justify-center">
                  <span 
                  onClick={()=>{handleRemoveFile(file.display_name)}}
                  className="material-symbols-outlined !text-white !text-[.8rem] cursor-pointer">close</span>
                </div>
              </div>
            ))
          }
          </div>
        }
          <CloudinaryUploadWidget
          className_="w-5/100 min-w-8 [aspect-ratio:1/1] shadow shadow-sm shadow-neutral-900 flex items-center justify-center rounded-md cursor-pointer bg-linear-to-r from-fuchsia-400 to-purple-400  text-white"
          child_={<span className="material-symbols-outlined">add</span>}
          setAttachedFiles_={setAttachedFiles_}/>
        </div>
      </div>
  );
}
export default AttachedFiles