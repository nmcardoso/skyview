import { useEffect, useState } from 'react'
import AladinSingleton from '../core/AladinSingleton'
import { ACTIONS, useApp } from '../core/AppContext'

import './PointerWidget.css'



function PointerWidget() {
  const [appState, appDispatch] = useApp()

  const handleClick = (e) => {
    e.stopPropagation()
    appDispatch({
      type: ACTIONS.WIDGET.POINTER.CHANGE_SELECT,
      data: !appState.widget.pointer.selected
    })
  }

  useEffect(() => {
    const canvasElement = document.querySelector('canvas.aladin-reticleCanvas')
    if (canvasElement) {
      const selectedState = appState.widget.pointer.selected

      if (selectedState) {
        canvasElement.classList.add('pointer-widget-cursor')
      } else {
        canvasElement.classList.remove('pointer-widget-cursor')
      }
    }
  })

  return (
    <div class="pointer-widget-container" onClick={handleClick}>
      <div class="pointer-widget"></div>
    </div>
  )
}

export default PointerWidget
