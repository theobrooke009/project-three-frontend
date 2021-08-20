import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'

function Navbar() {

  const isAuth = isAuthenticated()
  const history = useHistory()

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    <nav>
      <div className="navbar-is-dark">
        <div className="navbar-container">
          <div className="logo" img src="/">
            <div className="buttons">
              {!isAuth && (
                <>
                  <Link to="/register" exact className="button is-warning">
                  Register
                  </Link>
                  <Link to="/login" exact className="button is-warning">
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
    </nav>
  )
}

export default Navbar