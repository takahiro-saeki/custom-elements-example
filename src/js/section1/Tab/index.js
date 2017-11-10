const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
  </style>
  <div>
    <div>
      <ul>
        <li>menu1</li>
        <li>menu2</li>
        <li>menu3</li>
      </ul>
    </div>
    <div>contents</div>
  </div>
`;

export default class Tab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}
