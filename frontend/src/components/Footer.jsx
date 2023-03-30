import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      
      
          copyright&copy;{new Date().getFullYear()}
          <span>WebDev</span> &nbsp;<br/><span> all rights reserved</span>
          <span> &nbsp; developed by 
            <span> <a href="https://navisoftwares.org">navi </a>  </span>
          </span>
       
    </div>
  )
}

export default Footer