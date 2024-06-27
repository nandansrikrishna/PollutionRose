import { useState } from 'react'


function Header(){
    return (
      <>
      <div className='navbar'>
      <div className="logo"><img src='leaf-logo.png'/><span>Detroit Air - Rose</span></div>
      <ul>
        <li><a className="navbar-item" href='SOMEWERE EVENTUALLY'>Meteorological Data</a></li>
        <li><a className="navbar-item" href='SOMEWERE EVENTUALLY'>About</a></li>
        <li><a className="navbar-item" href='SOMEWERE EVENTUALLY'>FAQ</a></li>
      </ul> 
      </div>
      </>
    )
  }
  
  export default Header