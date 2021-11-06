import './style.css'
import AladinSingleton from './AladinSingleton'
import SplusPointer from './SplusPointer'
import SideNav from './SideNav'
import LightboxController from './LightboxController'

document.addEventListener('DOMContentLoaded', () => {
  const aladin = new AladinSingleton()

  const sideNav = new SideNav()

  const sp = new SplusPointer({ sideNav })
  sp.setup()

  new LightboxController()
})
