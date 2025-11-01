import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { useEffect } from "react";
import { getDisplayNameFromCloudinaryLink } from "./cloudinaryLink";

const Cover=({coverLink_,setCoverLink_,defaultCover_,setCoversArray_,coversArray_})=>{
useEffect(() => {
  if (!coverLink_ || coverLink_ === defaultCover_) return;

  // Ref pour stocker la dernière valeur traitée
  if (!useEffect.lastCover) useEffect.lastCover = null;

  // Empêche les doublons dus au double render
  if (useEffect.lastCover === coverLink_) return;
  useEffect.lastCover = coverLink_;

  setCoversArray_(prev => [
    ...prev,
    getDisplayNameFromCloudinaryLink(coverLink_)
  ]);
}, [coverLink_]);
    return(
        <div className="w-full flex items-center justify-between space-x-2">
            <span className="w-min font-extrabold text-xl text-nowrap">
            Couverture
            </span>
            <div className="grow-1 max-w-7/10 flex items-center justify-start space-x-2">
            <img 
            className="w-8/10 max-w-60 [aspect-ratio:30/12] rounded-xl" 
            style={{objectFit:'cover'}}
            src={coverLink_} 
            alt="" />
            <CloudinaryUploadWidget
            className_={`w-3/100 min-w-8 [aspect-ratio:1/1] flex items-center justify-center rounded-md cursor-pointer bg-linear-to-r from-fuchsia-400 to-purple-400  text-white shadow shadow-neutral-600`}
            child_={<span className="material-symbols-outlined">edit</span>}
            setCover_={setCoverLink_}/>
            </div>
        </div>
    );
}
export default Cover