import uuid from 'uuid';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    header {
      color: #b2ebf2;
      font-size: 1.5rem;
      text-align: center;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .todo-item {
      display: flex;
    }

    .todo-item div {
      width: 100%;
    }

    .todo-container {
      width: 100%;
      max-width: 550px;
      margin: 0 auto;
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

  <div class="todo-container">
    <header>TODO EXAMPLE</header>
    <div>
      <input type="text"/>
      <ul></ul>
      <div></div>
    </div>
  </div>
`;

const listDOM = (disabled = false, text, uuid) => `
  <span>
    <i class="material-icons">check_circle</i>
  </span>
  <div>${text}</div>
  <span diabled="${disabled}" delete uuid="${uuid}">
    <i class="material-icons">close</i>
  </span>
`;

export default class SimpleTodo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.state = [
      {
        uuid: uuid.v4(),
        isDisabled: false,
        text: 'text content.'
      },
      {
        uuid: uuid.v4(),
        isDisabled: true,
        text: 'dummy text.'
      },
      {
        uuid: uuid.v4(),
        isDisabled: false,
        text: 'mock text.'
      }
    ]
  }

  connectedCallback() {
    const createDOM = data => {
      data.map((item, i) => {
        const { uuid, isDisabled, text } = item;
        const list = document.createElement('li');
        list.classList.add('todo-item')
        list.innerHTML = listDOM(isDisabled, text, uuid)
        list.querySelector('[delete]').addEventListener('click', () => {
          list.parentNode.removeChild(list);
          const id = list.querySelector('[delete]').getAttribute('uuid');
          const newState = this.state.filter(item => item.uuid !== id)
          this.state = newState;
          console.log(this.state)
        })
        this.shadowRoot.querySelector('ul').appendChild(list);
      })
    }
    createDOM(this.state)
    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        const li = document.createElement('li');
        li.classList.add('todo-item')
        li.innerHTML = listDOM(true, e.target.value);
        const listLength = this.shadowRoot.querySelectorAll('li').length;
        li.setAttribute('id', listLength + 1)
        li.querySelector('span').addEventListener('click', () => console.log('change'))
        this.shadowRoot.querySelector('ul').appendChild(li);
        this.state.push({uuid: uuid.v4(), isDisabled: false, text: e.target.value})
        input.value = null;
        console.log(this.state)
      }
    });
  }
}
