import ButtonClikable from './utils/ButtonClikable';
import Title from './utils/Title';
import { useContext , useEffect, useState } from 'react';
import { GlobalAppContext } from './App';
import ErrorPopup from './utils/ErrorPopup';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
  const {windowWidth,backendURL , setUser , setIsAuthenticated}=useContext(GlobalAppContext);
  const navigate=useNavigate();
  const [isOnSigninScreen, setIsOnSigninScreen]=useState(true);
  const initialFormField=[
    {label:'Prénom', name:'given_name', isOnSigninScreen:false,type:'text',value:'',requirement:'3-15 lettres',ring_border_color:'focus:ring-fuchsia-400 focus:border-fuchsia-400'},
    {label:'Nom', name:'family_name', isOnSigninScreen:false,type:'text', value:'',requirement:'3-15 lettres',ring_border_color:'focus:ring-fuchsia-400 focus:border-fuchsia-400'},
    {label:'E-mail', name:'email', isOnSigninScreen:true,type:'email',value:'',requirement:'',ring_border_color:'focus:ring-fuchsia-400 focus:border-fuchsia-400'},
    {label:'Mot de passe', name:'password', isOnSigninScreen:true,type:'password',value:'',requirement:'6-17 caracteres',ring_border_color:'focus:ring-fuchsia-400 focus:border-fuchsia-400'},
  ];
  const [formFields, setFormFields]=useState(initialFormField);
  const [isReadyToSubmit,setIsReadyToSubmit]=useState(false);
  const [errorMessage,setErrorMessage]=useState(null);

  const checkEntries=()=>{
    const email=formFields.find(field=>field.name==="email").value?.trim();
    const password=formFields.find(field=>field.name==="password").value?.trim();
    const given_name=formFields.find(field=>field.name==="given_name").value?.trim();
    const family_name=formFields.find(field=>field.name==="family_name").value?.trim();

    const emailRegex=/^[a-z][a-z0-9]{1,20}@[a-zA-Z]{1,8}(\.[a-z]{1,10}){1,2}$/;
    //password must be 6-17 characters or returning false
    const passwordRegex=/^.{6,17}$/;
    //given name and family must both be 3-15 letters long
    const nameRegex=/^[\w]{3,15}$/;

    return (isOnSigninScreen?
      emailRegex.test(email) && passwordRegex.test(password):
      emailRegex.test(email) && passwordRegex.test(password) && nameRegex.test(given_name) && nameRegex.test(family_name)
    );
  }

  const handleFieldEditing=(e,fieldName)=>{
    const n_value=e.target.value;
    setFormFields(prev=>{
      const emailRegex=/^[a-z][a-z0-9]{1,20}@[a-zA-Z]{1,8}(\.[a-z]{1,10}){1,2}$/;
      const passwordRegex=/^.{6,17}$/;
      const nameRegex=/^[\w]{3,15}$/;
      let data=[];
      for(let field of prev){
        if(field.name===fieldName){
          data.push({...field,value:n_value});
        }else data.push(field);
      }
      data.forEach(field=>{
        switch(field.name){
          case "email":
            if(!emailRegex.test(field.value)) field.ring_border_color="focus:ring-red-600 focus:border-red-600";
            else field.ring_border_color="focus:ring-fuchsia-400 focus:border-fuchsia-400";
            break;
          case "password":
            if(!passwordRegex.test(field.value)) field.ring_border_color="focus:ring-red-600 focus:border-red-600";
            else field.ring_border_color="focus:ring-fuchsia-400 focus:border-fuchsia-400";
            break;
          case "given_name":
            if(!nameRegex.test(field.value)) field.ring_border_color="focus:ring-red-600 focus:border-red-600";
            else field.ring_border_color="focus:ring-fuchsia-400 focus:border-fuchsia-400";
          case "family_name":
            if(!nameRegex.test(field.value)) field.ring_border_color="focus:ring-red-600 focus:border-red-600";
            else field.ring_border_color="focus:ring-fuchsia-400 focus:border-fuchsia-400";
          default:
            break;
        }
      })
      return data;
    });
  };
  useEffect(()=>{
    setIsReadyToSubmit(checkEntries());
  },[formFields]);
  const clearingAllStates=()=>{
    setFormFields(prev=>{
      let data=[];
      prev.forEach(field=>{
        data.push({...field,value:''});
      });
      return data;
    });
  };
  const handleSubmission=async ()=>{
    if(isReadyToSubmit){
      let email=formFields.find(field=>field.name==="email").value?.trim();
      let password=formFields.find(field=>field.name==="password").value?.trim();
      let given_name=formFields.find(field=>field.name==="given_name").value?.trim();
      let family_name=formFields.find(field=>field.name==="family_name").value?.trim();

      const data=isOnSigninScreen?{email,password}:{email,password,given_name,family_name};
      try{
        const res=await fetch(`${backendURL}/authenticate/${isOnSigninScreen?'signin':'signup'}`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(data)
        });
        const resJson=await res.json();
        if(resJson.success) {
          setUser(resJson.user);
          setIsAuthenticated(true);
          navigate('/');
        }else{
          if(resJson.errorHandled) setErrorMessage(resJson.message);
          else throw Error(resJson.message);
        }
      }catch(err){
        console.log(err);
      }
    }
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

        <ErrorPopup
        message_={errorMessage}
        showState_={errorMessage?true:false}
        onCloseCallback_={()=>setErrorMessage(null)}/>

        <form 
        onSubmit={async (e)=>{
          e.preventDefault();
          await handleSubmission();
        }}
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
              placeholder={`${windowWidth<=530?`${field.label} : ${field.requirement}`:field.requirement}`}
              id={field.name}
              type={field.type} 
              className={`w-75/100 bg-white text-black h-4/5
              pl-2 py-1 rounded-lg outline-none
              border-black border-2
              focus:scale-103
              focus:ring-2
              transition-all ease duration-300
              ${field.ring_border_color}`}
              value={field.value}
              onChange={(e)=>{handleFieldEditing(e,field.name)}} />
            </div>
          })}

          <span className={`self-end ${windowWidth>530?'text-sm':'text-[3vw]'} my-2 text-neutral-700 italic`}>
              {isOnSigninScreen?
              "Vous n'avez pas de compte?":
              "Vous avez un compte?"}
              <span 
              onClick={()=>{
                clearingAllStates();
                setIsOnSigninScreen(prev=>!prev);
              }}
              className='mx-2 text-purple-800 cursor-pointer'>
              {isOnSigninScreen?
              "Créer un compte ici":
              "Connectez-vous ici"}
              </span>
          </span>
          {
            isReadyToSubmit?
            <ButtonClikable 
              onclick={handleSubmission}
              type='submit'
              p_style="rounded-md py-2 px-8 my-2"
              content={isOnSigninScreen?'Se Connecter':'S\'inscrire'}/>:
            <div className="rounded-md py-2 px-8 my-2 bg-linear-to-r from-fuchsia-400 to-purple-400 opacity-30 text-white">
              {isOnSigninScreen?'Se Connecter':'S\'inscrire'}
            </div>
          }
        </form>
      </div>
      <div className="absolute top-0 left-0">
        <Title windowWidth={windowWidth}/>
      </div>
    </div>
  )
}
export default Login