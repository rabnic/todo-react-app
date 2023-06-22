import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
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
    let loggedInUser = localStorage.getItem('loggedInUser') || null;

    if ((typeof storedData) == 'object') {
      setTodolistDB(storedData);
      localStorage.setItem('todolistDB', JSON.stringify(storedData));
    } else {
      setTodolistDB(JSON.parse(storedData));
    }

    if(loggedInUser === null || loggedInUser === 'null') {
      setCurrentUser(null);
      localStorage.setItem('loggedInUser', JSON.stringify(null));
    } else {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(loggedInUser))
      
    }
    // console.log('empty useeffect')

  }, []);

  useEffect(() => {
    todolistDB && localStorage.setItem('todolistDB', JSON.stringify(todolistDB));
    // const userEmail = JSON.parse(localStorage.getItem('loggedInUser'));
    // todolistDB && setCurrentUser(todolistDB[userEmail]);
    if(currentUser) {
      // console.log('there is current user');
      localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
      // setTodolistDB({...todolistDB, [currentUser.email]: currentUser})
      setIsLoggedIn(true);
      // console.log(isLoggedIn);
    } 
    // localStorage.getItem('loggedInUser') && localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
    
    
    
  }, [todolistDB, currentUser])

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
      localStorage.setItem('loggedInUser', JSON.stringify(null));
    
  }

  const currentUserUpdated = (updatedUser) => {
    setTodolistDB({...todolistDB, [currentUser.email]: currentUser})
    console.log('App.js updatedUser', updatedUser);
  }

  return (
    <Router>
      <Header currentUser={currentUser} logout={logout}/>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home currentUser={currentUser} setCurrentUser={setCurrentUser} currentUserUpdated={currentUserUpdated}/> : <Navigate to='/login' />} />
        <Route path='/login' element={isLoggedIn ?  <Navigate to='/' /> : <Login login={login} />} />
        <Route path='/register' element={isLoggedIn ? <Home /> : <Register registerNewUser={registerNewUser} />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
