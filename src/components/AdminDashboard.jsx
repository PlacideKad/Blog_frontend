import { useState } from "react";
import Title from "./utils/Title";
import AdminPublishedArticlesPage from "./AdminPublishedArticlesPage";
import AdminCreateArticlePage from "./AdminCreateArticlePage";
import AdminCommunityPage from './AdminCommunityPage';

const AdminDashboard=()=>{
  const buttons_=[
    {name:'dynamic_feed',selected:true,element:<AdminPublishedArticlesPage/>,key:0},
    {name:'groups',selected:false,element:<AdminCommunityPage/>,key:1},
    {name:'contract_edit',selected:false,element:<AdminCreateArticlePage />,key:2}
  ];
  const [buttons,setbuttons]=useState(buttons_);
  const handleChangeAdminPage=(index)=>{
    let new_buttons=[];
    buttons.forEach(button=>{
      button.key===index?button.selected=true:button.selected=false;
      new_buttons.push(button);
    });
    setbuttons(new_buttons);
  }
  return(
    <div className="min-h-full w-full p-2 bg-fuchsia-50 text-gray-900 items-center justify-center relative z-0">
      {/* * title */}
      <section className="absolute top-0 left-0">
        <Title windowWidth={window.innerWidth}/>
      </section>
      {/** left menu */}
      <div className="fixed left-1/2 top-[8vh] transform -translate-x-1/2 w-1/2 h-10">
        <section className="floating-bar relative bg-transparent flex items-center justify-evenly h-full w-full rounded-md shadow-md shadow-gray-900 overflow-hidden">
          {buttons.map((button,index)=>(
            <div key={index}  className={`[&>span]:!text-[2rem] [&>span]:!text-purple-900 h-full w-1/3 flex items-center justify-center ${button.selected?'bg-fuchsia-200':'bg-transparent'} transition-all ease duration-300`} onClick={()=>handleChangeAdminPage(index)}>
              <span
              className="material-symbols-outlined">{button.name}</span>
            </div>
          ))}
        </section>
      </div>
      <div className="mt-[10vh]">
      {
        buttons.find(button=> button.selected).element
      }
      </div>
    </div>
  );
}
export default AdminDashboard;