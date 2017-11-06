const btnTemplate = ({color = '#222', width, height}) => `
<style>
  .base {
    padding: .5rem;
    border: 1px solid ${color};
    background: ${color};
    transition: .5s;
    font-size: 1rem;
    color: #FFF;
    border-radius: .5rem;
    outline: none;
    width: ${width ? `${width}px` : 'auto'};
    height: ${height ? `${height}px` : 'auto'};
  }

  .base:hover {
    box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.3);
  }
</style>
  <button class="base">
    <slot></slot>
  </button>
`

export default btnTemplate
