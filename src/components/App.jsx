import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import { useState , createContext } from "react";
import LandingPage from "./LandingPage";
import MissingPage from "./MissingPage";
import ArticlesPage from "./ArticlesPage";
import AboutPage from "./AboutPage";
import AdminDashboard from "./AdminDashboard";

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

  name:'Thème'},{

  name:'A Propos',
  link:'/about',
  icon:'info',
  active:false}
];

const NavbarButtonsContext=createContext()
const App=()=>{
  const [buttons,setButtons]=useState(navbar_buttons);
  return(
    <Router>
      <NavbarButtonsContext.Provider value={{buttons,setButtons,handleButtonActive}}>
        <Navbar/>
        <Routes>
            <Route path="*" element={<MissingPage/>}></Route>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="/home" element={<LandingPage/>}></Route>
            <Route path="/articles" element={<ArticlesPage/>}></Route>
            <Route path="/dashboard" element={<AdminDashboard/>}></Route>
            <Route path="/about" element={<AboutPage/>}></Route>
        </Routes>
      </NavbarButtonsContext.Provider>
    </Router>
  );
}
export default App;
export {NavbarButtonsContext};