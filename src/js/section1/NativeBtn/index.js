export default class NativeBtn extends HTMLButtonElement {
  constructor(color) {
    super(color);
    this.addEventListener('click', () => color);
  }
}
