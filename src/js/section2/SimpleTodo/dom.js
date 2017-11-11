const dom = `
  <style>
    header {
      color: #b2ebf2;
      font-size: 1.5rem;
      text-align: center;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li[isCompleted] {
      background: #CCC;
    }

    .todo-item {
      display: flex;
    }

    .todo-item div {
      width: 100%;
    }

    .todo-container {
      width: 100%;
      max-width: 550px;
      margin: 0 auto;
    }

    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;  /* Preferred icon size */
      display: inline-block;
      line-height: 1;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      font-feature-settings: 'liga';
    }
  </style>

  <div class="todo-container">
    <header>TODO EXAMPLE</header>
    <div>
      <input type="text"/>
      <ul></ul>
      <div>
        <div>count</div>
        <div class='sort-container'>
          <button all>All</button>
          <button active>Active</button>
          <button completed>Completed</button>
        </div>
      </div>
    </div>
  </div>
`;

export default dom;
