import { useContext ,useEffect,useState } from "react";
import { WindowSizeContext, AuthenticatedContext } from "./App";
import Title from "./utils/Title";
import { useNavigate } from "react-router-dom";
import ButtonClikable from "./utils/ButtonClikable";

const ProfilePage=()=>{
  const {windowWidth}=useContext(WindowSizeContext);
  const {setIsAuthenticated , user}=useContext(AuthenticatedContext);
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
    setAllowedToSubmit((nameInput!==user.given_name || famNameInput!==user.family_name) && (nameEdited || famNameEdited))
  },[nameInput,famNameInput,nameEdited,famNameEdited])
  const handleDisconnect=async ()=>{
    try{
      const res=await fetch('http://localhost:3000/api/logout',{
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
  const handleSubmitEdits=(formData)=>{
    if(allowedToSubmit){
      const given_name=formData.get('given_name');
      const family_name=formData.get('family_name');
      let data={};
      if(given_name) data.given_name=given_name;
      if(family_name) data.family_name=family_name;
      console.log(data);
    }
  }
  return(
    <div className="absolute 
      w-full h-full
      flex items-center justify-center p-4
      bg-purple-50">
      <div className="w-full h-6/10 flex flex-col items-center justify-evenly">
        <div 
        id="profile-picture" 
        className="w-2/5 [aspect-ratio:1/1] rounded-full bg-purple-300 flex items-center justify-center">
          <img
            className="w-9/10 [aspect-ratio:1/1] rounded-full object-cover"
            src={user.picture && `http://localhost:3000/api/user/avatar/?url=${user.picture}`}
            alt="profile picture"
          />
        </div>
        <span className="text-sm text-neutral-400 w-9/10">
          Créé le {new Date(user.createdAt).toLocaleDateString('fr-FR',{year:'numeric',month:'short',day:'numeric'})}
        </span>
        <div className="flex items-center justify-between w-9/10">
          <span className="text-sm text-neutral-400 w-3/10">E-mail</span>
          <span className="text-neutral-600 w-7/10">{user.email}</span>
        </div>
        <form 
        action={handleSubmitEdits}
        className="w-9/10 [aspect-ratio:2/1] flex flex-col items-center justify-start gap-4"
        >
          <div className="w-full flex items-center justify-between">
            <label 
            className="text-sm text-neutral-400 w-3/10"
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
              className="w-8/10 px-2 py-1 border-b-2 border-b-purple-400 outline-none focus:scale-103 transition-all ease duration-300" />:
              <div className="w-8/10 [aspect-ratio:100/18] px-2 py-1 rounded-lg outline-none ring-2 ring-purple-400">
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
            className="text-sm text-neutral-400 w-3/10"
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
              className="w-8/10 px-2 py-1 border-b-2 border-b-purple-400 outline-none focus:scale-103 transition-all ease duration-300" />:
              <div className="w-8/10 [aspect-ratio:100/18] px-2 py-1 rounded-lg outline-none ring-2 ring-purple-400">
                {user.family_name}
              </div>
            }
              <ButtonClikable 
              onclick={()=>{setFamNameEdited(prev=>{
                return !prev})}}
              p_style="w-15/100 [aspect-ratio:1/1] flex items-center justify-center rounded-md"
              content={<span className="material-symbols-outlined">{famNameEdited?'close':'edit'}</span>}
              color={famNameEdited && 'bg-red-400'}
              />
            </div>
          </div>


          <input type="submit" 
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className={`cursor-pointer bg-purple-400  text-white transition-all ease duration-200 px-4 py-2 rounded-md ${(nameEdited || famNameEdited)?'scale-100':'scale-0'} ${!allowedToSubmit?'opacity-40':isPressed?'opacity-100 scale-98':`opacity-100 shadow-md shadow-black`}`}
          value='Confirmer'/>
        </form>
      </div>


      <div className="absolute top-0 left-0 w-full flex items-center justify-between ">
        <Title windowWidth={windowWidth}/>
        <div onClick={handleDisconnect}
        className="flex items-center justify-evenly cursor-pointer">
          <span className="text-[.9rem]">Se deconnecter</span>
          <span className="material-symbols-outlined m-2 ![font-size:2rem] text-purple-400">logout</span>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage