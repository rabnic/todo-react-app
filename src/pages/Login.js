import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Header from '../components/Header'
export default function Login({ setUserState }) {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const routeToRegister = () => {
        navigate('/register')
    }
    useEffect(() => {
        const q = new URLSearchParams(location.search)

    }, [])
    console.log(params);
  return (
    <>
      <Header />
        {/* <div>Login</div>
        <input type={'button'} value="Reroute" onClick={() => setUserState(true)}/>
        <input type="button" value="Go to Register" onClick={() => routeToRegister()} /> */}
    </>
 
  )
}
