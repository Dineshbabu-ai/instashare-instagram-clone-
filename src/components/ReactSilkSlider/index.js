import './index.css'
import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

const apiConstants = {
  initial: 'INITIAL',
  inProcess: 'IN_PROCESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class ReactSilkSlider extends Component {
  state = {storiesList: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getStoriesData()
  }

  updatedFetchedData = updateData => {
    const updateDataFetched = {
      total: updateData.total,
      usersStories: updateData.users_stories.map(eachItem => ({
        userId: eachItem.user_id,
        storyUrl: eachItem.story_url,
        userName: eachItem.user_name,
      })),
    }
    return updateDataFetched
  }

  getStoriesData = async () => {
    this.setState({apiStatus: apiConstants.inProcess})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updateListData = this.updatedFetchedData(data)
      this.setState({
        storiesList: updateListData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderUiAsApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProcess:
        return <h1>Loading</h1>
      case apiConstants.failure:
        return <h1>failure</h1>
      case apiConstants.success:
        return <h1>success</h1>
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderUiAsApiStatus()}</div>
  }
}

export default ReactSilkSlider
