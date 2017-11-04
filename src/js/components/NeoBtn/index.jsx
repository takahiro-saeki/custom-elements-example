export default class NeoBtn extends HTMLButtonElement {
  constructor() {
    super()
    this.addEventListener('click', () => console.log('test'))
  }

  render() {
    return `
      <div></div>
      `
  }
}
