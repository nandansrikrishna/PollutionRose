import { useState } from 'react'


function Header(){
    return (
      <>
      <div className="header-logo"><img src=''></img></div>
      <div className="header-content">
        <span className="header-element">Station Name: --Placeholder name-- </span>
        <span className="header-element">Station County: --Placeholder county--</span>
        <span className="header-element">Station State: --Placeholder state-- </span>
        <button className="header-element">Select New Station</button>
        <span className='header-element'></span>
        <button className="header-element">More Station Info</button>
      </div>
      </>
    )
  }
  
  export default Header