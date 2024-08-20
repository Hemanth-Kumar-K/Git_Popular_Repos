import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusglobal = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}
// Write your code here

class GithubPopularRepos extends Component {
  state = {
    selected: languageFiltersData[0].id,
    fetchedata: [],
    status: statusglobal.initial,
  }

  componentDidMount() {
    this.fetchdata()
  }

  fetchdata = async () => {
    this.setState({
      status: statusglobal.loading,
    })
    const {selected} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${selected}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updateddata = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))

      this.setState({
        fetchedata: updateddata,
        status: statusglobal.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        status: statusglobal.fail,
      })
    }
  }

  select = id => {
    this.setState(
      {
        selected: id,
      },
      this.fetchdata,
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccess = () => {
    const {fetchedata} = this.state
    // console.log(fetchedata)
    return (
      <ul>
        {fetchedata.map(each => (
          <RepositoryItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div>
      <h1>Fail</h1>
    </div>
  )

  renderData = () => {
    const {status} = this.state
    switch (status) {
      case statusglobal.success:
        return this.renderSuccess()
      case statusglobal.fail:
        return this.renderFailure()
      case statusglobal.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {selected} = this.state

    return (
      <div className="bgcontainer">
        <div>
          <h1 className="popular">Popular</h1>
        </div>
        <ul>
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              details={each}
              select={this.select}
              selected={selected === each.id}
            />
          ))}
        </ul>
        {this.renderData()}
      </div>
    )
  }
}

export default GithubPopularRepos
