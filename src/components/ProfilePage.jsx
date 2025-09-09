import { useContext ,useEffect,useState } from "react";
import { GlobalAppContext } from "./App";
import Title from "./utils/Title";
import { useNavigate } from "react-router-dom";
import ButtonClikable from "./utils/ButtonClikable";
import CloudinaryUploadWidget from "./utils/CloudinaryUploadWidget";

const ProfilePage=()=>{
  const {
    setIsAuthenticated,
    user,
    setUser,
    backendURL,
    windowWidth}=useContext(GlobalAppContext);
  const [nameEdited,setNameEdited]=useState(false);
  const [nameInput,setNameInput]=useState('');
  const [famNameInput,setFamNameInput]=useState('');
  const [famNameEdited,setFamNameEdited]=useState(false);
  const [allowedToSubmit,setAllowedToSubmit]=useState(false);
  const [isPressed,setIsPressed]=useState(false);

  const navigate=useNavigate();
  const handleMouseDown=()=>{
    setIsPressed(true);
  }
  const handleMouseUp=()=>{
    setIsPressed(false);
  }
  useEffect(()=>{
    if(user.given_name) setNameInput(user.given_name);
    if(user.family_name) setFamNameInput(user.family_name);
  },[user.given_name,user.family_name]);
  useEffect(()=>{
    setAllowedToSubmit((nameInput.trim()!==user.given_name || famNameInput.trim()!==user.family_name) && (nameEdited || famNameEdited))
  },[nameInput,famNameInput,nameEdited,famNameEdited])
  const handleDisconnect=async ()=>{
    try{
      const res=await fetch(`${backendURL}/logout`,{
        method:'GET',
        credentials:'include'
      });
      if(!res.ok) throw new Error('Error occured when disconnecting');
      const resJson=await res.json();
      if(resJson.disconnected) setIsAuthenticated(false);
      navigate('/home');
    }catch(err){
      console.log(err);
    }
  };
  const handleSubmitEdits=async (formData)=>{
    if(allowedToSubmit){
      const given_name=formData.get('given_name');
      const family_name=formData.get('family_name');
      let data={};
      if(given_name && given_name.trim()) data.given_name=given_name.trim();
      if(family_name && family_name.trim()) data.family_name=family_name.trim();
      try{
        const res=await fetch(`${backendURL}/user/updateinfos`,{
          method:'PATCH',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({...data,id:user.id})
        });
        if(!res.ok) throw new Error('Error on update');
        const resJson=await res.json();
        setUser(resJson.user);
        if(resJson.updated) window.location.reload();
      }catch(err){
        console.log(err);
      }
    }
  }
  return(
    <div className="absolute 
      w-full h-full
      flex items-center justify-center p-4
      bg-fuchsia-50">
      {Object.keys(user).length!==0?
      <div className="w-full !max-w-[1400px] h-6/10 lg:h-8/10 lg:flex-row flex flex-col items-center justify-evenly lg:justify-center lg:gap-8">
        <div 
        id="profile-picture" 
        className="w-2/5 min-w-[150px] max-w-[270px] [aspect-ratio:1/1] rounded-full sm:rounded-4xl bg-fuchsia-400 flex items-center justify-center relative">
          <img
            className="w-9/10 sm:w-95/100 [aspect-ratio:1/1] rounded-full sm:rounded-4xl object-cover "
            src={user.picture && `${backendURL}/user/avatar/?url=${user.picture}`}
            alt="profile picture"
          />
          <CloudinaryUploadWidget
          className_="[width:clamp(10px,21%,40px)] [aspect-ratio:1/1] bg-linear-to-r from-fuchsia-400 to-purple-400 flex items-center justify-center rounded-full absolute bottom-0 right-0 text-white cursor-pointer shadow-md shadow-neutral-900"
          child_={<span className="material-symbols-outlined !text-[1.1rem]">edit</span>}/>
        </div>
        <form 
        action={handleSubmitEdits}
        className="w-9/10 lg:w-1/3 lg:h-1/3 sm:w-6/10 sm:text-xl [aspect-ratio:2/1] flex flex-col items-center justify-center gap-4"
        >
          <span className="text-sm sm:text-lg text-neutral-400 w-full">
            Créé le {new Date(user.createdAt).toLocaleDateString('fr-FR',{year:'numeric',month:'short',day:'numeric'})}
          </span>
          <div className="flex items-center justify-between w-full">
            <span className="text-sm sm:text-lg text-neutral-400 w-3/10">E-mail</span>
            <span className="text-neutral-600 w-7/10">{user.email}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <label 
            className="text-sm sm:text-lg text-neutral-400 w-3/10"
            htmlFor="name">
              Prénom
            </label>
            <div className="flex items-center justify-between w-7/10">
            {nameEdited?
              <input 
              type="text" 
              id="name"
              name="given_name"
              value={nameInput}
              onChange={(event)=>{
                setNameInput(event.target.value)}}
              className="w-8/10 px-2 py-1 border-b-2 border-b-fuchsia-400 outline-none focus:scale-103 transition-all ease duration-300" />:
              <div className="w-8/10 [aspect-ratio:100/18] px-2 py-1 rounded-lg outline-none ring-2 ring-fuchsia-400 flex items-center justify-start">
                {user.given_name}
              </div>
            }
              <ButtonClikable 
              onclick={()=>{setNameEdited(prev=>{
                return !prev})}}
              p_style="w-15/100 [aspect-ratio:1/1] flex items-center justify-center rounded-md"
              content={<span className="material-symbols-outlined">{nameEdited?'close':'edit'}</span>}
              color={nameEdited && 'bg-red-400'}/>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <label 
            className="text-sm sm:text-lg text-neutral-400 w-3/10"
            htmlFor="family_name">
              Nom
            </label>
            <div className="flex items-center justify-between w-7/10">
            {famNameEdited?
              <input 
              type="text" 
              id="family_name"
              name="family_name"
              value={famNameInput}
              onChange={(event)=>{
                setFamNameInput(event.target.value)}}
              className="w-8/10 px-2 py-1 border-b-2 border-b-fuchsia-400 outline-none focus:scale-103 transition-all ease duration-300" />:
              <div className="w-8/10 [aspect-ratio:100/18] px-2 py-1 rounded-lg outline-none ring-2 ring-fuchsia-400 flex items-center justify-start">
                {user.family_name}
              </div>
            }
              <ButtonClikable 
              onclick={()=>{setFamNameEdited(prev=>{
                return !prev})}}
              p_style="w-15/100 [aspect-ratio:1/1] flex items-center justify-center rounded-md"
              content={<span className="material-symbols-outlined">{famNameEdited?'close':'edit'}</span>}
              color={famNameEdited && 'bg-red-400'}/>
            </div>
          </div>

          <input type="submit" 
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className={`cursor-pointer bg-fuchsia-400  text-white transition-all ease duration-200 px-4 py-2 sm:px-8 sm:py-4 sm:rounded-2xl rounded-md ${(nameEdited || famNameEdited)?'scale-100':'scale-0'} ${!allowedToSubmit?'opacity-40':isPressed?'opacity-100 scale-98':`opacity-100 shadow-md shadow-black`}`}
          value='Confirmer'/>
        </form>
      </div>:
      <div>
        Please Login to your account
      </div>
      }


      <div className="absolute sm:text-xl top-0 left-0 w-full flex items-center justify-between ">
        <Title windowWidth={windowWidth}/>
        {Object.keys(user).length!==0?
        <div onClick={handleDisconnect}
        className="flex items-center justify-evenly cursor-pointer">
          <span className="text-[.9rem] md:text-xl">Se deconnecter</span>
          <span className="material-symbols-outlined m-2 ![font-size:2rem] !md:[font-size:2.5rem] text-fuchsia-400">logout</span>
        </div>:
        <ButtonClikable
          content='Se connecter'
          onclick={()=>{navigate('/login')}}
          p_style='p-2 mx-1 rounded-md'
        />
        }
      </div>
    </div>
  );
}
export default ProfilePage