// Write your code here
import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  selectedthisitem = () => {
    const {select, details} = this.props
    select(details.id)
  }

  render() {
    const {details, selected} = this.props
    const buttonSrc = selected ? 'selected' : null
    return (
      <li>
        <button
          className={`language ${buttonSrc}`}
          onClick={this.selectedthisitem}
          type="button"
        >
          {details.language}
        </button>
      </li>
    )
  }
}
export default LanguageFilterItem
