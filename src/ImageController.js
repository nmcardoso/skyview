import './ImageController.css'

class ImageController {
  constructor({ containerElement, enableZoom = true }) {
    this.enableZoom = enableZoom
    this.containerElement = containerElement

    this.loadingElement = containerElement.querySelector('[data-loading]')
    this.errorElement = containerElement.querySelector('[data-error]')
    this.imageElement = containerElement.querySelector('img')

    this._setupListeners()
  }

  updateImageSrc(src) {
    this.errorElement.classList.add('d-none')
    this.loadingElement.classList.remove('d-none')
    this.imageElement.classList.add('d-none')
    this.imageElement.src = src
  }

  _setupListeners() {
    this.imageElement.addEventListener('load', () => {
      this.errorElement.classList.add('d-none')
      this.loadingElement.classList.add('d-none')
      this.imageElement.classList.remove('d-none')
    })

    this.imageElement.addEventListener('error', () => {
      this.errorElement.classList.remove('d-none')
      this.loadingElement.classList.add('d-none')
      this.imageElement.classList.add('d-none')
    })

    if (this.enableZoom) {
      this.imageElement.classList.add('zoom-hover')
    }
  }
}

export default ImageController
