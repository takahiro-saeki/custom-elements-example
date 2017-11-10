export default class Container extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        .container {
          box-sizing: border-box;
          max-width: 960px;
          padding: 1rem;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
      </style>
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}
