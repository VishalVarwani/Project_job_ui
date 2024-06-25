import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Signup/Signup.css"
import email_icon from '../../../assets/signupform/email.png'
import password_icon from '../../../assets/signupform/password.png'
import googlelogo from "../../../assets/logos/googlelogo.png"
import linkedinlogo from "../../../assets/logos/linkedinlogo.png"
import axios from 'axios'

const Signup = () => {
  const history = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/signup", {
        email,
        password
      })
        .then(res => {
          if (res.data === "exist") {
            alert("User already exists")
          } else if (res.data === "notexist") {
            history("/home", { state: { id: email } })
          }
        })
        .catch(e => {
          alert("Wrong details")
          console.log(e);
        })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='containersignup'>
      <div className='header'>
        <div className='text'>
          Create a new account
        </div>
        <div className='underline'></div>
      </div>
      <form className='inputs' onSubmit={submit}>
        <div className='input'>
          <img src={email_icon} alt='email icon' />
          <input type='email' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='input'>
          <img src={password_icon} alt='password icon' />
          <input type='password' placeholder='Set your new password' required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='submit-container'>
          <button type='submit' className='submit btn'>
            <i className="animation"></i><i className="animation"></i>Sign up
          </button>
        </div>
      </form>
      <div className='loginalready'>
        Are you an existing user?
        <span>
          <Link to="/Login" style={{ textDecoration: "none", color: "#148ecb" }}>Login</Link>
        </span>
      </div>
      <div className='line-container'>
        <div className='text-center'>
          <span className='Ortext'>Or sign up with</span>
        </div>
      </div>
      <div className='orelseimg'>
        <Link className='social-icon'>
          <img className='logo google' src={googlelogo} alt='sign in with google' />
        </Link>
        <Link className='social-icon'>
          <img className='logo linkedin' src={linkedinlogo} alt='sign in with linkedin' />
        </Link>
      </div>
    </div>
  )
}

export default Signup
