import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

<<<<<<< HEAD
import Navbar from './components/common/Navbar.js'
import Home from './components/common/Home.js'
import Movies from './components/Movies.js'
import Register from './components/auth/Register.js'
import Login from './components/auth/Login.js'
=======
import NavBar from './components/common/Navbar.js'
import Home from './components/common/Home.js'
import Movies from './components/Movies.js'
import Register from './components/common/Register.js'
import Login from './components/common/Login.js'
>>>>>>> development

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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