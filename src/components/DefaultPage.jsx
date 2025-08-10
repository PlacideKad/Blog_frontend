import { useContext, useEffect , useState } from "react";
import { NavbarContext , AuthenticatedContext } from "./App";
import { Routes , Route , useLocation } from "react-router-dom";

import LandingPage from "./LandingPage";
import MissingPage from "./MissingPage";
import ArticlesPage from "./ArticlesPage";
import AboutPage from "./AboutPage";
import ProfilePage from "./ProfilePage";
import AdminDashboard from "./AdminDashboard";
import Login from "./Login";
import Footer from "./Footer";

const DefaultPage=()=>{
  const location=useLocation();
  const {setShowSidebar,showSidebar,setShowNavbar,showNavbar}=useContext(NavbarContext);
  const {setIsAuthenticated,setUser}=useContext(AuthenticatedContext);
  const [userId,setUserId]=useState(null);

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
        setUserId(resJson.decoded.id);
      }catch(err){
        console.error(err);
        setIsAuthenticated(false);
      }
    }
    (async()=>{await checkUser()})()
    setShowNavbar(!['login','profile','dashboard'].includes(location.pathname.split('/')[1]));
    setShowSidebar(false);
  },[location]);

  useEffect(()=>{
    if(userId){
      const getUser=async()=>{
        try{
          const res=await fetch('http://localhost:3000/api/user',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:userId})
          });
          if(!res.ok) throw new Error('Error occured when getting the user');
          const user=await res.json();
          setUser(user);
        }catch(err){
          console.log(err);
        }
      }
      (async()=>{await getUser()})()
    }
  },[userId]);
  return(
    <div className={`h-85/100 grow-1 bg-gray-50 w-full overflow-y-auto overflow-x-hidden relative 
      ${showSidebar&&'[filter:blur(1px)]'}
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-fuchsia-200
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-fuchsia-400
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
        <Route path="/profile" element={<ProfilePage/>}></Route>
      </Routes>
      {showNavbar && <Footer/> }
    </div>
  )
}
export default DefaultPage