import React, { useState,useEffect } from 'react'
import Campaign from '../containers/Campaign'
import Sidebar from '../containers/Sidebar'
import Logo from '../assets/just_lend_logo.png'
import { MdDashboard,
  MdExpandMore,
  MdMenuOpen,
  MdSupervisedUserCircle,
  MdOutlineAssessment,
  MdOutlineChatBubbleOutline,
  MdSettings } from "react-icons/md";
import {Popover, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";


const icons = [
  {id:11,iconName:"Dashboard", icon:MdDashboard},
  {id:15211,iconName:"Campaigns", icon:MdMenuOpen },
  {id:154,iconName:"Users", icon:MdSupervisedUserCircle},
  {id:521151,iconName:"Reports", icon:MdOutlineAssessment},
  {id:5251,iconName:"Complaints", icon:MdOutlineChatBubbleOutline},
  {id:21351,iconName:"Settings", icon:MdSettings},
]

function Home() {

  const [activeItem, setActiveItem] = useState(icons[1].iconName )
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
 

  useEffect(() => {
      refreshToken();
  }, []);

  const refreshToken = async () => {
      try {
          const response = await axios.get('https://hazar-nodejs-mysql.herokuapp.com/token');
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          // setName(decoded.name);
          setExpire(decoded.exp);
      } catch (error) {
          if (error.response) {
              navigate("/");
          }
      }
  }

  const axiosJWT = axios.create();
 
  axiosJWT.interceptors.request.use(async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.get('https://hazar-nodejs-mysql.herokuapp.com/token');
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setExpire(decoded.exp);
      }
      return config;
  }, (error) => {
      return Promise.reject(error);
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  const renderCurrentTab = ()=>{
    switch (activeItem) {
      case 'Campaigns':
        return <Campaign/>
      default:
        break;
    }
  }

  const handleExit =async()=>{
    try {
      await axios.delete('https://hazar-nodejs-mysql.herokuapp.com/logout');
      navigate("/");
  } catch (error) {
      console.log(error);
  }
  }
  

  return (
    <div style={{height:"100vh"}}>
      {/* Header */}
      <div style={{display:'flex', padding:'1.5rem 1rem ',borderBottom:'1px solid #ccc'}}>
        <div >
          <img style={{width:'120px'}} src={Logo} alt='justlend-logo.png'/>
        </div>
        <div onClick={handleClick} style={{cursor:'pointer',marginLeft:'auto',display:'flex'}}>
            <span>Ben Keough</span> 
            <i 

              style={{alignSelf:'center', paddingLeft:'5px'}}>
                <MdExpandMore/>
            </i>
        </div>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography onClick={handleExit} sx={{py:1 ,px:2}}>Logout</Typography>
      </Popover>
      </div>
      <div style={{display:'flex'}}>
        <Sidebar icons={icons} activeItem={activeItem} setActiveItem={setActiveItem}/>
        {renderCurrentTab()}
      </div>
     
    </div>
  )
}
export default Home
