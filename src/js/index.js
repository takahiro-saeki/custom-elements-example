import Header from './components/Header';
import HelloElement from './components/HelloElement';
import Button from './components/Button';
import Card from './components/Card';
import Drawer from './components/Drawer';
import Title from 'components/Title';
import './style';

const template = document.createElement('template');

  template.innerHTML = `
    <style>
      :host {
        display: block;
        contain: content;
        text-align: center;
        background: papayawhip;
        max-width: 500px;
        margin: 0 auto;
        box-shadow: 0 0 10px rgba(128, 100, 38, 0.34);
        border-radius: 8px;
        border: 2px dashed #ccc049;
      }
    </style>

    <slot></slot>
  `;

  class MyInfoBox extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  window.customElements.define('my-info-box', MyInfoBox);

customElements.define('material-btn', Button);
customElements.define('custom-div', Header)
customElements.define('hello-element', HelloElement);
customElements.define('card-ui', Card);
customElements.define('app-drawer', Drawer);
customElements.define('title-bar', Title);
