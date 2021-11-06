import './style.css'
import AladinSingleton from './AladinSingleton'
import SplusPointer from './SplusPointer'
import SideNav from './SideNav'

document.addEventListener('DOMContentLoaded', () => {
  // const splusSurvey = aladin.instance.createImageSurvey('S-PLUS', 'S-PLUS', hipsUrl, 'equatorial', 10, { imgFormat: 'png' })
  const aladin = new AladinSingleton()
  // aladin.A.setImageSurvey(splusSurvey)

  const sideNav = new SideNav()

  const sp = new SplusPointer({ sideNav })
  sp.setup()
})
