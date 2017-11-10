const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      color: #222;
    }
    .contents-container {
      box-sizing: border-box;
      padding: 1rem;
      display: flex;
    }
    .icon-area {
      width: 100px;
      height: 100px;
    }
    .icon-image {
      width: 100%;
      height: auto;
      max-width: 100px;
      max-height: 100px;
    }
    .personal-area {
      
    }
  </style>
  <div class="contents-container">
    <div class="icon-area">
      <img src="http://www.ricoh-imaging.co.jp/japan/dc/caplio/r7/img/sample_04.jpg" class="icon-image"/>
    </div>
    <div class="personal-area">
      <div>名前</div>
      <div>説明文</div>
    </div>
  </div>
`;

export default class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
