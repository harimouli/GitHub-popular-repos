import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, isActiveLanguagebutton, changeTabId} = props
  const {id, language} = eachItem
  const onClickChangeTab = () => {
    changeTabId(id)
  }
  const buttonClassName = isActiveLanguagebutton
    ? 'language-filter-button active-language-button'
    : 'language-filter-button'
  return (
    <li className="language-filter-item">
      <button className={buttonClassName} onClick={onClickChangeTab}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
