class Title extends HTMLElement {
  static get observedAttributes() {return ['title']; }

  attributeChangedCallback(name, oldValue, newValue, nameSpace) {
    console.log('total param', {
      name,
      oldValue,
      newValue,
      nameSpace
    })
    if(name === 'title') {
      this.textContent = newValue
    }
  }
}

export default Title;
