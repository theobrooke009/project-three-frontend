import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'

// import NavBar from './components/common/Navbar.js'
import Home from './components/common/Home.js'
import Movies from './components/Movies.js'
import Register from './components/common/Register.js'
import Login from './components/common/Login.js'
import Marathon from './components/Marathon.js'
import MovieProfile from './components/MovieProfile.js'
import Lists from './components/lib/Lists.js'
import RecentlyAdded from './components/lib/RecentlyAdded.js'
import MarathonGenerator from './components/MarathonGenerator.js'
import UserProfile from './components/UserProfile.js'
import Splash from './components/common/Splash.js'

function App() {

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/movies')
      console.log(res.data)
    }
    getData()
  })
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
          <Lists />
        </Route>
        <Route path="/marathongenerator">
          <MarathonGenerator />
        </Route>
        <Route path="/marathon">
          <Marathon />
        </Route>
        <Route path="/user/:userId">
          <UserProfile />
        </Route>
        <Route path="/register">
          <Register />
          <RecentlyAdded />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/splash">
          <Splash />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App