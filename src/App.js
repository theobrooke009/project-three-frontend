import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import NavBar from './components/common/Navbar.js'
import Home from './components/common/Home.js'
import Movies from './components/Movies.js'
import Register from './components/common/Register.js'
import Login from './components/common/Login.js'
import Marathon from './components/Marathon.js'
import MovieProfile from './components/MovieProfile.js'

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/movies/:movieId">
          <MovieProfile />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/marathon">
          <Marathon />
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