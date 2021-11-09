import { useState } from 'react'
import { useApp } from '../core/AppContext'
import RGBImagesTab from './RGBImagesTab'
import SpectraTab from './SpectraTab'


function withTabVisibility(WrappedComponent, ra, dec, show) {
  return (
    <div style={{ display: show ? 'block' : 'none' }}>
      <WrappedComponent ra={ra} dec={dec} />
    </div>
  )
}


function ObjectInfoTabs() {
  const [tabIndex, setTabIndex] = useState('0')
  const [appState] = useApp()
  const { ra, dec } = appState.objectInfo

  const handleTabIndexChange = e => {
    setTabIndex(e.target.value)
  }

  return (
    <>
      {/* Selector */}
      <div className="mb-3 row">
        <label
          for="nav-tab-selector"
          className="col-sm-3 col-form-label">
          Category
        </label>
        <div className="col-sm-9">
          <select
            id="nav-tab-selector"
            className="form-select"
            aria-label="Category"
            value={tabIndex}
            onChange={handleTabIndexChange}>
            <option value="0">Spectra</option>
            <option value="1">RGB Images</option>
            <option value="2">Catalog</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div id="nav-tab-content" className="tabs">
        {withTabVisibility(SpectraTab, ra, dec, tabIndex === '0')}
        {withTabVisibility(RGBImagesTab, ra, dec, tabIndex === '1')}
      </div>
    </>
  )
}

export default ObjectInfoTabs
