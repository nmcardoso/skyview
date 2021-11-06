import './SideNav.css'
import ImageController from './ImageController'
import TabController from './TabController'
import SloanService from './SloanService'

const sdssSpecFactory = (ra, dec) => {
  return async () => {
    const sloanService = new SloanService()
    const id = await sloanService.getSpecId({ ra, dec })
    if (id) {
      return `https://skyserver.sdss.org/dr16/en/get/SpecById.ashx?id=${id}`
    } else {
      throw new Error('undefined specId')
    }
  }
}

class SideNav {
  constructor() {
    this.ra = null
    this.dec = null

    this._setupListeners()

    // Controllers
    this.tabController = new TabController({
      selectorElement: document.getElementById('nav-tab-selector'),
      contentElement: document.getElementById('nav-tab-content')
    })
    this.splusSpectraController = new ImageController({
      containerElement: document.getElementById('splus-spectra')
    })
    this.splusRGBController = new ImageController({
      containerElement: document.getElementById('splus-rgb')
    })
    this.legacyRGBController = new ImageController({
      containerElement: document.getElementById('legacy-rgb')
    })
    this.sdssSpectraController = new ImageController({
      containerElement: document.getElementById('sdss-spectra')
    })
  }

  openNav() {
    document.getElementById('object-details').style.width = '400px'
  }

  closeNav() {
    document.getElementById('object-details').style.width = '0px'
  }

  updateCoord(ra, dec) {
    this.ra = ra
    this.dec = dec
    this._render()
  }

  _setupListeners() {
    document.getElementById('object-details-close').addEventListener('click', () => {
      this.closeNav()
    }, false)
  }

  _render() {
    this.splusSpectraController.updateImageSrc(
      `https://splus-spectra.herokuapp.com/plot?ra=${this.ra}&dec=${this.dec}&all`
    )

    this.splusRGBController.updateImageSrc(
      `https://checker-melted-forsythia.glitch.me/img?ra=${this.ra}&dec=${this.dec}`
    )

    this.legacyRGBController.updateImageSrc(
      `https://www.legacysurvey.org/viewer/cutout.jpg?ra=${this.ra}&dec=${this.dec}&layer=dr8&pixscale=0.55`
    )

    this.sdssSpectraController.updateImageSrcAsync(sdssSpecFactory(this.ra, this.dec))
  }
}


export default SideNav
