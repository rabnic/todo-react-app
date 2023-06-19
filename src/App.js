import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

  const [isLoggedIn, setUserState] = useState(true)

  return (
    <Router>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login"/> } />
        <Route path='/login/' element={ !isLoggedIn ? <Login setUserState={setUserState} /> : <Navigate to="/"/> } />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
