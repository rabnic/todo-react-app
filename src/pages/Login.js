import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams, useLocation, Link, Navigate } from 'react-router-dom'

export default function Login({ login }) {
  // const params = useParams()
  const navigate = useNavigate()
  // const location = useLocation()

  // const routeToRegister = () => {
  //   navigate('/register')
  // }

  // useEffect(() => {
  //   const q = new URLSearchParams(location.search)

  // }, [])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault();
    const isLoggedIn = login(email, password);
    const statusElement = document.getElementById('login-status');
    console.log(isLoggedIn);
    if (isLoggedIn) {
      statusElement.textContent = 'Login successful!!!';
      statusElement.style.color = 'var(--green)';
      clearFields();
      setTimeout(() => {
        navigate('/')
      }, 1000);
    } else {
      statusElement.textContent = 'You have entered an invalid username or password';
      statusElement.style.color = 'red';
    }
  }

  const clearFields = () => {
    Array.from(document.querySelectorAll('.register input')).forEach(elem => {
      elem.value = '';
    })
  }
 
  return (
    <>
      <div className='container login'>
        <h1>Login</h1>
        <p>Login now to track and manage all your todo list</p>
        <form onSubmit={handleLogin}>
          <label>Email
            <input type='email' name='email' placeholder='johnd@example.com' onChange={(e) => {setEmail(e.target.value)}}/>
          </label>
          <label>Password
            <input type='password' name='password' placeholder='*******' onChange={(e) => {setPassword(e.target.value)}}/>
          </label>
          <p id='login-status'></p>
          <button>Login</button>
        </form>
        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </div>
      {/* <div>Login</div>
        <input type={'button'} value="Reroute" onClick={() => setUserState(true)}/>
        <input type="button" value="Go to Register" onClick={() => routeToRegister()} /> */}
    </>

  )
}
