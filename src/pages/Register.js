import React, { useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'

export default function Register({ registerNewUser }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    tasks: []
  })

  const handleInputChange = (e) => {
    const property = e.target.name;
    setUser({ ...user, [property]: e.target.value })
  }

  const handleRegisterNewUser = (e) => {
    e.preventDefault();
    registerNewUser(user);
    clearFields();
    navigate('/login')
  }

  const clearFields = () => {
    Array.from(document.querySelectorAll('.register input')).forEach(elem => {
      elem.value = '';
    })
  }


  return (
    <>
      <div className='container register'>
        <h1>Register</h1>
        <p>Create an account to have control to to all your todo tasks</p>
        <form onSubmit={handleRegisterNewUser}>
          <label>Full Name<br />
            <input type='text' name='fullName' placeholder='John Doe' required onChange={handleInputChange} />
          </label>
          <label>Email<br />
            <input type='email' name='email' placeholder='johnd@example.com' required onChange={handleInputChange} />
          </label>
          <label>Password<br />
            <input type='password' name='password' placeholder='John Doe' required onChange={handleInputChange} />
          </label>
          <button>Register</button>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </form>
      </div>
    </>
  )
}
