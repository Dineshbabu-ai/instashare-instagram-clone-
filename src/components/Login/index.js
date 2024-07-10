import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMessg: '',
    redirectToHome: false,
  }

  setJwtTokenInCookies = jwtToken => {
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({redirectToHome: true})
  }

  handleGetJwtToken = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      this.setJwtTokenInCookies(data.jwt_token)
    } else {
      this.setState({errorMessg: data.error_msg})
    }
  }

  handleUserinput = event => {
    this.setState({username: event.target.value})
  }

  handlePasswordinput = event => {
    this.setState({password: event.target.value})
  }

  handleShowPassword = event => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {redirectToHome, errorMessg, showPassword} = this.state
    const inputType = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (redirectToHome || jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="illution-image-container">
          <img
            src="https://res.cloudinary.com/dxxexodjx/image/upload/v1720611865/Illustration_1_butvmo.png"
            alt="illution"
            className="illution-image"
          />
        </div>
        <div className="login-card-main-con">
          <img
            src="https://res.cloudinary.com/dxxexodjx/image/upload/v1720600610/Standard_Collection_8_2x_orexjz.png"
            alt="insta logo"
            className="instashare-logo"
          />
          <h2>Insta Share</h2>
          <div className="login-card-container">
            <form onSubmit={this.handleGetJwtToken}>
              <label htmlFor="userNameId" className="username-label">
                USERNAME
              </label>
              <input
                type="text"
                id="userNameId"
                className="username-input"
                onChange={this.handleUserinput}
              />

              <label htmlFor="passwordId" className="password-label">
                PASSWORD
              </label>
              <input
                type={inputType}
                id="passwordId"
                className="password-input"
                onChange={this.handlePasswordinput}
              />
              <input
                type="checkbox"
                id="showPasswordId"
                onChange={this.handleShowPassword}
              />
              <label htmlFor="showPasswordId">Show Password</label>
              <p className="error-msg">{errorMessg}</p>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
