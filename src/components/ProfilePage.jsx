import { useContext } from "react";
import { WindowSizeContext, AuthenticatedContext } from "./App";
import Title from "./utils/Title";
import { useNavigate } from "react-router-dom";

const ProfilePage=()=>{
  const {windowWidth}=useContext(WindowSizeContext);
  const {setIsAuthenticated , user}=useContext(AuthenticatedContext);
  const navigate=useNavigate();

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
  }
  return(
    <div className="absolute 
      w-full h-full
      flex items-center justify-center p-4
      bg-purple-50">
      <div className="w-full h-6/10 bg-purple-400 flex flex-col items-center justify-evenly">
        <div 
        id="profile-picture" 
        className="w-2/5 [aspect-ratio:1/1] rounded-full bg-red-300">
          {/* <img
            className="w-9/10 [aspect-ratio:1/1] rounded-full object-cover"
            src={`http://localhost:3000/api/user/avatar/?url=${user.picture}`}
            alt="profile picture"
          /> */}
        </div>
        <form action="">
          
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