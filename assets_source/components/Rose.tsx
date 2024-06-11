import React, { } from 'react'

const Rose: React.FC<{inputsJSON: Record<string, unknown>}> = ({inputsJSON}) => {
    return (
      <>
      <div id="chartDiv" className="rose">
        {JSON.stringify(inputsJSON)}
      </div>
      </>
    )
  }
  
  export default Rose