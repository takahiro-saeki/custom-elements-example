const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      color: #222;
    }
    button {
      padding: 1rem;
      background: var(--custom-color, #d81b60);
      color: #fff;
      border: 1px solid var(--custom-color, #d81b60);
      border-radius: .5rem;
      outline: none;
      transition: .5s;
      margin: 0 .5rem;
    }
    button:active {
      color: var(--custom-color, #d81b60);
      background: #fff;
    }
  </style>
  <div class="contents-wrapper">
    <button type="button" increment>+</button>
    <span></span>
    <button type="button" decrement>-</button>
    <button type="button" reset>reset btn</button> 
  </div>
`

export default class Counter extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }
  
  constructor() {
    super()
    this.attachShadow({mode: 'open'}) 
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.incBtn = this.shadowRoot.querySelector('[increment]');
    this.decBtn = this.shadowRoot.querySelector('[decrement]');
    this.resetBtn = this.shadowRoot.querySelector('[reset]');
    this.total = this.shadowRoot.querySelector('span');
  }
  
  connectedCallback() {
    this.incBtn.addEventListener('click', this.increment);
    this.decBtn.addEventListener('click', this.decrement);
    this.resetBtn.addEventListener('click', this.resetTransaction);
    if (!this.hasAttribute('value')) {
      this.setAttribute('value', 1);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.total.innerText = this.value;
  }
  
  increment = () => {
    const newValue = Number(this.value) + 1;
    this.value = newValue;
  }

  decrement = () => {
    const newValue = Number(this.value) - 1;
    this.value = newValue;
  }
  
  resetTransaction = () => {
    this.value = 0;
  }
  
  get value() {
    return this.getAttribute('value');
  }
  
  set value(newValue) {
    this.setAttribute('value', newValue);
  }

  disconnectedCallback() {
    this.incBtn.removeEventListener('click', this.increment);
    this.decBtn.removeEventListener('click', this.decrement);
    this.resetBtn.removeEventListener('click', this.resetTransaction);
  }
}