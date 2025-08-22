import { Link } from 'react-router-dom';
import { useEffect , useRef , useContext } from 'react';
import { GlobalAppContext } from './App';
import ButtonClikable from './utils/ButtonClikable';
import Title from './utils/Title';
const Navbar=()=>{
  /**
   * @param {name} String est le nom qui s'affiche au menu
   * @param {icon} String est le nom de classe de l'icone
   * @param {link} String est le path vers lequel on est dirigé en cliquant sur le button
   */
  
  const {
    buttons,
    showSidebar,
    setShowSidebar,
    isAuthenticated,
    user,
    backendURL,
    windowWidth}=useContext(GlobalAppContext);
  
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

  return(
    <nav 
      className={`w-full ${windowWidth<640?'h-1/10':'h-fit p-4 min-h-[40px] max-h-[150px]'} 
      relative
      flex items-center justify-between
      bg-fuchsia-100
      shadow-sm shadow-fuchsia-950
      z-1
    `}>
      <Title windowWidth={windowWidth}/>
      <div
        id="sidebar"
        ref={sidebarRef}
        className={
          `${windowWidth>=640 && 'w-8/10'} max-w-[900px] grow-1
          flex items-center justify-evenly
          ${windowWidth<640 ? `absolute -right-[600px] top-[20vh]  h-[60vh]
          flex flex-col items-center justify-evenly
            ${windowWidth<350 ? 'w-4/4':'w-3/4'} 
          bg-linear-45 from-fuchsia-200 to-purple-200 rounded-l-3xl shadow-lg shadow-gray-500`:'h-full'}
          ${windowWidth<640 && showSidebar?'[transform:translateX(-600px)]':null} 
          transition-transform ease-in-out duration-400`
        }>
        {
          buttons.map((button,index)=>{
            return(
              <Link key={index} to={button.link}>
                <button 
                  className={`px-3 py-1 border-b-4 border-purple-900
                    flex items-center justify-evenly
                    ${button.active?'!border-fuchsia-400 text-fuchsia-400 text-xl':'text-purple-900 border-purple-900'}
                    hover:cursor-pointer
                    hover:bg-fuchsia-400
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
        {
          isAuthenticated?
          <Link to='/profile'>
            <div className='cursor-pointer w-15 h-15 rounded-full ring-fuchsia-400 ring-2 hover:scale-103 hover:ring-4 transition-all ease-in-out duration-200'>
              <img
                className="w-20 [aspect-ratio:1/1] rounded-full object-cover"
                src={user.picture && `${backendURL}/user/avatar/?url=${user.picture}`}
                alt="profile picture"
              />
            </div>
          </Link>:
          <Link to='/login'>
            <ButtonClikable
              type=''
              content='Se Connecter'
              p_style="rounded-md p-2"
            />
          </Link>
        }
      </div>
      {windowWidth<640 &&
        <span 
          ref={menubtnRef}
          onClick={handleMenuClick}
          className="material-symbols-outlined text-fuchsia-400 ![font-size:max(35px,10vw)]">
            {showSidebar?'close':'menu'}
        </span>
      }
    </nav>
  )
}
export default Navbar