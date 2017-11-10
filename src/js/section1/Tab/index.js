const template = document.createElement('template');
template.innerHTML = `
  <style>
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    
    .contents-container {
      width: 500px;
    }
    
    .tab-menu-container {
      display: flex;
      width: 100%;
    }
    
    .tab-menu-container ::slotted(*) {
      box-sizing: border-box;
      width: 100%;
      text-align: center;
      background: #d81b60;
      color: #FFF;
      font-size: 1rem;
      padding: .5rem;
      transition: .5s;
      cursor: pointer;
      border: none;
      outline: none;
      text-align: center;
    }
  </style>
  <div class="contents-container">
    <ul class="tab-menu-container" menu>
      <slot name="title"></slot>
    </ul>
    <div>contents</div>
    <slot></slot>
  </div>
`;

export default class Tab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.menu = this.shadowRoot.querySelector('[menu]')
    this.tabsSlot = this.shadowRoot.querySelector('#tabsSlot');
  }
}
