const listDOM = (disabled = false, text) => `
  <span checkCompleted>
    <i class="material-icons">check_circle</i>
  </span>
  <div>${text}</div>
  <span diabled="${disabled}" delete>
    <i class="material-icons">close</i>
  </span>
`;

export default listDOM;
