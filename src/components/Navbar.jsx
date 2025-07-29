import { Link } from 'react-router-dom';
import { useState , useEffect , useRef , useContext } from 'react';
import { NavbarContext , AuthenticatedContext } from './App';
import ButtonClikable from './utils/ButtonClikable';

const Navbar=()=>{
  /**
   * @param {name} String est le nom qui s'affiche au menu
   * @param {icon} String est le nom de classe de l'icone
   * @param {link} String est le path vers lequel on est dirigé en cliquant sur le button
   */
  
  const {buttons,showSidebar,setShowSidebar}=useContext(NavbarContext);
  const {isAuthenticated}=useContext(AuthenticatedContext);

  const [windowWidth,setWindowWidth]=useState(window.innerWidth);
  const handleMenuClick=()=>{
    setShowSidebar(prev=>!prev);
  };
  const sidebarRef=useRef(null);
  const menubtnRef=useRef(null);
  const clickOutside=(event)=>{
    if(sidebarRef.current && !sidebarRef.current.contains(event.target) && !menubtnRef.current.contains(event.target)) setShowSidebar(false);
  }

  useEffect(()=>{
    if(showSidebar) document.addEventListener('click',clickOutside)
    else document.removeEventListener('click',clickOutside);
    return ()=>{
      document.removeEventListener('click',clickOutside)
    }
  },[showSidebar]);

  useEffect(()=>{
    const watchWindowWidth=()=>{
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize',watchWindowWidth);
    return ()=>{window.removeEventListener('resize',watchWindowWidth)}
  },[]);
  return(
    <nav 
      className={`w-full ${windowWidth<640?'h-1/10':'h-15/100 min-h-[40px] max-h-[150px]'} 
      relative
      flex items-center justify-between
      bg-purple-100
      shadow-sm shadow-purple-950
      z-1
    `}>
      <Link to='/home' className={`${windowWidth<640?'w-1/2':'w-2/10'} h-5/10 max-w-[250px]`}>
        <div
          id="site-name"  
          className="title w-full h-full
          flex items-center justify-start ml-1">
            <div className='h-full flex items-end justify-end text-3xl'>S</div>
            <div className='h-full flex items-end justify-start'>
              ite feministe
            </div>
        </div>
      </Link>
      <div
        id="sidebar"
        ref={sidebarRef}
        className={
          `${windowWidth>=640 && 'w-8/10'} max-w-[900px] grow-1
          flex items-center justify-evenly
          ${windowWidth<640 ? `absolute -right-[400px] top-9/10  h-[60vh]
          flex flex-col items-center justify-evenly
            ${windowWidth<350 ? 'w-4/4':'w-3/4'} 
          bg-purple-100 rounded-bl-3xl`:'h-full'}
          ${windowWidth<640 && showSidebar?'[transform:translateX(-400px)]':null} 
          transition-transform ease-linear duration-400`
        }>
        {
          buttons.map((button,index)=>{
            return(
              <Link key={index} to={button.link}>
                <button 
                  className={`px-3 py-1 border-b-4 border-black
                    flex items-center justify-evenly
                    ${button.active?'border-purple-400 text-purple-500 text-xl':null}
                    hover:cursor-pointer
                    hover:bg-purple-400
                    hover:border-pink-200
                    hover:text-white
                    transition-all ease duration-200`}
                  >
                    <span className={`${button.icon&& 'mx-1'}`}>{button.name}</span>
                    {button.icon && 
                      <span className='material-symbols-outlined text-inherit'>
                        {button.icon}
                      </span>
                    }
                </button>
              </Link>
            )
          })
        }
        <div>
          Theme
        </div>
        {
          isAuthenticated?
          <span>Authenticated</span>:
          <Link to='/login'>
            <ButtonClikable
              type=''
              height='h-[6vh] max-h-14 min-h-8'
              width='w-[14vw] max-w-40 min-w-25'
              text_content='Se Connecter'
              border_radius='rounded-md'
              shadow='sm'
            />
          </Link>
        }
      </div>
      {windowWidth<640 &&
        <span 
          ref={menubtnRef}
          onClick={handleMenuClick}
          className="material-symbols-outlined text-purple-400 ![font-size:max(35px,10vw)]">
            {showSidebar?'close':'menu'}
        </span>
      }
    </nav>
  )
}
export default Navbar