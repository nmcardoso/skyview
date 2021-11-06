import './LightboxController.css'

class LightboxController {
  constructor() {
    this._setup()
  }

  _constructor() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }
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
