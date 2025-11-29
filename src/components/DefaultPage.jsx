import { useContext, useEffect , useState } from "react";
import {GlobalAppContext } from "./App";
import { Routes , Route , useLocation } from "react-router-dom";

import LandingPage from "./LandingPage";
import MissingPage from "./MissingPage";
import ArticlesPage from "./ArticlesPage";
import AboutPage from "./AboutPage";
import ProfilePage from "./ProfilePage";
import AdminDashboard from "./AdminDashboard";
import AdminEditStashPage from "./AdminEditStashPage";
import AdminArticlePage from "./AdminArticlePage";
import AdminStashPage from "./AdminStashPage";
import AdminEditArticlePage from "./AdminEditArticlePage";
import Login from "./Login";
import LoginAsAdmin from "./LoginAsAdmin";
import Footer from "./Footer";
import ReadArticlePage from "./ReadArticlePage";
import CheckUserIsAdmin from "./utils/CheckUserIsAdmin";

const DefaultPage=()=>{
  const location=useLocation();
  const {
    setShowSidebar,
    showSidebar,
    setShowNavbar,
    setIsAuthenticated,
    setUser,
    backendURL,
    showNavbar,
    setUserIsLoading}=useContext(GlobalAppContext);

  useEffect(()=>{
    setShowNavbar(!['login','profile','dashboard','edit','admin','loginasadmin'].includes(location.pathname.split('/')[1]));
    setShowSidebar(false);
  },[location]);

  useEffect(()=>{
    const checkUser=async ()=>{
      setUserIsLoading(true);
      const res=await fetch(`${backendURL}/authenticate/check_user`,{
        method:"GET",
        credentials:"include"
      });
      const resJson=await res.json();
      if(resJson.success) {
        setUser(resJson.user);
        setIsAuthenticated(true);
      };
      setUserIsLoading(false);
    }
    (async()=>{await checkUser()})();
  },[])
  return(
    <div id="default-page" className={`h-85/100 grow-1 bg-gray-50 w-full overflow-y-auto overflow-x-hidden relative 
      ${showSidebar&&'[filter:blur(1px)]'}
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-fuchsia-200
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-fuchsia-400
      [&::-webkit-scrollbar-thumb]:rounded-full

      transition-all ease 400ms`}>
      <Routes>
        {/* public */}
        <Route path="*" element={<MissingPage/>}></Route>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/home" element={<LandingPage/>}></Route>
        <Route path="/articles" element={<ArticlesPage/>}></Route>
        <Route path="/articles/:page" element={<ArticlesPage/>}></Route>
        <Route path="/articles/read/:id" element={<ReadArticlePage/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/loginasadmin" element={<LoginAsAdmin/>}></Route>
        <Route path="/profile" element={<ProfilePage/>}></Route>

        {/* admin */}
        <Route element={<CheckUserIsAdmin/>}>
          <Route path="/admin/articles/:page" element={<AdminArticlePage/>}></Route>
          <Route path="/admin/stashes/:page" element={<AdminStashPage/>}></Route>
          <Route path="/dashboard" element={<AdminDashboard/>}></Route>
          <Route path="/edit/stash/:id" element={<AdminEditStashPage/>}></Route>
          <Route path="/edit/article/:id" element={<AdminEditArticlePage/>}></Route>
        </Route>
      </Routes>
      {showNavbar && <Footer/> }
    </div>
  )
}
export default DefaultPage