import { Link } from "react-router-dom"

const Title=({windowWidth})=>{
  return(
    <Link to='/home' className={`${windowWidth<640?'w-1/2':'w-2/10'} h-5/10 max-w-[250px]`}>
      <div
        id="site-name"  
        className="title w-full h-full
        flex items-center justify-start ml-1 dancing-script-style">
          <div className='h-full flex items-center justify-end text-6xl md:text-[66px] lg:text-7xl text-fuchsia-400'>S</div>
          <div className='h-full flex items-center justify-start text-3xl md:text-[32px] lg:text-4xl'>
            ite féministe
          </div>
      </div>
    </Link>
  )
}
export default Title