import { useEffect , useState , useContext } from "react";
import {GlobalAppContext} from "./App";
import SearchBar from "./utils/SearchBar";
import { getUsers } from "./utils/getUsers";

const AdminCommunityPage=()=>{
  const [users,setUsers]=useState([]);
  const [refresh,setRefresh]=useState(false);
  const {backendURL}=useContext(GlobalAppContext);

  useEffect(()=>{
    (async()=>{await getUsers(setUsers,backendURL)})();
  },[refresh]);
  const handleBlockUser=async (user_id,isBlocked)=>{
    try{
      const res=await fetch(`${backendURL}/admin/users/block`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({user_id,isBlocked})
      });
      if(!res.ok) throw new Error('Error while blocking a user');
      const resJson=await res.json();
      if(resJson.success) setRefresh(prev=>!prev);
    }catch(err){
      console.log(err);
    }
  };
  return (
    <div className="w-full h-fit flex flex-col items-start justify-start" >
      <SearchBar 
        placeholder_="Entrer un nom ou une adresse mail"
        setItems_={setUsers}
        resetResearchFunction_={getUsers}
        table_='admin/users'/>
      {
        users.length!==0 ? 
        <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 py-1 space-x-2 space-y-4">
          {
            users.map((user,index)=>(
            <div 
            className=" h-90 relative flex items-center justify-center"
            key={index}>
              <div 
              onClick={()=>{handleBlockUser(user._id,user.blocked)}}
              className={`absolute z-2 cursor-pointer h-10 md:h-13 [aspect-ratio:1/1] -top-3 -right-0 md:-right-3 rounded-full ${user.blocked?'bg-[rgba(231,43,43,0.82)]':'bg-[#ff06f3d1]'} transition-all ease duration-200 flex items-center justify-center`}>
                <span className="material-symbols-outlined !text-[1.5rem] !md:text-[2rem] !text-white">{user.blocked?'lock_person':'lock_open_right'}</span>
              </div>

              <div className="flex flex-col relative overflow-hidden rounded-3xl shadow hover:shadow-xl mx-2 my-8 h-full w-9/10">
                <div className={`${user.blocked?'from-red-400 to-pink-600':'from-fuchsia-400 to-purple-400'} bg-linear-45 h-1/3 transition-all ease duration-200`}></div>

                <div className={`w-2/5 [aspect-ratio:1/1] rounded-full ${user.blocked?'from-red-400 to-pink-600':'from-fuchsia-400 to-purple-400'} bg-linear-45 transition-all ease duration-200 absolute top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center`}>
                  <img 
                  className="h-95/100 w-95/100 [object-fit:cover] rounded-full"
                  src={user.picture && `${backendURL}/user/avatar/?url=${user.picture}`}
                  alt={`${user.given_name}'s profile picture`} />
                </div>

                <div className="bg-white h-2/3 flex flex-col items-center justify-end pb-4">
                  <span className="box flex w-9/10 items-center justify-between"><span className="text-neutral-400 italic">Prénom</span><span>{user.given_name}</span></span>
                  <span className="box flex w-9/10 items-center justify-between"><span className="text-neutral-400 italic">Nom</span><span>{user.family_name}</span></span>
                  <span className="box flex w-9/10 items-center justify-between"><span className="text-neutral-400 italic">Email</span><span>{user.email}</span></span>
                  <span className="box flex w-9/10 items-center justify-between"><span className="text-neutral-400 italic">Crée le</span><span>{new Date(user.createdAt).toLocaleDateString('fr-FR',{year:'numeric',month:"short",day:'numeric'})}</span></span>
                  <span className="box flex w-9/10 items-center justify-between"><span className="text-neutral-400 italic">Modifié le</span><span>{new Date(user.updatedAt).toLocaleDateString('fr-FR',{year:'numeric',month:'short',day:'numeric'})}</span></span>
                </div>
              </div>
            </div>))
          }
        </div>:
        <div className="w-full h-[60vh] flex items-center justify-center">
          No user found
        </div>
      }
    </div>
  );
}
export default AdminCommunityPage;