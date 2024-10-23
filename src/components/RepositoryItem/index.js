import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachRepo

  return (
    <li className="repo-item-container">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="name">{name}</h1>
      <div className="info-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="info-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="info-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
