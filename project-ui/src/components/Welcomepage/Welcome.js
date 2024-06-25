import React from 'react';
import { Link } from 'react-router-dom';
import "../Welcomepage/welcomepage.css";

const Welcome = () => {
    return (
        <div className="welcome-page">
          
            <div className='left-side'>
                <h1>Welcome to Jobscanner.ai</h1>
        

            </div>

            <div className='right-side'>
              <div>
                <h1 style={{fontSize:"28px", alignContent:"center", textAlign:"center"}}classname="Headingright">Discover Your Dream Career</h1>
              </div>
              <Link  to="/Signup">
                <div className='Signupbutton btn'>
                    <span className='Signuptext' >Signup</span>
                </div> 
                </Link>
                <Link  to="/Login" ></Link>
                <div className='Loginbutton btn'>
                    <span className='Logintext'>Login</span>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
