import btnTemplate from './btnTemplate';

export default class CustomBtn extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'width', 'height'];
  }

  constructor() {
    super()
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    console.log({attr, oldValue, newValue})
    if (attr === 'color') {
      this.attachShadow({mode: 'open'}).innerHTML = btnTemplate(newValue)
    }
  }
/*
  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = btnTemplate()
  }
  */
}
