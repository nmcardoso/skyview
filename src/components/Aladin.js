import { useEffect, useRef } from "react"
import AladinSingleton from "../core/AladinSingleton"
import PointerWidget from "./PointerWidget"
import { ACTIONS, useApp } from "../core/AppContext"
import FilterWidget from "./FilterWidget"
import CompactToastWidget from "./CompactToastWidget"

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
      <PointerWidget />
      <FilterWidget />
      <CompactToastWidget />
    </div>
  )
}

export default Aladin
