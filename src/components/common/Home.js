import React from 'react'
// import { Link, useHistory } from 'react-router-dom'
// import { isAuthenticated, removeToken } from '../lib/auth'

import logo from '../../images/binge-white.png'

function Home() {
  // const isAuth = isAuthenticated()
  // const history = useHistory()
  // const handleLogout = () => {
  //   removeToken()
  //   history.push('/')
  // }
  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFromErrors] = React.useState(initialState)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await registerUser(formData)
      history.push('/login')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    
    <section className="main uk-height-viewport">
      <div className="uk-container-large uk-height-1-1">
        <div className="home-container uk-position-center">
          <p className="welcome uk-text-center">
              Welcome To
          </p>
          <div className="binge-logo">
            <img src={logo} alt="Welcome To Binge"/>
            <div className="home-buttons">
              <div className="field">
                <button type="button" className="uk-button uk-button-large uk-button-danger uk-width-1-1 uk-margin-medium-top uk-margin-small-bottom"><a href="/login">Login</a>
                </button>
              </div>
              <div className="field">
                <button type="button" className="uk-button uk-button-large uk-button-link uk-width-1-1 uk-margin-small-top"><a href="/register">Register</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  )
}
export default Home