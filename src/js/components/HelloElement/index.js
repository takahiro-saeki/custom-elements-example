class HelloElement extends HTMLElement {
  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    console.log('attributeChangedCallback test', {
      attr,
      oldValue,
      newValue
    });
    if (attr == 'name') {
      this.textContent = `Hello, ${newValue}`;
    }
  }

  connectedCallback() {
    console.log('component was connected');
  }
}

export default HelloElement;
