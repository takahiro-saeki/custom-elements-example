const dom = `
  <style>
    button {
    border: none;
    cursor: pointer;
    color: #00acc1;
    padding: .5rem 1rem;
    border-radius: 2px;
    font-size: 1rem;
    background: #FFF;
    position: relative;
    overflow: hidden;
    outline: none;
    transition: .5s;
  }

  button:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(0, 172, 193, .5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  button:hover {
    background: #b2ebf2;
    opacity: 0.7
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 1;
    }
    20% {
      transform: scale(25, 25);
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(40, 40);
    }
  }

  button:focus:not(:active)::after {
    animation: ripple 1s ease-out;
  }
  
  .card-container {
    margin: .5rem auto;
    width: 300px;
    height: auto;
    box-shadow: rgba(0,0,0,0.117647) 0px 1px 6px, rgba(0,0,0,0.117647) 0px 1px 4px;
  }
  
  .card-image {
    width: 100%;
    height: auto;
    vertical-align: bottom;
  }
  
  .card-image-container {
    position: relative;
    margin-bottom: .5rem;
  }
  
  .overlay {
    padding: .5rem;
    position: absolute;
    bottom: 0px;
    right: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.54);
  }
  
  .overlay-title {
    font-size: 1rem;
    color: #FFF;
  }
  
  .btn-container {
    padding: .5rem;
  }
  
  .date-container {
    padding: .5rem;
    color: #757575;
    font-size: 14px;
  }
  
  .description-container {
    padding: .5rem;
    font-size: 14px;
  }
  </style>
  
  <div class="card-container">
    <div class="card-image-container">
      <img src="//lorempixel.com/400/200/cats/" class="card-image" />
      <div class="overlay">
        <span class="overlay-title" description></span>
      </div>
    </div>
    <div>
      <div class="date-container" date></div>
      <div class="description-container">
        <slot></slot>
      </div>
      <div class="btn-container">
        <button left></button>
        <button right></button>
      </div>
    </div>
  </div>
`;

export default dom;
