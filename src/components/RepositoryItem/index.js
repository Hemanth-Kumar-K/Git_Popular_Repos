// Write your code here
import {Component} from 'react'
import './index.css'

class RepositoryItem extends Component {
  render() {
    const {details} = this.props
    return (
      <li className="repoitem">
        <img src={details.avatarUrl} width="120" alt={details.name} />
        <h1 className="reponame">{details.name}</h1>
        <div>
          <div className="one">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              alt="stars"
              width="20"
              height="20"
            />
            <p className="stars">{details.starsCount} stars</p>
          </div>
          <div className="one">
            <img
              src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
              alt="forks"
              width="20"
              height="20"
            />
            <p className="stars">{details.forksCount} forks</p>
          </div>
          <div className="one">
            <img
              src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
              alt="open issues"
              width="20"
              height="20"
            />
            <p className="stars">{details.issuesCount} open issues</p>
          </div>
        </div>
      </li>
    )
  }
}
export default RepositoryItem
