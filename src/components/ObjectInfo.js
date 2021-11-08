import './ObjectInfo.css'
import { ACTIONS, useApp } from '../core/AppContext'
function ObjectInfo() {
  const [appState, appDispatch] = useApp()

  const width = appState.objectInfo.open ? '400px' : '0px'

  const handleCloseButton = (e) => {
    appDispatch({
      type: ACTIONS.OBJECT_INFO.CLOSE
    })
  }

  return (
    <div className="object-info" style={{ width }}>
      <div className="m-2">
        {/* Header  */}
        <div className="d-flex justify-content-between align-items-center header">
          <span className="d-block">Object Info</span>
          <button
            className="closebtn d-block"
            onClick={handleCloseButton}>
            &times;
          </button>
        </div>
      </div>
    </div>
  )
}

export default ObjectInfo
