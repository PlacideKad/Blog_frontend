import { useEffect , useContext } from "react";
import { NavbarContext } from "./App";

const LandingPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarContext);
  useEffect(()=>{
    const checkUser=async()=>{
      const res=await fetch('http://localhost:3000/api/user',{
        method:'GET',
        credentials:'include'
      });
      const resJson=await res.json();
      console.log(resJson);
    }
    setButtons((prev)=>handleButtonActive(prev));
    (async()=>{await checkUser()})()
  },[]);

  return(
    <>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
      <h1>landing page</h1>
    </>
  );
}
export default LandingPage