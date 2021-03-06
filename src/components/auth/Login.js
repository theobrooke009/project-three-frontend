import React from 'react'
import { useHistory } from 'react-router'

import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'

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
      const { data } = await loginUser(formData)
      setToken(data.token)
      history.push('/')
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <p className="title has-text-centered has-text-white">Welcome Back</p>
        <p className="title has-text-centered has-text-white is-size-5">Enter your email & password to start binge-ing</p>
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label has-text-white">Email</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-white">Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
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
              <button type="submit" className="button is-fullwidth is-danger">
                Log In Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login