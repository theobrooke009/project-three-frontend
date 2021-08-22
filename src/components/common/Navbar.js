import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../lib/auth'

function Navbar() {

  const isAuth = isAuthenticated()
  const history = useHistory()

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    <navbar>
      <div className="navbar is-dark">
        <div className="navbar-container">
          <div className="navbar-item logo"> 
            <img src="../components/images/binge-white.png"></img>
            <div className="buttons">
              {!isAuth && (
                <>
                  <Link to="/register" exact className="button is-danger">
                  Register
                  </Link>
                  <Link to="/login" exact className="button is-danger">
                  Login
                  </Link>
                </>
              )}
              {isAuth && (
                <button className="button is-warning" onClick={handleLogout}>
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </navbar>
  )
}

export default Navbar