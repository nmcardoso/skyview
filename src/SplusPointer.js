import './SplusPointer.css'
import AladinSingleton from './AladinSingleton'
import createElementFromHTML from './utils'
import SideNav from './SideNav'

class SplusPointer {
  constructor({ sideNav }) {
    this.selectionMode = false
    this.sideNav = sideNav
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


    //Brightness slider 
    let range = `
      <div class="sliderContainer">
        <p id="rangerValue">10</p>
        <input id="slider" type="range" min="1" max="50" value="10">
      </div>
    `

    const splusPointerSlider = createElementFromHTML(range)
    gotoControl.insertAdjacentElement('afterend', splusPointerSlider)

    splusPointerSlider.addEventListener('input', (e) => {
      const canvas = document.getElementsByClassName('aladin-imageCanvas')[0]
      canvas.style.filter = `brightness(${e.target.value})`

      document.getElementById('rangerValue').innerText = e.target.value;
    })
    //End slider

  }

  _setupListeners() {
    const aladin = new AladinSingleton()
    document.getElementById('aladin-lite-div').addEventListener('click', e => {
      if (this.selectionMode) {
        this.selectionMode = false
        document.querySelector('canvas.aladin-reticleCanvas').classList.remove('splusPointer-cursor')

        const [ra, dec] = aladin.A.pix2world(e.clientX, e.clientY)

        this.sideNav.updateCoord(ra, dec)
        this.sideNav.openNav()
      }
    })
  }
}

export default SplusPointer
