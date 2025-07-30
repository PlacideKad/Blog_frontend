import { useContext, useEffect } from "react";
import { NavbarContext , AuthenticatedContext } from "./App";
import { Routes , Route , useLocation } from "react-router-dom";

import LandingPage from "./LandingPage";
import MissingPage from "./MissingPage";
import ArticlesPage from "./ArticlesPage";
import AboutPage from "./AboutPage";
import AdminDashboard from "./AdminDashboard";
import Login from "./Login";
import Footer from "./Footer";

const DefaultPage=()=>{
  const location=useLocation();
  const {setShowSidebar,showSidebar,setShowNavbar}=useContext(NavbarContext);
  const {setIsAuthenticated}=useContext(AuthenticatedContext);

  useEffect(()=>{
    const checkUser=async()=>{
      try{
        const res=await fetch('http://localhost:3000/api/user',{
          method:'GET',
          credentials:'include'
        });
        if(!res.ok) throw new Error('Error when checking the user');
        const resJson=await res.json();
        setIsAuthenticated(resJson.authenticated);
      }catch(err){
        console.error(err);
        setIsAuthenticated(false);
      }
    }

    (async()=>{await checkUser()})()
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
      <Footer/>
    </div>
  )
}
export default DefaultPage