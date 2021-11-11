import './ImageContainer.css'

import { useState, useEffect } from 'react'
import ImageModal from './ImageModal'

function LoadingFrame() {
  return (
    <div class="image-placeholder">
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

function ErorFrame() {
  <div class="image-placeholder">
    <span>Resource Unavailable</span>
  </div>
}

function ImageFrame({ src, handleImageLoad, handleImageError }) {
  return (
    <img
      src={src}
      onLoad={handleImageLoad}
      onError={handleImageError}
      width="100%"
      className="zoom-hover"
      alt="" />
  )
}

function getCurrentFrame(state, imageUrl) {
  if (imageUrl) {
    switch (state) {
      case 'loading':
        return <LoadingFrame />
      case 'error':
        return <ErorFrame />
      case 'sucess':
        return <ImageFrame src={imageUrl} />
      default:
        return <LoadingFrame />
    }
  } else {
    return <LoadingFrame />
  }

}


function ImageContainer({ src, srcAsync }) {
  const [state, setState] = useState('loading')
  const [imageUrl, setImageUrl] = useState(src || null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const exec = async () => {
      if (typeof srcAsync === 'function') {
        try {
          setState('loading')
          const url = await srcAsync()
          setImageUrl(url)
        } catch (e) {
          console.log(e)
          setState('error')
        }
      }
    }
    exec()
  }, [srcAsync])

  useEffect(() => {
    if (src) {
      setState('loading')
      setImageUrl(src)
    }
  }, [src])

  const handleImageLoad = () => {
    setState('success')
  }

  const handleImageError = () => {
    setState('error')
  }

  const handleModalOpen = () => {
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setModalVisible(false)
  }

  return (
    <>
      <div
        class="image-placeholder"
        style={{ display: state === 'loading' ? 'flex' : 'none' }}>
        <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div
        class="image-placeholder"
        style={{ display: state === 'error' ? 'flex' : 'none' }}>
        <span>Resource Unavailable</span>
      </div>

      <img
        alt=""
        src={imageUrl}
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={handleModalOpen}
        width="100%"
        className="zoom-hover"
        style={{ display: state === 'success' ? 'flex' : 'none' }} />

      <ImageModal
        src={imageUrl}
        show={modalVisible}
        onClose={handleModalClose} />
    </>
  )
}

export default ImageContainer
