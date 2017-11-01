import api from '../logic/api';

export default class Alert extends HTMLElement {
  constructor() {
    super()
  }
  
  static get render() {
    return`
      <style>
        .test-btn
      </style>
        <button class="test-btn">
          <slot>${api().then(item => item.info.photo.map(photo => <img src={photo.image_url} />))}</slot>
        </button>
    `
  }
  
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    }).innerHTML = Drawer.render;
  }
}