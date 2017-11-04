import Header from './components/Header';
import HelloElement from './components/HelloElement';
import Button from './components/Button';
import Card from './components/Card';
import Drawer from './components/Drawer';
import Title from 'components/Title';
import './style';

class FancyButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY));
  }

  drawRipple(x, y) {
    let div = document.createElement('div');
    div.classList.add('ripple');
    this.appendChild(div);
    div.style.top = `${y - div.clientHeight/2}px`;
    div.style.left = `${x - div.clientWidth/2}px`;
    div.style.backgroundColor = 'currentColor';
    div.classList.add('run');
    div.addEventListener('transitionend', e => div.remove());
  }
}

customElements.define('fancy-button', FancyButton, {extends: 'button'});

customElements.define('material-btn', Button);
customElements.define('custom-div', Header)
customElements.define('hello-element', HelloElement);
customElements.define('card-ui', Card);
customElements.define('app-drawer', Drawer);
customElements.define('title-bar', Title);
