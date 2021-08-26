import React from 'react'
// import { Link, useHistory } from 'react-router-dom'
// import { isAuthenticated, removeToken } from '../lib/auth'

// import logo from '../../images/binge-white.png'

function Splash() {
  // const isAuth = isAuthenticated()
  // const history = useHistory()
  // const handleLogout = () => {
  //   removeToken()
  //   history.push('/')
  // }
  return (
    
    <section className="main uk-height-viewport">
      <div className="uk-container-large uk-height-1-1">
        <p className="splash-text uk-position-center">
              Marathon or Sprint
        </p>
        <div className="splash-container uk-column-1-2 uk-position-center">
          <div className="uk-card uk-card-default ">
            <div className="uk-card uk-card-secondary">
              <div className="uk-card-header">
                <div className="uk-grid-small uk-flex-middle" uk-grid>
                  <div className="uk-width-auto">
                    <img className="uk-border-circle" width="40" height="40" src="../components/images/marathon.jpg"></img>
                  </div>
                  <div className="uk-width-expand">
                    <h3 className="uk-card-title uk-text-danger uk-margin-remove-bottom">Marathon</h3>
                  </div>
                </div>
              </div>
              <div className="uk-card-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              </div>
              <div className="uk-card-footer">
                <a href="/marathon" className="uk-button uk-text-danger uk-button-text">Lets Do This!</a>


                <div className="uk-card uk-card-secondary">
                  <div className="uk-card-header">
                    <div className="uk-grid-small uk-flex-middle" uk-grid>
                      <div className="uk-width-auto">
                        <img className="uk-border-circle" width="40" height="40" src="images/sprint.jpg"></img>
                      </div>
                      <div className="uk-width-expand">
                        <h3 className="uk-card-title uk-text-success uk-margin-remove-bottom">Sprint</h3>
                      </div>
                    </div>
                  </div>
                  <div className="uk-card-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                  </div>
                  <div className="uk-card-footer">
                    <a href="/movies" className="uk-button uk-text-success uk-button-text">Its Go Time!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  )
}
export default Splash


{/* 
          <div className="home-buttons">
            <div className="field">
              <button type="button" className="uk-button uk-button-large uk-button-danger uk-width-1-1 uk-margin-medium-top uk-margin-small-bottom"><a href="/login">Login</a>
              </button>
            </div>
            <div className="field">
              <button type="button" className="uk-button uk-button-large uk-button-danger uk-width-1-1 uk-margin-medium-top uk-margin-small-bottom"><a href="/register">Register</a>
              </button>
            </div>
          </div>
        </div>
      </div> */}