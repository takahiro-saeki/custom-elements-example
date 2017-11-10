import CustomBtn from '../CustomBtn';

export default class ExtensibleBtn extends CustomBtn {
  constructor() {
    super();
    this.addEventListener('click', () => {
      this.setAttribute('color', 'purple');
    });
  }
}
