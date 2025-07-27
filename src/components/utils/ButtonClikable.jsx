import { useState } from "react";

const ButtonClikable=({height,width,border_radius,type,text_content,shadow})=>{
  const [isPressed,setIsPressed]=useState(false);
  const handleMouseDown=()=>{
    setIsPressed(true);
  }
  const handleMouseUp=()=>{
    setIsPressed(false);
  }

  return(
    <button
    type={type}
    onMouseUp={handleMouseUp}
    onMouseDown={handleMouseDown}
    onTouchStart={handleMouseDown}
    onTouchEnd={handleMouseUp}
    className={`${height} ${width}
    cursor-pointer ${border_radius}  
    bg-purple-400  text-white
    transition-all ease duration-200
    ${isPressed?'scale-98':`shadow-${shadow} shadow-black` }
    `}>
      {text_content}
    </button>
  );
}
export default ButtonClikable