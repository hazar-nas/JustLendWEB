import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/just_lend_logo.png'

function Login() {

  const[loginFields, setLoginFields] = useState({email:"", password:""});
  const [message, setMessage] = useState('');

  const navigate = useNavigate()

  const handleInputFields = (e)=>{
    setLoginFields({...loginFields, [e.target.name]: e.target.value})
  }

  const Auth = async (e) => {
    e.preventDefault();
    try {
        await axios.post('https://hazar-nodejs-mysql.herokuapp.com/login', {
            email: loginFields.email,
            password: loginFields.password
        });
        navigate("/main");
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.msg);
        }
    }
}

  return (
    <div className='login-bg'>
      <div className='login-container'>
        <div style={{textAlign:'center'}}>
          <img style={{width:'120px',marginBottom:'2rem',}} src={Logo} alt='justlend-logo.png'/>
        </div>
        
        {/* LOGIN CARD */}
        <div className='login-card-container'>
          <form onSubmit={Auth}>
            <div style={{padding: "12px 50px"}}>
              
                <label className='login-label'>
                    Email Address
                    <input 
                        className='input-field'
                        name='email'
                        placeholder='Enter email address' 
                        type='text' 
                        onChange={(e)=>handleInputFields(e)} 
                        value={loginFields.email}/>
                </label>
            </div>
           <div style={{marginBottom:'12px',padding: "0 50px 12px"}}>
                <label className='login-label'>
                    Password
                    <input
                    className='input-field'
                    name='password'
                    placeholder='Enter your password'
                    type='password' 
                    onChange={(e)=>handleInputFields(e)} 
                    value={loginFields.password} />
                </label>
            </div>
          <span style={{fontSize:'12px', color:'#78eac1',fontWeight:'bold',marginLeft:'50px'}}>Forgotten password?</span>
          <span onClick={()=>navigate('/register')} style={{cursor:'pointer',fontSize:'12px', color:'#78eac1',fontWeight:'bold',marginLeft:'50px'}}>Sign Up?</span>
            {/* LOGIN BUTTON CONTAINER */}
            <div style={{marginTop:'2.5rem',background:'#f6f6f6', padding:"1rem 3rem"}}>
                <button  className='btn-login'>Login</button>
            </div>
            
          </form>
          
        </div>
        {message && <h2 style={{color:'red',textAlign:'center'}}>{message}</h2>}
      </div>
    </div>
  )
}

export default Login
