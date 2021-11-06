import './ImageController.css'

class ImageController {
  constructor({ containerElement }) {
    this.containerElement = containerElement

    this.loadingElement = containerElement.querySelector('[data-loading]')
    this.errorElement = containerElement.querySelector('[data-error]')
    this.imageElement = containerElement.querySelector('img')

    this._setupListeners()
  }

  updateImageSrc(src) {
    this._togglePanel('loading')
    this.imageElement.src = src
  }

  async updateImageSrcAsync(promise) {
    this._togglePanel('loading')

    try {
      const url = await promise()
      this.updateImageSrc(url)
    } catch {
      this._togglePanel('error')
      this.imageElement.src = ''
    }
  }

  _setupListeners() {
    this.imageElement.addEventListener('load', () => {
      this._togglePanel('image')
    })

    this.imageElement.addEventListener('error', () => {
      this._togglePanel('error')
    })
  }

  _togglePanel(show) {
    switch (show) {
      case 'error':
        this.errorElement.classList.remove('d-none')
        this.loadingElement.classList.add('d-none')
        this.imageElement.classList.add('d-none')
        break
      case 'loading':
        this.errorElement.classList.add('d-none')
        this.loadingElement.classList.remove('d-none')
        this.imageElement.classList.add('d-none')
        break
      case 'image':
        this.errorElement.classList.add('d-none')
        this.loadingElement.classList.add('d-none')
        this.imageElement.classList.remove('d-none')
        break
      default:
        this.errorElement.classList.add('d-none')
        this.loadingElement.classList.add('d-none')
        this.imageElement.classList.add('d-none')
        break
    }
  }
}

export default ImageController
