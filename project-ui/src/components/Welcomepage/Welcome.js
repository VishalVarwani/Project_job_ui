import React from 'react'
import { Link } from 'react-router-dom'
import Signup from '../auth/Signup/Signup'
import "../Welcomepage/welcomepage.css"
const Welcome = () => { 
  return (
    <div className="welcome-page">
        <div className='Careergenieaitext'>
            <h1 className='Careergenieaitext'>Welcome to Careergenie.ai</h1>
        </div>
        <div className='Signuplogin'>
        <div className='Signupbutton'>
      <Link className='Signuptext' to="/Signup">Signup</Link>
      </div> 
    
      <div className='Loginbutton'>
      <Link className='Logintext' to="/Login">Login</Link>
      </div>
      </div>
      
    </div>
  )
}

export default Welcome
