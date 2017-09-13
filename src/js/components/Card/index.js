import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

class Card extends HTMLElement {
  constructor() {
    super()
    this.data = []
    this.path = '//books.rakuten.co.jp/pzd_contents/tmpl/e-book/json/business.json'
  }
  static get observedAttributes() {
    return ['src', 'title']; 
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    const asyncFunc = async () => {
      try {
        const res = await fetch(this.path)
        const json = await res.json();
        this.data = json;
        return this.data;
      } catch(err) {
        return []
      }
    }
    switch(attr) {
      case 'src': {
        const img = document.createElement('img')
        img.src = newValue;
        img.addEventListener('click', e => {
          console.log(this.data)
          
          return document.body.remove()
        })
        this.appendChild(img)
      }
      break
      case 'title': {
        const div = document.createElement('div')
        div.textContent = attr;
        div.addEventListener('click', e => {
          console.log('delete start');
          return div.remove()
        })
        this.appendChild(div)
        console.log(div)
      }
      break
    }
    return asyncFunc()
  }
  
  connectedCallback() {
    console.log('card component check.')
  }
  
  disconnectedCallback() {
    console.log('card component was deleted.')
  }
}

export default Card;
