import ImageContainer from './ImageContainer'

function RGBImagesTab({ ra, dec }) {
  const splusUrl = `https://checker-melted-forsythia.glitch.me/img?ra=${ra}&dec=${dec}`
  const legacyUrl = `https://www.legacysurvey.org/viewer/cutout.jpg?ra=${ra}&dec=${dec}&layer=dr8&pixscale=0.55`

  return (
    <div>
      {/* Image: S-PLUS RGB */}
      <div class="section-title">
        S-PLUS 12 bands RGB
      </div>
      <ImageContainer src={splusUrl} />


      {/* Image: Legacy RGB */}
      <div class="section-title">
        Legacy Survey RGB
      </div>
      <ImageContainer src={legacyUrl} />
    </div>
  )
}

export default RGBImagesTab
