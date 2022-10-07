import React from 'react'
// import Sidebar from './Sidebar'

import BasicTabs from '../components/BasicTabs';
import Tablee from './Table';

const campaignTabs = [
    {
      label: "Live Unfunded",
      Component: <Tablee/>
    },
    {
      label: "Pledged",
      Component: <div>Hello, I am tab 2</div>
    },
    {
      label: "Funded",
      Component: (
        <div>
          <h1>Tab with heading</h1>
          <p>Hello I am a tab with a heading</p>
        </div>
      )
    },
    {
      label: "Withdrawn",
      Component: (
        <div>
          <h1>Withdrawn tab</h1>
        </div>
      )
    },
    {
      label: "Repaid",
      Component: (
        <div>
          <h1>Repaid tab</h1>
        </div>
      )
    },
    {
      label: "Closed",
      Component: (
        <div>
          <h1>Closed tab</h1>
        </div>
      )
    },
  ];
  
function Campaign() {
  return (
      <>
      <div style={{display:'flex',width:'87%'}}>
        {/* <Sidebar/> */}
        {/* Content */}
        <div style={{ padding:"2rem 5rem",display:'flex',flexDirection:'column',width:'100%'}}>
          <h2 >Campaigns</h2>
          <p style={{marginTop:"-12px",color:'#ccc',fontSize:"17px"}}>Subtitle about this section and maybe some help about this page</p>
          <div style={{width:'100%'}}>
            <BasicTabs tabs={campaignTabs} />
          </div>
        </div> 
      </div>
      </>
  )
}

export default Campaign
