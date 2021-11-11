import './ObjectInfo.css'
import SloanService from '../services/SloanService'
import { ACTIONS, useApp } from '../core/AppContext'
import ObjectInfoTabs from './ObjectInfoTabs'

const sdssSpecFactory = (ra, dec) => {
  return async () => {
    const sloanService = new SloanService()
    const id = await sloanService.getSpecId({ ra, dec })
    if (id) {
      return `https://skyserver.sdss.org/dr16/en/get/SpecById.ashx?id=${id}`
    } else {
      throw new Error('undefined specId')
    }
  }
}

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

        {/* Tabs */}
        <ObjectInfoTabs />

      </div>
    </div>
  )
}

export default ObjectInfo
