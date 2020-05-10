import React from 'react'


const DashboardView = ({setView}) => {

  return (
    <div>
      <h1>This is the dashboard</h1>
      <button onClick={()=>setView('GAME')}>Go to game</button>
    </div>
  )

};

export default DashboardView;