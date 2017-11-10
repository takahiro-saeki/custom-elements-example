import dom from './dom';
import currentDate from './currentDate';

const template = document.createElement('template');
template.innerHTML = dom;

export default class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.leftBtn = this.shadowRoot.querySelector('[left]');
    this.rightBtn = this.shadowRoot.querySelector('[right]');
    this.description = this.shadowRoot.querySelector('[description]');
    this.date = this.shadowRoot.querySelector('[date]');
  }

  connectedCallback() {
    this.leftBtn.innerText = this.getAttribute('left') || 'Link';
    this.rightBtn.innerText = this.getAttribute('right') || 'Share';
    this.description.innerText = this.getAttribute('description') || 'cute cat';
    this.date.innerText = currentDate();
  }
}
