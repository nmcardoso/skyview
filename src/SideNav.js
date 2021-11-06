import './SideNav.css'
import TabController from './TabController'

class SideNav {
  constructor() {
    this.ra = null
    this.dec = null
    // Controllers
    this.tabController = new TabController({
      selectorElement: document.getElementById('nav-tab-selector'),
      contentElement: document.getElementById('nav-tab-content')
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

  _afterMount() {
    document.getElementById('object-details-close').addEventListener('click', () => {
      this.closeNav()
    }, false)

    this.spectraImg = new ImageContainer({
      parentElement: document.getElementById('splus-spectra'),
      width: '350px',
      height: '279px'
    })

    this.trilogyImg = new ImageContainer({
      parentElement: document.getElementById('splus-trilogy'),
      width: '350px',
      height: '350px'
    })
  }

  _render() {
    this.spectraImg.updateImageSrc(`https://splus-spectra.herokuapp.com/plot?ra=${this.ra}&dec=${this.dec}&all`)
    this.trilogyImg.updateImageSrc(`https://checker-melted-forsythia.glitch.me/img?ra=${this.ra}&dec=${this.dec}`)
  }
}


export default SideNav
