import AladinSingleton from './AladinSingleton'
import createElementFromHTML from './utils'
import SideNav from './SideNav'

class SplusPointer {
  constructor() {
    this._setupElements()
    this._setupListeners()
  }

  _setupElements() {
    let html = `
      <div class="splusPointerControl-container">
        <div class="splusPointerControl"></div>
      </div>
    `
    const splusPointerControl = createElementFromHTML(html)
    const container = document.getElementById('aladin-lite-div')
    const gotoControl = container.querySelector('.aladin-gotoControl-container')

    gotoControl.insertAdjacentElement('afterend', splusPointerControl)
  }

  _setupListeners() {
    const aladin = new AladinSingleton()
    document.getElementById('aladin-lite-div').addEventListener('click', e => {
      const [ra, dec] = aladin.A.pix2world(e.clientX, e.clientY)

      const sn = new SideNav()
      sn.updateCoord(ra, dec)
      sn.openNav()
    })
  }
}

export default SplusPointer
