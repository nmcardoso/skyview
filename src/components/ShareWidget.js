import './ShareWidget.css'
import AladinSingleton from '../core/AladinSingleton'
import { BsLink } from 'react-icons/bs'
import { ACTIONS, useApp } from '../core/AppContext'
import { getCurrentPath } from '../core/utils'


const aladin = new AladinSingleton()

function ShareWidget() {
  const [appState, appDispatch] = useApp()

  const handleClick = () => {
    const [ra, dec] = aladin.A.getRaDec()
    const currPath = getCurrentPath()
    const target = `${Number(ra).toFixed(5)}%20${Number(dec).toFixed(5)}`
    let [fov] = aladin.A.getFov()
    fov = Number(fov).toFixed(7)
    const url = `${currPath}?target=${target}&fov=${fov}`
    console.log(navigator.clipboard.writeText(url))
    appDispatch({
      type: ACTIONS.WIDGET.COMPACT_TOAST.TOGGLE,
      data: {
        text: 'Current position url copied to clipboard'
      }
    })
  }

  return (
    <div className="share-widget-container" onClick={handleClick}>
      <div className="share-widget">
        <BsLink style={{ width: '100%', height: '100%', padding: '4px' }} />
      </div>
    </div>
  )
}

export default ShareWidget
