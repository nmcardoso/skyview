function openNav() {
  document.getElementById('object-details').style.width = '350px'
}

function closeNav() {
  document.getElementById('object-details').style.width = '0px'
}

function createElementFromHTML(html) {
  const div = document.createElement('div')
  div.innerHTML = html.trim()
  return div.firstChild
}

window.addEventListener('DOMContentLoaded', () => {
  const hipsUrl = 'https://splus.cloud/HIPS/dr2/color'

  const aladin = A.aladin('#aladin-lite-div', {
    target: '201.3070186 -11.1737509',
    fov: 2.66,
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
  const splusSurvey = aladin.createImageSurvey('S-PLUS', 'S-PLUS', hipsUrl, 'equatorial', 10, { imgFormat: 'png' })
  aladin.setImageSurvey(splusSurvey)

  // Splus Pointer
  let html = `
    <div class="splusPointerControl-container">
      <div class="splusPointerControl"></div>
    </div>
  `
  const splusPointerControl = createElementFromHTML(html)
  const container = document.getElementById('aladin-lite-div')
  const gotoControl = container.querySelector('.aladin-gotoControl-container')

  gotoControl.insertAdjacentElement('afterend', splusPointerControl)


  document.getElementById('aladin-lite-div').addEventListener('click', e => {
    const [ra, dec] = aladin.pix2world(e.clientX, e.clientY)

    document.getElementById('splus-spectra').src = `https://splus-spectra.herokuapp.com/plot?ra=${ra}&dec=${dec}&iso&aper6`

    document.getElementById('splus-trilogy').src = `https://checker-melted-forsythia.glitch.me/img?ra=${ra}&dec=${dec}`

    openNav()
  })

  document.getElementById('object-details-close').addEventListener('click', closeNav, false)
})
