import React from 'react'
import { useHistory } from 'react-router'

import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'
import logo from '../../images/binge-white.png'

function Login() {
  const history = useHistory()
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const [isError, setIsError] = React.useState(false)

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      const { data } = await loginUser(formData)
      setToken(data.token)
      history.push('/movies')
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <section className="main">
      <div className="uk-container-large">
        <div className="home-container uk-position-center">
          {/* <p className="welcome ">
                Login Below!
          </p> */}
          <div className="binge-logo">
            <img src={logo} alt="Welcome To Binge"/>
            <form
              className="column is-half"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="uk-input"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="uk-input"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {isError && (
                <p className="help is-danger">
                  Email or Password were incorrect
                </p>
              )}
              <div className="field">
                <button type="submit" className="uk-button uk-button-danger uk-button-large uk-width-1-1 uk-margin-small-top uk-margin-small-bottom">
                  Log In Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login