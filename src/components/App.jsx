import { BrowserRouter as Router } from "react-router-dom";
import { useState , createContext , useEffect} from "react";
import DefaultPage from "./DefaultPage";
import Navbar from "./Navbar";
import ScrollToTop from "./utils/ScrollToTop";

const handleButtonActive=(buttons_list,index=null)=>{
  `
    This function takes the list of buttons and the index of the active one. 
    It will set as active the button with the index given as parameter and will set all the others to false.
    If no index value is given, all the buttons shall be desactived.
    The function returns a new list with the updated active field.
  `
  let updated_buttons_list=[];
  if(index || index===0){
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
    
  name:'A Propos',
  link:'/about',
  icon:'info',
  active:false}
];
const GlobalAppContext=createContext();
const App=()=>{
  const backendURL='http://localhost:3000/api';
  const defaultCover="https://images.unsplash.com/photo-1623039405147-547794f92e9e?q=80&w=826&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const defaultStashCover="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [buttons,setButtons]=useState(navbar_buttons);
  const [showSidebar,setShowSidebar]=useState(false);
  const [showNavbar,setShowNavbar]=useState(true);
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [windowWidth,setWindowWidth]=useState(window.innerWidth);
  const [user,setUser]=useState({});
  const [displayChangedCloudinaryRefresh,setDisplayChangedCloudinaryRefresh]=useState(false);
  useEffect(()=>{
    const watchWindowWidth=()=>{
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize',watchWindowWidth);
    return ()=>{window.removeEventListener('resize',watchWindowWidth)}
  },[]);

  useEffect(()=>{
    const adminButton={
      name:'Admin',
      icon:'manage_accounts',
      link:'/dashboard',
      active:false
    }
    if(isAuthenticated && user.isAdmin){
      setButtons(prev=>[...prev,adminButton]);
    }else{setButtons(navbar_buttons)}
  },[user, isAuthenticated])
  return(
    <Router>
      <ScrollToTop/>
      <GlobalAppContext.Provider value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        backendURL,
        defaultCover,
        defaultStashCover,
        windowWidth,
        buttons,
        setButtons,
        handleButtonActive,
        showSidebar,
        setShowSidebar,
        setShowNavbar,
        showNavbar,
        displayChangedCloudinaryRefresh,
        setDisplayChangedCloudinaryRefresh}}>
          {showNavbar && <Navbar/>}
          <DefaultPage/>
      </GlobalAppContext.Provider>
    </Router>
  );
}
export default App;
export {GlobalAppContext};