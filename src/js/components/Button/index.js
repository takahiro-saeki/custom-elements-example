class Button extends HTMLElement {
  constructor() {
    super()
  }
  static get observedAttributes() {return ['name', 'title']; }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'name') {
      this.style.background = newValue;
      this.style.padding = '.5rem';
      this.style.borderRadius = '.5rem';
      this.style.color = '#FFF';
    }
  }
}

export default Button;
