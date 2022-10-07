import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';
import Logo from '../assets/just_lend_logo.png'

function Register() {

  const[signupFields, setSignupFields] = useState({name:"",email:"", password:"",confPassword:""});
  const [message, setMessage] = useState('');

  const navigate = useNavigate()
  
  const handleInputFields = (e)=>{
    setSignupFields({...signupFields, [e.target.name]: e.target.value})
  }

  const Register = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://hazar-nodejs-mysql.herokuapp.com/register', {
            name: signupFields.name,
            email: signupFields.email,
            password: signupFields.password,
            confPassword: signupFields.confPassword
        });
        navigate("/");
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
        <form onSubmit={Register}>
          <div style={{padding: "12px 50px"}}>
            <label className='login-label'>
                  Name
                  <input 
                      className='input-field'
                      name='name'
                      placeholder='Enter name' 
                      type='text' 
                      onChange={(e)=>handleInputFields(e)} 
                      value={signupFields.name}/>
            </label>
          </div>
          <div style={{padding: "12px 50px"}}>
              <label className='login-label'>
                  Email Address
                  <input 
                      className='input-field'
                      name='email'
                      placeholder='Enter email address' 
                      type='text' 
                      onChange={(e)=>handleInputFields(e)} 
                      value={signupFields.email}/>
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
                  value={signupFields.password} />
              </label>
          </div>
         <div style={{marginBottom:'12px',padding: "0 50px 12px"}}>
              <label className='login-label'>
                  Confirm Password
                  <input
                  className='input-field'
                  name='confPassword'
                  placeholder='Enter your password'
                  type='password' 
                  onChange={(e)=>handleInputFields(e)} 
                  value={signupFields.confPassword} />
              </label>
          </div>
          <span onClick={()=>navigate('/')} style={{cursor:'pointer',fontSize:'12px', color:'#78eac1',fontWeight:'bold',marginLeft:'50px'}}>Login ?</span>
          {/* LOGIN BUTTON CONTAINER */}
          <div style={{marginTop:'2.5rem',background:'#f6f6f6', padding:"1rem 3rem"}}>
              <button type='submit' onClick={()=>navigate('/')} className='btn-login'>Sign up</button>
          </div>
        </form>
      </div>
      {message && <h2 style={{color:'red',textAlign:'center'}}>{message}</h2>}
    </div>
  </div>
  )
}

export default Register
