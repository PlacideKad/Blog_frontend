import { useState, useRef, useEffect } from "react";

const DropdownMenu = ({ onEdit_, onDelete_ }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttons=[
    {
      text:"Modifier",
      actionOnClick:onEdit_,
      textColor:"text-fuchsia-900",
      icon:"edit"
    },
    {
      text:"Supprimer",
      actionOnClick:onDelete_,
      textColor:"text-red-600",
      icon:"delete"
    }
  ];
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute -top-3 -right-3" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-6 h-6 bg-[rgba(204,82,235,0.5)] rounded-full flex items-center justify-center cursor-pointer">
        <span className="material-symbols-outlined !text-[1.2rem] !text-fuchsia-50">more_vert</span>
      </button>

      {open && (
        <div className="absolute left-5 mt-2 w-40 bg-white shadow-lg border border-purple-900 rounded-md z-20">
          {
            buttons.map((button,index)=>(
              <button 
                key={index}
                onClick={() => {
                setOpen(false);
                button.actionOnClick && button.actionOnClick();
                }}
                className={`w-full flex items-center justify-start space-x-1 rounded-md text-left px-4 py-2 ${button.textColor} hover:bg-purple-100 hover:text-fuchsia-500 transition-all duration-100 ease-linear`}>
                <span className="material-symbols-outlined">{button.icon}</span>
                <span>{button.text}</span>
              </button>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
