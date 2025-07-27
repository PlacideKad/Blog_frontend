import { useContext, useEffect } from "react";
import { NavbarContext } from "./App";
import { Routes , Route , useLocation } from "react-router-dom";

import LandingPage from "./LandingPage";
import MissingPage from "./MissingPage";
import ArticlesPage from "./ArticlesPage";
import AboutPage from "./AboutPage";
import AdminDashboard from "./AdminDashboard";
import Login from "./Login";

const DefaultPage=()=>{
  const location=useLocation();
  const {setShowSidebar,showSidebar,setShowNavbar}=useContext(NavbarContext);
  useEffect(()=>{
    setShowNavbar(location.pathname.split('/')[1]!=='login');
    setShowSidebar(false);
  },[location])
  return(
    <div className={`h-85/100 grow-1 w-full overflow-auto relative 
      ${showSidebar&&'[filter:blur(1px)]'}
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-purple-200
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-purple-400
      [&::-webkit-scrollbar-thumb]:rounded-full

      transition-all ease 400ms`}>
      <Routes>
        <Route path="*" element={<MissingPage/>}></Route>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/home" element={<LandingPage/>}></Route>
        <Route path="/articles" element={<ArticlesPage/>}></Route>
        <Route path="/dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  )
}
export default DefaultPage