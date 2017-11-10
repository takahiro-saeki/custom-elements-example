class Button extends HTMLElement {
  constructor() {
    super();
    console.log(this);
  }
  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'name') {
      this.style.background = newValue;
      this.style.padding = '.5rem';
      this.style.borderRadius = '.5rem';
    }
    console.log(this);
  }
}

customElements.define('material-btn', Button);
