export default class NativeBtn extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'width', 'height'];
  }
  
  constructor() {
    super()
    this.addEventListener('click', () => console.log(this));
  }
  
  
}