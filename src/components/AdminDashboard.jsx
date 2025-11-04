import { useState , useContext } from "react";
import Title from "./utils/Title";
import AdminPublishedArticlesPage from "./AdminPublishedArticlesPage";
import AdminCreateArticlePage from "./AdminCreateArticlePage";
import AdminCommunityPage from './AdminCommunityPage';
import { GlobalAppContext } from "./App";

const AdminDashboard=()=>{
  const {handleChangeAdminPage, adminDashboardButtons}=useContext(GlobalAppContext);
  return(
    <div className="min-h-full w-full p-2 bg-fuchsia-50 text-gray-900 items-center justify-center relative z-0">
      {/* * title */}
      <section className="absolute top-0 left-0">
        <Title windowWidth={window.innerWidth}/>
      </section>
      {/** menu */}
      <div className="fixed left-1/2 top-[8vh] transform -translate-x-1/2 w-1/2 h-10">
        <section className="floating-bar relative bg-transparent flex items-center justify-evenly h-full w-full rounded-md shadow-sm shadow-neutral-400 overflow-hidden">
          {adminDashboardButtons.map((button)=>(
            <div key={button.key}  
            className={`[&>span]:!text-[2rem] cursor-pointer [&>span]:!text-purple-900 h-full w-1/3 flex items-center justify-center ${button.selected?'bg-[rgb(237,165,255,1)]':'bg-transparent'} transition-all ease duration-300`} 
            onClick={()=>handleChangeAdminPage(button.key)}>
              <span
              className="material-symbols-outlined">{button.name}</span>
            </div>
          ))}
        </section>
      </div>
      <div className={`min-h-full w-full md:px-16 ${adminDashboardButtons.find(button=>button.selected).key===1?'lg:px-14':'lg:px-24'} mt-[10vh] pt-8 flex flex-col items-center justify-start -z-1 relative`}>
        <section>
          <h1 className="text-3xl font-extrabold mb-5 text-purple-400 [text-transform:upperCase]">Tableau de bord Admins</h1>
        </section>
        <div className="relative w-full">
          {adminDashboardButtons.find(button=> button.selected).element}
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;