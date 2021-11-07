import { useEffect, useRef } from "react"
import AladinSingleton from "../core/AladinSingleton"
import { ACTIONS, useApp } from "../core/AppContext"
function Aladin() {
  const [appState, appDispatch] = useApp()
  const mapRef = useRef(null)

  useEffect(() => {
    const aladin = new AladinSingleton()
    aladin.init()
    aladin.setMapRef(mapRef)
  }, [])

  const handleMapClick = (e) => {
    e.stopPropagation()
    console.log('handleMapClick')
    if (appState.widget.pointer.selected) {
      console.log('if')
      const aladin = new AladinSingleton()
      const [ra, dec] = aladin.A.pix2world(e.clientX, e.clientY)
      appDispatch({
        type: ACTIONS.OBJECT_INFO.UPDATE,
        path: 'objectInfo',
        data: { open: true, ra, dec }
      })
    }
  }

  return (
    <div
      id="aladin-lite-div"
      style={{ border: 'none' }}
      onClick={handleMapClick}
      ref={mapRef}>
    </div>
  )
}

export default Aladin
