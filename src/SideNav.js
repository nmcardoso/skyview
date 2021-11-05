class SideNav {
  constructor() {
    this.ra = null
    this.dec = null
    this._afterMount()
  }

  openNav() {
    document.getElementById('object-details').style.width = '350px'
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
  }

  _render() {
    document.getElementById('splus-spectra').src = `https://splus-spectra.herokuapp.com/plot?ra=${this.ra}&dec=${this.dec}&all`
    document.getElementById('splus-trilogy').src = `https://checker-melted-forsythia.glitch.me/img?ra=${this.ra}&dec=${this.dec}`
  }
}


export default SideNav
