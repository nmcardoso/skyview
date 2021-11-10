import './FilterWidget.css'

import { BsSliders } from 'react-icons/bs'
import WidgetPopup from './WidgetPopup'
import { useState, useEffect } from 'react'
import AladinSingleton from '../core/AladinSingleton'

function createFilter(filters) {
  const str = Object.entries(filters).map(([k, v]) => `${k}(${v})`).join(' ')
  return str
}

function FilterControl({ label, min, max, value, step, onChange }) {
  return (
    <div className="row mb-1">
      <label className="col-3 d-flex align-items-center">
        {label}
      </label>

      <div className="col-9 d-flex align-items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step={step || 1}
          onChange={onChange} />

        <span className="ms-3">{Number(value).toFixed(2)}</span>
      </div>
    </div>
  )
}

const filterDefaults = {
  brightness: 14.5,
  contrast: 1.17,
  saturate: 0.93,
}


function FilterWidget() {
  const [showPopup, setShowPopup] = useState(false)
  const [filterValues, setFilterValues] = useState(filterDefaults)

  const handlePopupToggle = (e) => {
    setShowPopup(!showPopup)
  }

  useEffect(() => {
    const aladin = new AladinSingleton()
    if (aladin.mapRef && aladin.mapRef.current) {
      aladin.mapRef.current.querySelector('.aladin-imageCanvas').style.filter = createFilter(filterValues)
    }
  })

  const handleChangeFactory = (filter) => {
    return (e) => {
      filterValues[filter] = e.target.value
      setFilterValues({ ...filterValues })
    }
  }

  const handleResetDefault = () => {
    setFilterValues(filterDefaults)
  }

  return (
    <>
      <div className="filter-widget-container" onClick={handlePopupToggle}>
        <div className="filter-widget">
          <BsSliders style={{ width: '100%', height: '100%', padding: '4px' }} />
        </div>
      </div>

      <WidgetPopup
        show={showPopup}
        style={{ top: '144px' }}
        onClose={handlePopupToggle}>
        <div className="pe-2 pt-1">
          <FilterControl
            label="Brightness"
            min={0}
            max={40}
            step={0.01}
            value={filterValues.brightness}
            onChange={handleChangeFactory('brightness')} />

          <FilterControl
            label="Contrast"
            min={0}
            max={5}
            step={0.01}
            value={filterValues.contrast}
            onChange={handleChangeFactory('contrast')} />

          <FilterControl
            label="Saturate"
            min={0}
            max={10}
            step={0.01}
            value={filterValues.saturate}
            onChange={handleChangeFactory('saturate')} />

        </div>
      </WidgetPopup>
    </>
  )
}

export default FilterWidget
