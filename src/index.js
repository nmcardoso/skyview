import './style.css'
import AladinSingleton from './AladinSingleton'
import SplusPointer from './SplusPointer'

document.addEventListener('DOMContentLoaded', () => {
  // const splusSurvey = aladin.instance.createImageSurvey('S-PLUS', 'S-PLUS', hipsUrl, 'equatorial', 10, { imgFormat: 'png' })
  const aladin = new AladinSingleton()
  // aladin.A.setImageSurvey(splusSurvey)

  const sp = new SplusPointer()
  sp.setup()
})
