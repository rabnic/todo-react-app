import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';

import Header from './components/Header';

function App() {

  const [todolistDB, setTodolistDB] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    let storedData = localStorage.getItem('todolistDB') || {};
    if ((typeof storedData) == 'object') {
      setTodolistDB(storedData);
      localStorage.setItem('todolistDB', JSON.stringify(storedData));
    } else {
      setTodolistDB(JSON.parse(storedData));
    }

  }, []);

  useEffect(() => {
    todolistDB && localStorage.setItem('todolistDB', JSON.stringify(todolistDB));
  }, [todolistDB])

  const registerNewUser = (newUser) => {
    setTodolistDB({ ...todolistDB, [newUser.email]: newUser })
  }

  const login = (email, password) => {
    const userMatched = todolistDB[email];
    if (!userMatched) return false;
    if (userMatched.password === password) {
      setCurrentUser(userMatched)
      setIsLoggedIn(true)
      return true;
    } else {
      return false;
    }
  }

  const logout = () => {
      setCurrentUser(null);
      setIsLoggedIn(false)
  }

  return (
    <Router>
      <Header currentUser={currentUser} logout={logout}/>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home currentUser={currentUser} /> : <Navigate to='login' />} />
        <Route path='/login' element={<Login login={login} />} />
        <Route path='/register' element={isLoggedIn ? <Home /> : <Register registerNewUser={registerNewUser} />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
