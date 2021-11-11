import { useEffect, useRef } from 'react'
import './ImageModal.css'

function ImageModal({ src, show, onClose }) {
  const modalRef = useRef(null)

  const handleClose = (e) => {
    if (typeof onClose === 'function') {
      onClose(e)
    }
  }

  const handleOutsideClick = e => {
    e.stopPropagation()

    if (modalRef.current === e.target) {
      handleClose(e)
      window.removeEventListener('click', handleOutsideClick)
    }
  }

  useEffect(() => {
    if (show) {
      window.addEventListener('click', handleOutsideClick)
    }
  })

  return (
    <div
      ref={modalRef}
      className="image-modal"
      style={{ display: show ? 'block' : 'none' }}>

      <img src={src} className="content" alt="" />

      <div className="footer">
        <a href="javascript:void(0);" className="closebtn" onClick={handleClose}>
          Close <span className="close-icon">&times;</span>
        </a>
      </div>

    </div>
  )
}

export default ImageModal
