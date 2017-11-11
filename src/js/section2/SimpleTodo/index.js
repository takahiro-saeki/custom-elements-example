const template = document.createElement('template');
template.innerHTML = `
  <style>
    header {
      color: #b2ebf2;
      font-size: 1.5rem;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;  /* Preferred icon size */
      display: inline-block;
      line-height: 1;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      font-feature-settings: 'liga';
    }
  </style>
  <div>
    <header>TODO EXAMPLE</header>
    <div>
      <input type="text"/>
      <ul>
        <li>
          <span>
            <i class="material-icons">close</i>
          </span>
          <div>test</div>
          <span>
            <i class="material-icons">check_circle</i>
          </span>
        </li>
      </ul>
      <div></div>
    </div>
  </div>
`;

const listDOM = (disabled = false) => `
  <span diabled="${disabled}">
    <i class="material-icons">close</i>
  </span>
  <div>test</div>
  <span>
    <i class="material-icons">check_circle</i>
  </span>
`;

export default class SimpleTodo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        const li = document.createElement('li');
        li.innerHTML = listDOM(true);
        const listLength = this.shadowRoot.querySelectorAll('li').length;
        li.setAttribute('id', listLength + 1)
        li.querySelector('span').addEventListener('click', () => console.log('change'))
        this.shadowRoot.querySelector('ul').appendChild(li);
        input.value = null;
      }
    });
  }
}
