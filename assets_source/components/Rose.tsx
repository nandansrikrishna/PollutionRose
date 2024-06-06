import React, { } from 'react'

const Rose: React.FC<{inputsJSON: Record<string, unknown>}> = ({inputsJSON}) => {
  const reset = () => window.location.reload()
    return (
      <>
      <p></p>
      <div> 
        <button onClick={reset}>Reset</button>
 
      </div>
      <div id="chartDiv" className="rose">
        <p>rose img</p>
        {JSON.stringify(inputsJSON)}
      </div>
      </>
    )
  }
  
  export default Rose