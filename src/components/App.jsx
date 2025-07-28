import { BrowserRouter as Router } from "react-router-dom";
import { useState , createContext } from "react";
import DefaultPage from "./DefaultPage";

import Navbar from "./Navbar";

const handleButtonActive=(buttons_list,index=null)=>{
  `
    This function takes the list of buttons and the index of the active one. 
    It will set as active the button with the index given as parameter and will set all the others to false.
    If no index value is given, all the buttons shall be desactived.
    The function returns a new list with the updated active field.
  `
  let updated_buttons_list=[];
  if((index || index===0) && index!=2){
    buttons_list.forEach((button,id)=>{
      id===index? button.active=true: button.active=false;
      updated_buttons_list.push(button);
    });
  }
  else{
    buttons_list.forEach(button=>{
      button.active=false;
      updated_buttons_list.push(button);
    })
  }

  return updated_buttons_list
}
const navbar_buttons=[{
  name:'Articles',
  link:'/articles',
  icon:'article',
  active:false},{

  name:'Admin',
  icon:'manage_accounts',
  link:'/dashboard',
  active:false},{
    
  name:'A Propos',
  link:'/about',
  icon:'info',
  active:false}
];

const NavbarContext=createContext();
const AuthenticatedContext=createContext();

const App=()=>{
  const [buttons,setButtons]=useState(navbar_buttons);
  const [showSidebar,setShowSidebar]=useState(false);
  const [showNavbar,setShowNavbar]=useState(true);
  const [isAuthenticated,setIsAuthenticated]=useState(false);

  return(
    <Router>
      <AuthenticatedContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
        <NavbarContext.Provider value={{buttons,setButtons,handleButtonActive,showSidebar,setShowSidebar,setShowNavbar}}>
          {showNavbar && <Navbar/>}
          <DefaultPage/>
        </NavbarContext.Provider>
      </AuthenticatedContext.Provider>
    </Router>
  );
}
export default App;
export {NavbarContext,AuthenticatedContext};