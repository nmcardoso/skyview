class SideNav {
  constructor() {
    this.ra = null
    this.dec = null
    this._afterMount()
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
  }

  _clean() {
    document.getElementById('splus-spectra').src = ``
    document.getElementById('splus-trilogy').src = ``
  }

  _render() {
    var spectra = document.getElementById('splus-spectra')
    spectra.src = `https://splus-spectra.herokuapp.com/plot?ra=${this.ra}&dec=${this.dec}&all`

    spectra.onerror = function(e) {
        //Remember to handle this
        alert('s-spectra not available')
    };

    var image = document.getElementById('splus-trilogy')
    image.src = `https://checker-melted-forsythia.glitch.me/img?ra=${this.ra}&dec=${this.dec}`

    var image = $("<img src='http://no-image.com/' />");
  }
}


export default SideNav
