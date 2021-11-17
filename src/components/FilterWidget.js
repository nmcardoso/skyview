import './FilterWidget.css'

import { BsSliders } from 'react-icons/bs'
import WidgetPopup from './WidgetPopup'
import { useState, useEffect } from 'react'
import AladinSingleton from '../core/AladinSingleton'

function createFilter(filters, parsers) {
  return Object.entries(filters).map(([k, v]) => `${k}(${parsers[k](v)})`).join(' ')
}

function FilterControl({ label, min, max, value, step, onChange, parser }) {
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

        <span className="ms-2">{parser(value)}</span>
      </div>
    </div>
  )
}

const filterDefaults = {
  brightness: 14.5,
  contrast: 1.17,
  saturate: 0.93,
  'hue-rotate': 0,
  invert: 0,
  grayscale: 0
}

const filterCssParsers = {
  brightness: (v) => v,
  contrast: (v) => v,
  saturate: (v) => v,
  'hue-rotate': (v) => `${v}deg`,
  invert: (v) => v,
  grayscale: (v) => v
}

const degreeParser = (v) => `${Number(v).toFixed(0)}\u00b0`
const numberParser = (v) => Number(v).toFixed(2)


function FilterWidget() {
  const [showPopup, setShowPopup] = useState(false)
  const [filterValues, setFilterValues] = useState(filterDefaults)

  const handlePopupToggle = (e) => {
    setShowPopup(!showPopup)
  }

  useEffect(() => {
    const aladin = new AladinSingleton()
    if (aladin.mapRef && aladin.mapRef.current) {
      aladin.mapRef.current.querySelector('.aladin-imageCanvas').style.filter =
        createFilter(filterValues, filterCssParsers)
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
        <div className="px-1 pt-1">
          <FilterControl
            label="Brightness"
            min={0}
            max={40}
            step={0.01}
            parser={numberParser}
            value={filterValues.brightness}
            onChange={handleChangeFactory('brightness')} />

          <FilterControl
            label="Contrast"
            min={0}
            max={5}
            step={0.01}
            parser={numberParser}
            value={filterValues.contrast}
            onChange={handleChangeFactory('contrast')} />

          <FilterControl
            label="Saturate"
            min={0}
            max={10}
            step={0.01}
            parser={numberParser}
            value={filterValues.saturate}
            onChange={handleChangeFactory('saturate')} />

          <FilterControl
            label="Hue"
            min={0}
            max={360}
            step={1}
            parser={degreeParser}
            value={filterValues['hue-rotate']}
            onChange={handleChangeFactory('hue-rotate')} />

          <FilterControl
            label="Invert"
            min={0}
            max={1}
            step={0.01}
            parser={numberParser}
            value={filterValues.invert}
            onChange={handleChangeFactory('invert')} />

          <FilterControl
            label="Gray"
            min={0}
            max={1}
            step={0.01}
            parser={numberParser}
            value={filterValues.grayscale}
            onChange={handleChangeFactory('grayscale')} />

          <a href="javascript:void(0)" onClick={handleResetDefault}>Reset default</a>
        </div>
      </WidgetPopup>
    </>
  )
}

export default FilterWidget
