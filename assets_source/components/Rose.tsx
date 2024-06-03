import React, { useState } from 'react'

const Rose: React.FC = () => {
  const reset = () => window.location.reload()
    return (
      <>
      <p></p>
      <div> 
        <button onClick={reset}>Reset</button>
 
      </div>
      <div id="chartDiv" className="rose">
        <p>rose img</p>
      </div>
      </>
    )
  }
  
  export default Rose