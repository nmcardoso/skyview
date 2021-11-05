class AladinSingleton {
  constructor() {
    if (AladinSingleton._instance) {
      return AladinSingleton._instance
    }
    AladinSingleton._instance = this;

    this._setup()
  }

  _setup() {
    const hipsUrl = 'https://splus.cloud/HIPS/dr2/color'
    this.A = A.aladin('#aladin-lite-div', {
      target: '20.3190400 -0.5442790',
      fov: 0.14,
      cooFrame: 'ICRSd',
      fullScreen: true,
      showReticle: true,
      showZoomControl: false,
      showFullscreenControl: false,
      showLayersControl: false,
      showGotoControl: true,
      showShareControl: true,
      showSimbadPointerControl: false,
      showFrame: true,
      reticleColor: 'rgb(178, 50, 178)',
      reticleSize: 22
    })
    const splusSurvey = this.A.createImageSurvey('S-PLUS', 'S-PLUS', hipsUrl, 'equatorial', 10, { imgFormat: 'png' })
    this.A.setImageSurvey(splusSurvey)
  }
}


export default AladinSingleton
