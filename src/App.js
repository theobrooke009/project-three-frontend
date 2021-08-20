import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NavBar from './components/NavBar.js'
import Home from './components/Home.js'
import Movies from './components/Movies.js'
import Register from './components/Register.js'
import Login from './components/Login.js'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
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
