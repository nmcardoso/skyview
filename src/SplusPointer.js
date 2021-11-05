import AladinSingleton from './AladinSingleton'
import createElementFromHTML from './utils'
import SideNav from './SideNav'

class SplusPointer {
  constructor() {
    this.selectionMode = false
  }

  setup() {
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

    splusPointerControl.addEventListener('click', (e) => {
      e.stopPropagation()
      this.selectionMode = true
      document.querySelector('canvas.aladin-reticleCanvas').classList.add('splusPointer-cursor')
    })
  }

  _setupListeners() {
    const aladin = new AladinSingleton()
    document.getElementById('aladin-lite-div').addEventListener('click', e => {
      if (this.selectionMode) {
        this.selectionMode = false
        document.querySelector('canvas.aladin-reticleCanvas').classList.remove('splusPointer-cursor')

        const [ra, dec] = aladin.A.pix2world(e.clientX, e.clientY)

        const sn = new SideNav()
        sn.updateCoord(ra, dec)
        sn.openNav()
      }
    })
  }
}

export default SplusPointer