import ButtonClikable from './utils/ButtonClikable';
import Title from './utils/Title';
import { useContext , useState } from 'react';
import { GlobalAppContext } from './App';

const Login=()=>{
  const {windowWidth,backendURL}=useContext(GlobalAppContext);
  const [isOnSigninScreen, setIsOnSigninScreen]=useState(true);
  const initialFormField=[
    {label:'Prénom', name:'given_name', isOnSigninScreen:false,type:'text',value:''},
    {label:'Nom', name:'family_name', isOnSigninScreen:false,type:'text', value:''},
    {label:'E-mail', name:'email', isOnSigninScreen:true,type:'email',value:''},
    {label:'Mot de passe', name:'password', isOnSigninScreen:true,type:'password',value:''},
  ];
  const [formFields, setFormFields]=useState(initialFormField);
  const handleFieldEditing=(e,fieldName)=>{
    const n_value=e.target.value;
    setFormFields(prev=>{
      let data=[];
      for(let field of prev){
        if(field.name===fieldName){
          data.push({...field,value:n_value})
        }else data.push(field);
      }
      return data;
    });
  }
  return(
    <div className="absolute 
      w-full h-full
      flex items-center justify-center
      bg-fuchsia-50">
      <div className={`w-9/10 sm:w-8/10 ${isOnSigninScreen?'h-25/100':'h-35/100'} max-w-[600px] lg:w-7/10 
      flex flex-col items-center justify-evenly
      rounded-xl bg-fuchsia-100 ${windowWidth>1000?'hover:scale-102 shadow-login-hover':'shadow-login'}
      transition-all ease duration-300`}>

        <form 
        onSubmit={(e)=>{e.preventDefault()}}
        id="connect-with-username-password" 
        className={`${isOnSigninScreen?'h-3/4':'h-9/10'} w-9/10 
        flex flex-col justify-evenly items-center relative`}>
          {formFields.map((field)=>{
            return (!field.isOnSigninScreen && isOnSigninScreen)?
            <div key={field.name}>
            </div>:
            <div key={field.name}
            className={`flex h-4/10 w-full items-center ${windowWidth>530?'justify-between':'justify-center'}`}>
            {windowWidth>530&&
              <label htmlFor={field.name} 
              className='cursor-pointer w-15/100 h-full text-start grid content-center text-nowrap text-sm'>
              {field.label}
              </label>}
              <input 
              placeholder={`${windowWidth<=530?field.label:''}`}
              id={field.name}
              type={field.type} 
              className='w-75/100 bg-white text-black h-4/5
              pl-2 py-1 rounded-lg outline-none
              border-black border-2
              focus:scale-103
              focus:ring-2
              focus:ring-fuchsia-400
              focus:border-fuchsia-400
              transition-all ease duration-300'
              value={field.value}
              onChange={(e)=>{handleFieldEditing(e,field.name)}} />
            </div>
          })}

          <span className={`self-end ${windowWidth>530?'text-sm':'text-[3vw]'} my-2 text-neutral-700 italic`}>
              {isOnSigninScreen?
              "Vous n'avez pas de compte?":
              "Vous avez un compte?"}
              <button 
              onClick={()=>{setIsOnSigninScreen(prev=>!prev)}}
              className='mx-2 text-purple-800 cursor-pointer'>
              {isOnSigninScreen?
              "Créer un compte ici":
              "Connectez-vous ici"}
              </button>
          </span>
          <ButtonClikable 
            type='submit'
            p_style="rounded-md py-2 px-8 my-2"
            content={isOnSigninScreen?'Se Connecter':'S\'inscrire'}/>
        </form>
      </div>
      <div className="absolute top-0 left-0">
        <Title windowWidth={windowWidth}/>
      </div>
    </div>
  )
}
export default Login