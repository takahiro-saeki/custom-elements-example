import dom from './dom';

const template = document.createElement('template');
template.innerHTML = dom;

export default class Tab extends HTMLElement {
  static get observedAttributes() {
    return ['current-id'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback() {
    for (let index in this.content) {
      this.content[index].setAttribute('id', index);
      if (this.getAttribute('current-id') === index) {
        this.content[index].setAttribute('disabled-flag', false);
      } else {
        this.content[index].setAttribute('disabled-flag', true);
      }
    }
  }

  connectedCallback() {
    this.menu = this.shadowRoot.querySelector('[menu]');
    this.tabsSlot = this.shadowRoot.querySelector('#tabsSlot');
    this.tabsContent = this.shadowRoot.querySelector('#tabsContent');
    this.tabs = this.tabsSlot.assignedNodes({ flatten: true });
    this.content = this.tabsContent.assignedNodes({ flatten: true });

    for (let index in this.tabs) {
      this.tabs[index].setAttribute('id', index);
      if (this.tabs[index].hasAttribute('selected')) {
        this.tabs[index].setAttribute('selected', true);
        this.setAttribute('current-id', index);
      } else {
        this.tabs[index].setAttribute('selected', false);
      }
    }

    for (let index in this.content) {
      this.content[index].setAttribute('id', index);
      if (this.getAttribute('current-id') === index) {
        this.content[index].setAttribute('disabled-flag', false);
      } else {
        this.content[index].setAttribute('disabled-flag', true);
      }
    }
    this.tabsSlot.addEventListener('click', this.titleClick);
  }

  titleClick = e => {
    if (e.target.slot === 'title') {
      this.selected = this.tabs.indexOf(e.target);
      this.setAttribute('current-id', this.selected);
    }
  };
}
