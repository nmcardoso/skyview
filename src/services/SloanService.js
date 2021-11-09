class SloanService {
  constructor() {
    this.coneSpectroUrl = 'https://skyserver.sdss.org/dr16/SkyServerWS/SpectroQuery/ConeSpectro'
  }

  async getSpecId({ ra, dec }) {
    console.log('SloanService', ra, dec)
    const r = await fetch(`${this.coneSpectroUrl}?radius=0.01667&dec=${dec}&ra=${ra}&limit=1&format=xml&specparams=specObjID&imgparams=none&zWarning=on`)
    const txt = await r.text()
    const xml = (new DOMParser()).parseFromString(txt, 'application/xml')
    let id = xml.querySelector('Table[name="Table1"] > Row > Item[name="specObjID"]')
    return id.textContent
  }
}

export default SloanService
