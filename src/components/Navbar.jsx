import adminIcon from '../images/icons8-admin-female-64.png';
import { Link } from 'react-router-dom';
import { useState , useEffect , useRef } from 'react';

const Navbar=()=>{
  /**
   * @param {name} String est le nom qui s'affiche au menu
   * @param {icon} String est le nom de classe de l'icone
   * @param {link} String est le path vers lequel on est dirigé en cliquant sur le button
   */
  const buttons=[
    {
      name:'Articles',
      link:'/articles'
    },
    {
      name:'Admin',
      icon:adminIcon,
      link:'/dashboard'
    },
    {
      name:'Thème',
      
    },
    {
      name:'A Propos',
      link:'/about'
    }
  ]
  
  const [showSidebar,setShowSidebar]=useState(false);
  const handleMenuClick=()=>{
    setShowSidebar(prev=>!prev);
  };
  const sidebarRef=useRef(null);
  const menubtnRef=useRef(null)
  const clickOutside=(event)=>{
    if(sidebarRef.current && !sidebarRef.current.contains(event.target) && !menubtnRef.current.contains(event.target)) setShowSidebar(false);
  }

  useEffect(()=>{
    if(showSidebar) document.addEventListener('click',clickOutside)
    else document.removeEventListener('click',clickOutside);
    return ()=>{
      document.removeEventListener('click',clickOutside)
    }
  },[showSidebar])
  return(
    <nav 
      className="w-full h-15/100 min-h-[40px] max-h-[150px]
      relative
      flex items-center justify-between
    ">
      <Link to='/home' className='w-2/10 h-full max-w-[250px]'>
        <div
          id="site-name"  
          className="w-full h-full
          flex items-center justify-start">
            Site name
        </div>
      </Link>
      <div
        id="sidebar"
        ref={sidebarRef}
        className={`w-8/10 h-full max-w-[900px] grow-1
        flex items-center justify-evenly
        sidebar-responsive-media
        ${showSidebar?'[transform:translateX(-400px)]':null} 
        transition-transform ease-linear duration-400`}>
          {
            buttons.map((button,index)=>{
              return(
                <Link key={index} to={button.link}>
                  <button 
                    className="px-3 py-1 border-b-4 border-black
                      flex items-center justify-evenly
                      hover:cursor-pointer
                      hover:bg-purple-300
                      hover:border-pink-200
                      transition-all ease duration-200
                    "
                    >
                      <span className={`${button.icon&& 'mx-1'}`}>{button.name}</span>
                      {button.icon && 
                      <img 
                        alt={`${button.name.toLowerCase()} icon`} 
                        className='h-5 w-5 object-cover' 
                        src={button.icon} 
                      />
                      }
                  </button>
                </Link>
              )
            })
          }
          <button
            id="btn_connection"
            className="
            px-3 py-2
            rounded-md
            hover:cursor-pointer
            hover:scale-103
            transition-scale ease-in duration-200
            text-white bg-purple-300"
          >
            Connexion
          </button>
      </div>
      <span 
        ref={menubtnRef}
        className="menu-responsive-media"
        onClick={handleMenuClick}
      >
        Click me
      </span>
    </nav>
  )
}
export default Navbar