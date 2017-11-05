import api from '../../logic/api';
import { escapeRegExp } from 'lodash';

const imageRender = img => {
  return`
    <style>
      .container-item {
        width: 33.33333%;
      }
      .responsive-img {
        width: 100%;
        height: auto;
      }
    </style>
    <div class="container-item">
      <img src="${img.image_url}" class="responsive-img"/>
    </div>
  `
}

export default class Drawer extends HTMLElement {
  constructor() {
    super()
    this.param
    this.init()

  }

  static render(param) {
    return`
      <style>
        .container {
          display: flex;
          flex-wrap: wrap;
          max-width: 960px;
          width: 100%;
          height: auto;
          margin: 0 auto;
        }
        .container-item {
          width: 33%;
        }
      </style>
      <slot></slot>
      <div class="container">
        ${param.map(item => imageRender(item))}
      </div>
    `
  }

  connectedCallback() {
    const check = async () => {
      try {
        const requestParam = await api()
        const optimize = requestParam.info.photo
        this.attachShadow({
          mode: 'open'
        }).innerHTML = Drawer.render(this.param)
      } catch (err) {
        console.log('error check')
        return err
      }
    }
    check()
  }
}
