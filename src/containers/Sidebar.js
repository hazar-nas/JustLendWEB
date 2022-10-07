import React from 'react'

function Sidebar({activeItem, setActiveItem,icons}) {

  const handleChange = (e)=>{
    setActiveItem(e)
  }

 

  return (
    <div style={{width:'13%',borderRight:'1px solid #ccc',height:'100%'}}>
      <div className='sidebar-icons-container'>
        {icons.map((icon)=>(
           
            <div onClick={()=>handleChange(icon.iconName)}  key={icon.id} className={'icon-container'}>
              <icon.icon size="1.6em" color={activeItem === icon.iconName ? '#78eac1' : '#ccc'}/>
              <span className={activeItem === icon.iconName ? 'icon-name--span--active': 'icon-name--span'} >{icon.iconName}</span>
            </div>
          
        ))}
        
      </div>
    </div>
  )
}

export default Sidebar
