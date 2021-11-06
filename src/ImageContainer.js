import createElementFromHTML from './utils'

class ImageContainer {
  constructor({
    parentElement,
    width,
    height,
    src
  }) {
    const imageElement = document.createElement('img')
    const loadingElement = this._loadingElement()
    const errorElement = this._errorElement()

    console.log(width, height)

    if (width !== undefined) {
      imageElement.style.width = width
      loadingElement.style.width = width
      errorElement.style.width = width
    }
    if (height !== undefined) {
      imageElement.style.height = height
      loadingElement.style.height = height
      errorElement.style.height = height
    }

    this._setupImageListeners(imageElement)
    imageElement.src = src


    const containerElement = document.createElement('div')
    containerElement.appendChild(loadingElement)
    containerElement.appendChild(errorElement)
    containerElement.appendChild(imageElement)

    parentElement.appendChild(containerElement)

    this.imageElement = imageElement
    this.loadingElement = loadingElement
    this.errorElement = errorElement
    this.containerElement = containerElement
  }

  updateImageSrc(src) {
    this.errorElement.classList.add('d-none')
    this.loadingElement.classList.remove('d-none')
    this.imageElement.classList.add('d-none')
    this.imageElement.src = src
  }

  _setupImageListeners(i) {
    i.addEventListener('load', () => {
      this.errorElement.classList.add('d-none')
      this.loadingElement.classList.add('d-none')
      this.imageElement.classList.remove('d-none')
    })

    i.addEventListener('error', () => {
      this.errorElement.classList.remove('d-none')
      this.loadingElement.classList.add('d-none')
      this.imageElement.classList.add('d-none')
      console.log('image error event')
    })
  }

  _loadingElement() {
    const html = `
      <div style="height: 300px; width: 90%;" class="bg-light d-flex justify-content-center align-items-center">
        <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `
    return createElementFromHTML(html)
  }

  _errorElement() {
    const html = `
      <div style="height: 300px; width: 90%; display: none;" class="bg-light d-flex justify-content-center align-items-center">
        <span>Resource Unavailable</span>
      </div>
    `
    return createElementFromHTML(html)
  }
}

export default ImageContainer
