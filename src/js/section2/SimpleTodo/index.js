import uuid from 'uuid';
import dom from './dom';

const template = document.createElement('template');
template.innerHTML = dom;

const listDOM = (disabled = false, text) => `
  <span checkCompleted>
    <i class="material-icons">check_circle</i>
  </span>
  <div>${text}</div>
  <span diabled="${disabled}" delete>
    <i class="material-icons">close</i>
  </span>
`;

const defaultState = [
  {
    uuid: uuid.v4(),
    isDisabled: false,
    text: 'text content.',
    isCompleted: false
  },
  {
    uuid: uuid.v4(),
    isDisabled: true,
    text: 'dummy text.',
    isCompleted: true
  },
  {
    uuid: uuid.v4(),
    isDisabled: false,
    text: 'mock text.',
    isCompleted: false
  }
];

export default class SimpleTodo extends HTMLElement {
  static get observedAttributes() {
    return ['sort'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.state = defaultState;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const ul = this.shadowRoot.querySelector('ul');
    ul.textContent = null;
    if (newValue === 'active') {
      const active = this.state.filter(item => item.isCompleted === true);
      return this.createDOM(active);
    }
    if (newValue === 'completed') {
      const active = this.state.filter(item => !item.isCompleted === true);
      return this.createDOM(active);
    }
    return this.createDOM(this.state);
  }

  deleteTodo(el) {
    const id = el.getAttribute('uuid');
    const newState = this.state.filter(item => item.uuid !== id);
    this.state = newState;
    el.parentNode.removeChild(el);
  }

  completeTodo(el) {
    const id = el.getAttribute('uuid');
    const hasAttr = el.hasAttribute('isCompleted');
    const newState = this.state.map(item => {
      if (item.uuid === id) {
        const merge = Object.assign(
          {},
          item,
          { isCompleted: !item.isCompleted },
          { isDisabled: !item.isDisabled }
        );
        return merge;
      }
      return item;
    });
    this.state = newState;
    if (hasAttr) {
      el.removeAttribute('isCompleted');
    } else {
      el.setAttribute('isCompleted', '');
    }
  }

  addTodo() {
    const listUuid = uuid.v4();
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = listDOM(true, event.target.value);
    li
      .querySelector('[delete]')
      .addEventListener('click', () => this.deleteTodo(li));
    li
      .querySelector('[checkCompleted]')
      .addEventListener('click', () => this.completeTodo(li));
    li.setAttribute('uuid', listUuid);
    this.shadowRoot.querySelector('ul').appendChild(li);
    this.state.push({
      uuid: listUuid,
      isDisabled: false,
      text: event.target.value,
      isCompleted: false
    });
  }

  createDOM(data = []) {
    data.map(item => {
      const { uuid, isDisabled, text, isCompleted } = item;
      const list = document.createElement('li');
      list.classList.add('todo-item');
      list.innerHTML = listDOM(isDisabled, text);
      list
        .querySelector('[delete]')
        .addEventListener('click', () => this.deleteTodo(list));
      list
        .querySelector('[checkCompleted]')
        .addEventListener('click', () => this.completeTodo(list));
      list.setAttribute('uuid', uuid);
      if (isCompleted) {
        list.setAttribute('isCompleted', '');
      }
      this.shadowRoot.querySelector('ul').appendChild(list);
    });
  }

  sortTodo(event) {
    const sortType = ['all', 'active', 'completed'];
    const selectType = sortType.filter(item => event.target.hasAttribute(item));
    this.setAttribute('sort', selectType[0]);
  }

  connectedCallback() {
    this.createDOM(this.state);
    const sortContainer = this.shadowRoot.querySelector('.sort-container');
    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('keypress', e => {
      if (event.keyCode === 13) {
        this.addTodo(e);
        input.value = null;
      }
    });
    sortContainer.addEventListener('click', e => this.sortTodo(e));
  }
}
