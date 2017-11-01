class Header extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'});
    const div = document.createElement('div');
    div.textContent = 'customElements'
    this.shadow.appendChild(div);
  }
}

customElements.define('custom-div', Header);
