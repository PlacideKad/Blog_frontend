import googleImg from '../img/icons8-google.svg';
import xImg from '../img/icons8-x.svg';
import { Link } from 'react-router-dom';
import ButtonClikable from './utils/ButtonClikable';

const Login=()=>{
  return(
    <div className="absolute 
      z-10 w-full h-full 
      flex items-center justify-center
      bg-purple-50">
      <div className="w-8/10 max-w-[600px] max-h-[300px] h-4/10 sm:w-6/10 lg:w-5/10 
      flex flex-col items-center justify-evenly
      rounded-xl bg-purple-100
      shadow-md shadow-purple-200
      ">
        <div
          id="connect-with-socials"
          className=' flex items-center justify-evenly w-9/10 h-1/3'
          >
            <span className='text-center h-full w-5/10 grid content-center'>Connect using:</span>
            <div id="logos" className='flex items-center justify-evenly w-1/2 h-1/2'>
              <img src={googleImg} alt="google logo" />
              <img src={xImg} alt="x logo" />
            </div>
        </div>
        <div className='h-7/60 w-9/10
          flex items-end '>
          <hr className='w-45/100 h-1/2 grid content-center border-purple-400' /> 
            <span className='w-1/10 h-full grid content-center text-center'>Or</span>
          <hr className='w-45/100 h-1/2 grid content-center border-purple-400' />
        </div>
        <form 
        id="connect-with-mail" 
        className='h-1/2 w-9/10 
        flex flex-col justify-evenly items-center'>
          <div id='email-zone'
          className='flex h-4/10 w-full items-center justify-between'>
            <label htmlFor="input" 
            className='cursor-pointer w-15/100 h-full text-center grid content-center text-nowrap text-sm'>
            E-mail
            </label>
            <input 
            id='input' 
            type="email" 
            placeholder='monadressemail@gmail.com'
            className='w-75/100 bg-white text-black h-3/5
            pl-2 py-1 rounded-lg outline-none
            border-black border-2
            focus:scale-103
            focus:ring-2
            focus:ring-purple-400
            focus:border-purple-400
            transition-all ease duration-300
            ' />
          </div>
          <ButtonClikable 
            type='submit'
            height='h-3/10'
            width='w-3/10'
            text_content='Submit'
            border_radius='rounded-md'
            shadow='md'/>
        </form>
      </div>
      <Link to='/home' className="absolute top-0 left-0">
        <div id="title" className='h-full w-full'>
            SIte name
        </div>
      </Link>
    </div>
  )
}
export default Login