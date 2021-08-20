import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Navbar.js'
import Home from './components/common/Home'
import Movies from './components/Movies.js'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App