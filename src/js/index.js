import Header from './components/Header';
import HelloElement from './components/HelloElement';
import Button from './components/Button';
import Card from './components/Card';
import Title from 'components/Title';
import './style';

customElements.define('material-btn', Button);
customElements.define('custom-div', Header)
customElements.define('hello-element', HelloElement);
customElements.define('card-ui', Card);
customElements.define('title-bar', Title);
