import Header from './components/Header';
import HelloElement from './components/HelloElement';
import Button from './components/Button';
import Card from './components/Card';
import './style';

customElements.define('material-btn', Button);
customElements.define('custom-div', Header)
customElements.define('hello-element', HelloElement);
customElements.define('card-ui', Card);
