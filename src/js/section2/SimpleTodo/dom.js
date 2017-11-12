const dom = `
  <style>
    header {
      color: #00acc1;
      font-size: 1.5rem;
      text-align: center;
    }

    ul {
      margin: 0;
      padding: 1rem 0;
      list-style: none;
    }

    ul li {
      border-bottom: 1px solid #f5f5f5;
    }

    li span[checkCompleted] {
      color: #e0e0e0;
    }

    li span[delete] {
      color: #d50000;
    }

    li[isCompleted] div {
      text-decoration: line-through;
      color: #757575;
    }

    li[isCompleted] span[checkCompleted] {
      color: #00acc1;
    }

    input {
      box-sizing: border-box;
      width: 100%;
      padding: .5rem;
      margin: .5rem auto;
      font-size: 1rem;
      border-radius: .5rem;
      border: 1px solid #eee;
      outline: none;
    }

    input::-webkit-input-placeholder {
      color: #e0e0e0;
    }

    footer {
      display: flex;
      align-items: center;
    }

    .sort-container {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }

    .sort-container button {
      border: 1px solid #00acc1;
      padding: .5rem 1rem;
      background: #00acc1;
      color: #fff;
      border-radius: .5rem;
      font-size: .75rem;
      outline: none;
      transition: .5s;
    }

    .count-container {
      width: 160px;
      color: #9e9e9e;
    }

    .todo-item {
      display: flex;
      align-items: center;
      padding: .5rem 0;
    }

    .todo-item span {
      display: flex;
      padding: 0 .5rem;
    }

    .todo-item div {
      width: 100%;
    }

    .todo-container {
      box-sizing: border-box;
      width: 100%;
      max-width: 550px;
      margin: 2rem auto;
      box-shadow: rgba(0,0,0,0.117647) 0px 1px 6px, rgba(0,0,0,0.117647) 0px 1px 4px;
      padding: 1rem;
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
      <input type="text" placeholder="何か入力してください。"/>
      <ul></ul>
      <footer>
        <div class="count-container">残り: <span count></span>アイテム</div>
        <div class="sort-container">
          <button all>All</button>
          <button active>Active</button>
          <button completed>Completed</button>
        </div>
      </footer>
    </div>
  </div>
`;

export default dom;
