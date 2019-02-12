import Component from './component.js';

export default class Voter extends Component {
  constructor({ element, props = {} }) {
    super({ element });

    this._props = {
      ...props,
    };

    this._render();

    this.on('click', 'up', () => this.increase());
    this.on('click', 'down', () => this.decrease());
  }

  increase() {
    this.emit('update', this._props.value + 1)
  }

  decrease() {
    this.emit('update', this._props.value - 1)
  }

  _updateView() {
    this._render();
  }

  _render() {
    const { value } = this._props;

    this._element.innerHTML = `
      <button data-element="down">-</button>
      <span>${ value }</span>
      <button data-element="up">+</button>
    `;
  }
}
