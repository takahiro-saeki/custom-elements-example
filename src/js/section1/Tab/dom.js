const dom = `
<style>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .contents-container {
    width: 500px;
  }

  .tab-menu-container {
    display: flex;
    width: 100%;
  }

  .tab-menu-container ::slotted(*) {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    background: #d81b60;
    color: #FFF;
    font-size: 1rem;
    padding: .5rem;
    transition: .5s;
    cursor: pointer;
    border: none;
    outline: none;
    text-align: center;
    margin: 0 .5rem;
  }

  .contents-field ::slotted(section) {
    margin: 1rem auto;
  }

  .contents-field ::slotted([disabled-flag="true"]) {
    display: none;
  }
</style>
<div class="contents-container">
  <ul class="tab-menu-container" menu>
    <slot id="tabsSlot" name="title"></slot>
  </ul>
  <div class="contents-field">
    <slot id="tabsContent" name="content"></slot>
  </div>
</div>
`;

export default dom;
