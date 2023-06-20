import React from 'react'
import { Link } from 'react-router-dom'


export default function Home({currentUser}) {
  return (
    <>
        <div className='container home'>
            <h1>Hi, Nicholas</h1>
            <h2>Here are your todo tasks:</h2>
            <div className='todos-container'>
                <div className='todo-card'>
                  <input type='checkbox' className='check-done'/>
                  Task one
                </div>
                
            </div>
        </div>
    </>

  )
}
