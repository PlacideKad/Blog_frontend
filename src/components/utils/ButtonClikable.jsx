import { useState } from "react";

const ButtonClikable=({type,content,p_style,onclick,color})=>{
  const [isPressed,setIsPressed]=useState(false);
  const handleMouseDown=()=>{
    setIsPressed(true);
  }
  const handleMouseUp=()=>{
    setIsPressed(false);
  }

  return(
    <div
    type={type}
    onMouseUp={handleMouseUp}
    onMouseDown={handleMouseDown}
    onTouchStart={handleMouseDown}
    onTouchEnd={handleMouseUp}
    onClick={onclick}
    className={`cursor-pointer ${color?color:'bg-purple-400'}  text-white transition-all ease duration-200
      ${p_style} 
      ${isPressed?'scale-98':`shadow-md shadow-black`}`}>
      {content}
    </div>
  );
}
export default ButtonClikable