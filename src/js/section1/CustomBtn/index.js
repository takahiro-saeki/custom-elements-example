import btnTemplate from './btnTemplate';

export default class CustomBtn extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'width', 'height'];
  }

  constructor() {
    super()
    this.attachShadow({
      mode: 'open'
    });
    const color = this.getAttribute('color')
    const width = this.getAttribute('width')
    const height = this.getAttribute('height')
    this.shadowRoot.innerHTML = btnTemplate({color, width, height})
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if(oldValue) {
      this.shadowRoot.querySelector('.base').textContent
      this.textContent = 'changed'
    }
  }
}
