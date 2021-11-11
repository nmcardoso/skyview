import ImageContainer from './ImageContainer'
import SloanService from '../services/SloanService'
import { useCallback } from 'react'

function SpectraTab({ ra, dec }) {
  const splusUrl = `https://splus-spectra.herokuapp.com/plot?ra=${ra}&dec=${dec}&all`

  const sdssSpecCallback = useCallback(async () => {
    const sloanService = new SloanService()
    const id = await sloanService.getSpecId({ ra, dec })
    if (id) {
      return `https://skyserver.sdss.org/dr16/en/get/SpecById.ashx?id=${id}`
    } else {
      throw new Error('undefined specId')
    }
  }, [ra, dec])

  return (
    <div>
      {/* Image: S-PLUS PhotoSpectra */}
      <div className="section-title">
        S-PLUS PhotoSpectra
      </div>
      <ImageContainer src={splusUrl} />


      {/* Image: SDSS Spectra */}
      <div className="section-title">
        SDSS Spectra
      </div>
      <ImageContainer srcAsync={sdssSpecCallback} />

    </div>
  )
}

export default SpectraTab
