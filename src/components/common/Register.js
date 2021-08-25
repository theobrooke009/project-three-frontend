import React from 'react'
import { registerUser } from '../lib/api.js'
import { useHistory } from 'react-router-dom'
import logo from '../../images/binge-white.png'

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

function Register() {
  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFromErrors] = React.useState(initialState)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFromErrors({ ...formErrors, [e.target.name]: '' })
  }

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
    <section className="main">
      <div className="uk-container-large ">
        <div className="home-container uk-position-center">
          <div className="binge-logo">
            <img src={logo} alt="Welcome To Binge"/>
            <form
              className="column"
              onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className={`uk-input ${formErrors.username ? 'uk-text-warning' : ''}`}
                    placeholder="Username"
                    onChange={handleChange}
                    name="username"
                    value={formData.username}
                  />
                </div>
                {formErrors.username && (
                  <p className="help uk-text-warning">{formErrors.username}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className={`uk-input ${formErrors.email ? 'uk-text-warning' : ''}`}
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                  />
                </div>
                {formErrors.email && (
                  <p className="help uk-text-warning">{formErrors.email}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className={`uk-input ${formErrors.password ? 'uk-text-warning' : ''}`}
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                  />
                </div>
                {formErrors.password && (
                  <p className="help uk-text-warning">{formErrors.password}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    type="password"
                    className={`uk-input ${formErrors.passwordConfirmation ? 'uk-text-warning' : ''}`}
                    placeholder="Password Confirmation"
                    onChange={handleChange}
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                  />      
                </div>
                {formErrors.passwordConfirmation && (
                  <p className="help uk-text-warning">
                    {formErrors.passwordConfirmation}
                  </p>
                )}
              </div>
              <div className="field">
                <button type="submit" className="uk-button uk-button-danger uk-button-large uk-width-1-1 uk-margin-small-top uk-margin-small-bottom">
                Register Me Now!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register