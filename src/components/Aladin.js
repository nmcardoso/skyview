import { useEffect, useRef } from "react"
import AladinSingleton from "../core/AladinSingleton"
import PointerWidget from "./PointerWidget"
import { ACTIONS, useApp } from "../core/AppContext"
import FilterWidget from "./FilterWidget"
import { useSearchParams } from "react-router-dom"
import ShareWidget from "./ShareWidget"
import CompactToastWidget from "./CompactToastWidget"

// AladinLite API URL: https://aladin.u-strasbg.fr/AladinLite/doc/API/

function Aladin() {
  const [appState, appDispatch] = useApp()
  const mapRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const aladin = new AladinSingleton()
    aladin.init()
    aladin.setMapRef(mapRef)

    if (searchParams.has('target')) {
      aladin.A.gotoObject(searchParams.get('target'), console.log)
    }

    if (searchParams.has('fov')) {
      aladin.A.setFov(searchParams.get('fov'), console.log)
    }
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
      <ShareWidget />
      <CompactToastWidget />
    </div>
  )
}

export default Aladin
