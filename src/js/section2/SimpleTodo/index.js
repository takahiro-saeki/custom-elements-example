import uuid from 'uuid';
import dom from './dom';
import listDOM from './listDOM';
import defaultState from './defaultState';

const template = document.createElement('template');
template.innerHTML = dom;

export default class SimpleTodo extends HTMLElement {
  static get observedAttributes() {
    return ['sort', 'update'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.countTodo();
    this.isDisplay(this.state.length === 0);

    if (name === 'sort') {
      const ul = this.shadowRoot.querySelector('ul');
      ul.textContent = null;
      if (newValue === 'active') {
        const active = this.state.filter(item => item.isCompleted === true);
        return this.createDOM(active);
      }
      if (newValue === 'completed') {
        const completed = this.state.filter(item => !item.isCompleted === true);
        return this.createDOM(completed);
      }
      return this.createDOM(this.state);
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.state = defaultState;
  }

  countTodo() {
    const count = this.state.filter(item => item.isCompleted !== true);
    const countField = this.shadowRoot.querySelector('[count]');
    countField.setAttribute('count', this.state.length - count.length);
    countField.textContent = count.length;
  }

  isDisplay(flag) {
    const footer = this.shadowRoot.querySelector('footer');
    footer.style.display = flag ? 'none' : 'flex';
  }

  deleteTodo(el) {
    const id = el.getAttribute('uuid');
    const newState = this.state.filter(item => item.uuid !== id);
    this.state = newState;
    el.parentNode.removeChild(el);
    this.setAttribute('update', '');
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
    this.setAttribute('update', '');
  }

  addTodo() {
    const listUuid = uuid.v4();
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = listDOM(true, event.target.value);
    const liDelete = li.querySelector('[delete]');
    const listComplete = li.querySelector('[checkCompleted]');
    liDelete.addEventListener('click', () => this.deleteTodo(li));
    listComplete.addEventListener('click', () => this.completeTodo(li));
    li.setAttribute('uuid', listUuid);
    this.shadowRoot.querySelector('ul').appendChild(li);
    this.state.push({
      uuid: listUuid,
      isDisabled: false,
      text: event.target.value,
      isCompleted: false
    });
    this.setAttribute('update', '');
  }

  createDOM(data = []) {
    data.map(item => {
      const { uuid, isDisabled, text, isCompleted } = item;
      const list = document.createElement('li');
      list.classList.add('todo-item');
      list.innerHTML = listDOM(isDisabled, text);
      const listDelete = list.querySelector('[delete]');
      const listComplete = list.querySelector('[checkCompleted]');
      listDelete.addEventListener('click', () => this.deleteTodo(list));
      listComplete.addEventListener('click', () => this.completeTodo(list));
      list.setAttribute('uuid', uuid);
      if (isCompleted) {
        list.setAttribute('isCompleted', '');
      }
      this.shadowRoot.querySelector('ul').appendChild(list);
      this.setAttribute('update', '');
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
        if (!event.target.value) {
          return false;
        }
        this.addTodo(e);
        input.value = null;
      }
    });
    sortContainer.addEventListener('click', e => this.sortTodo(e));
  }
}
