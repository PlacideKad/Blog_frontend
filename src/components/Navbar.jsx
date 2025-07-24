import adminIcon from '../images/icons8-admin-female-64.png'
const Navbar=()=>{
  /**
   * @param {name} String est le nom qui s'affiche au menu
   * @param {icon} String est le nom de classe de l'icone
   * @param {link} String est le path vers lequel on est dirigé en cliquant sur le button
   */
  const buttons=[
    {
      name:'Articles',
    },
    {
      name:'Administrateur',
      icon:adminIcon,
      icon_class:'admin'
    },
    {
      name:'Thème',
      
    },
    {
      name:'A Propos',
    }
]
  return(
    <nav 
      className="w-full h-15/100 min-h-[40px] max-h-[150px]
      relative
      flex items-center justify-between
    ">
      <div
        id="site-name"  
        className="w-2/10 h-full max-w-[250px]
        flex items-center justify-start">
          Site name
      </div>
      <div
        id="sidebar"
        className="w-8/10 h-full max-w-[900px] grow-1
        flex items-center justify-evenly
        sidebar-responsive-media">
          {
            buttons.map((button,index)=>{
              return(
                <button 
                  key={index}
                  className="px-3 py-1 border-b-4 border-black
                    hover:cursor-pointer
                    hover:bg-purple-500
                    hover:text-white
                    hover:border-pink-200
                    transition-all ease duration-200
                   "
                  >
                    <span>{button.name}</span>
                    {button.icon && 
                    <img 
                      alt={`${button.name.toLowerCase()} icon`} 
                      className='h-5 w-5 object-cover' 
                      src={button.icon} 
                    />
                    }
                    
                    
                </button>
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
            text-white bg-purple-500"
          >
            Connexion
          </button>
      </div>
      <span className="hidden menu-responsive-media">Click me</span>
    </nav>
  )
}
export default Navbar