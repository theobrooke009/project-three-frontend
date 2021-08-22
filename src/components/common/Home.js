import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../lib/auth'

function Home() {

  const isAuth = isAuthenticated()
  const history = useHistory()

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <p className="title is-1 has-text-centered has-text-white">
            Welcome To Binge
          </p>
          <div className="buttons is-centered">
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
    </section>
  )
}

export default Home