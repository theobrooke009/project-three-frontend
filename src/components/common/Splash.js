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
        <div className="home-container uk-position-center">
          <div className="marathon uk-text-center">Choose Your Marathon Or Create Your Own!</div>
          <div className="marathon-info uk-text-center">Plan your perfect movie night in with our marathon creator! Browse through marathons users have already created or choose your own!</div>
          <div className="field">
            <button id="marathon-text" href="/marathon" type="button" className="uk-button uk-button-danger uk-button-large uk-width-1-1 uk-margin-small-top uk-margin-small-bottom">
              <a href="/marathon" id="marathon-text" className="uk-button uk-text-danger uk-button-text">Marathon</a>
            </button>
          </div>
          <div className="field">
            <button href="/movies" type="button" className="uk-button uk-button-warning uk-button-large uk-width-1-1 uk-margin-small-top uk-margin-small-bottom">
              <a href="/movies" className="uk-button uk-text-danger uk-button-text">Sprint Now</a>
            </button>
          </div>
        </div>
      </div>

    </section>

  )
}
export default Splash