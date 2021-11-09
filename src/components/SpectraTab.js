import ImageContainer from './ImageContainer'
import { useCallback } from 'react'

function SpectraTab({ ra, dec }) {
  const splusUrl = `https://splus-spectra.herokuapp.com/plot?ra=${ra}&dec=${dec}&all`
  return (
    <div>
      {/* Image: S-PLUS PhotoSpectra */}
      <div className="section-title">
        S-PLUS PhotoSpectra
      </div>
      <ImageContainer src={splusUrl} />

    </div>
  )
}

export default SpectraTab
