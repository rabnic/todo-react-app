import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'

export default function Home() {
  return (
    <>
        <Header />
        <div className='container'>
            <h1>Good Day, Nicholas</h1>
            <h2>Here are your todo tasks:</h2>
            <div className='todos-container'>
                <div className='todo-card'>Todo item</div>
                <div className='todo-card'>Todo item</div>
                <div className='todo-card'>Todo item</div>
            </div>
        </div>
    </>

  )
}
