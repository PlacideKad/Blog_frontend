import { useEffect , useContext } from "react";
import { NavbarContext } from "./App";

const LandingPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev));
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