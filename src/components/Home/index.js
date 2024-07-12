import './index.css'
import {Component} from 'react'
import Header from '../Header'
import ReactSilkSlider from '../ReactSilkSlider'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {apiStatus: apiConstants.initial}

  render() {
    return (
      <div>
        <Header />
        <ReactSilkSlider />
      </div>
    )
  }
}

export default Home
