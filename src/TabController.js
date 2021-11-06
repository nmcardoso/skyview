class TabController {
  constructor({ selectorElement, contentElement }) {
    this.selectorElement = selectorElement
    this.contentElement = contentElement
    this._hideUnselectedTabs()
    this._setupListeners()
  }

  _hideUnselectedTabs() {
    const c = this.contentElement.children
    for (let i = 0; i < c.length; i++) {
      if (i != this.selectorElement.value) {
        c[i].classList.add('d-none')
      }
    }
  }

  _setupListeners() {
    this.selectorElement.addEventListener('change', (e) => {
      const selectedTab = parseInt(e.target.value)
      const c = this.contentElement.children
      for (let i = 0; i < c.length; i++) {
        if (i == selectedTab) {
          c[i].classList.remove('d-none')
          c[i].classList.add('d-block')
        } else {
          c[i].classList.remove('d-block')
          c[i].classList.add('d-none')
        }
      }
    })
  }
}

export default TabController
