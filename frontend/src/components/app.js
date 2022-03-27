import React, {useEffect, useState } from 'react';
import { useRoutes } from 'hookrouter';
import Home from './pages/home';
import NavBar from './navigation/NavBar';
import SignUp from './pages/auth/signUp';
import Login from './pages/auth/login';
import Game from './pages/game';
import Cookies from 'js-cookie';

export default function App() {
  const [ loggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    if(Cookies.get('username')) {
      setLoggedIn(true)
    }
  })

  const logout = () => {
    Cookies.remove('username')
    setLoggedIn(false)
  }

  const routes = {
    '/': () => <Home />,
    '/signup': () => <SignUp />,
    '/login': () => <Login />,
    '/snake': () => <Game />
  }
  const routeResult = useRoutes(routes)
    return (
      <div className='app'>
        <NavBar />
        {routeResult}
      </div>
    );
}
