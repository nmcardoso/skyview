import './LightboxController.css'

class LightboxController {
  constructor() {
    this._setup()
  }

  _setup() {
    // triggers
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]')

    for (let i = 0; i < lightboxTriggers.length; i++) {
      const trigger = lightboxTriggers[i]

      trigger.addEventListener('click', (e) => {
        const lb = document.querySelector(trigger.dataset.lightbox)
        const lbImg = lb.querySelector('img')

        lb.style.display = 'block'
        lbImg.src = e.target.src
      })
    }

    // close lightbox
    const lightboxes = document.querySelectorAll('.lightbox')

    for (let i = 0; i < lightboxes.length; i++) {
      const lb = lightboxes[i]

      lb.querySelector('.close').addEventListener('click', () => {
        lb.style.display = 'none'
      })

      window.addEventListener('click', (e) => {
        if (e.target == lb) {
          lb.style.display = 'none'
        }
      })
    }
  }
}

export default LightboxController
