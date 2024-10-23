import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import Loader from 'react-loader-spinner'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeTabId: 'ALL',
    isLoading: true,
    reposList: [],
    dataStatus: false,
  }
  componentDidMount() {
    this.setState({activeTabId: languageFiltersData[0].id}, this.getReposData)
  }
  changeTabId = id => {
    this.setState({activeTabId: id}, this.getReposData)
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something Went Wrong</p>
    </div>
  )
  renderSuccessView = () => {
    const {reposList} = this.state
    console.log(reposList)
    return (
      <ul className="repos-container">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} eachRepo={eachRepo} />
        ))}
      </ul>
    )
  }
  onGetSuccess = data => {
    const fetchedData = data.popular_repos
    const updatedData = fetchedData.map(eachRepo => ({
      name: eachRepo.name,
      id: eachRepo.id,
      issuesCount: eachRepo.issues_count,
      forksCount: eachRepo.forks_count,
      starsCount: eachRepo.stars_count,
      avatarUrl: eachRepo.avatar_url,
    }))
    this.setState(
      {isLoading: false, reposList: updatedData, dataStatus: true},
      this.renderSuccessView,
    )
  }
  onGetFailure = () => {
    this.setState({isLoading: false, dataStatus: false}, this.renderFailureView)
  }
  getReposData = async () => {
    this.setState({isLoading: true})
    const {activeTabId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    this.onGetSuccess(data)
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderReposView = () => {
    const {dataStatus} = this.state
    return dataStatus ? this.renderSuccessView() : this.renderFailureView()
  }
  render() {
    const {activeTabId, isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-item-section">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              eachItem={eachItem}
              isActiveLanguagebutton={eachItem.id === activeTabId}
              changeTabId={this.changeTabId}
            />
          ))}
        </ul>
        {isLoading ? this.renderLoadingView() : this.renderReposView()}
      </div>
    )
  }
}

export default GithubPopularRepos
