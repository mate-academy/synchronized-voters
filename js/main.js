import Component from './component.js';
import Voter from './voter.js';

class Page extends Component {
  constructor({ element }) {
    super({ element });

    this._state = {
      currentValue: 0,
    };

    this._render();

    this._initInfo();
    this._initVoter1();
    this._initVoter2();
  }

  _initInfo() {
    this._infoElement = this._element.querySelector('[data-element="info"]');
  }

  _initVoter1() {
    const { currentValue } = this._state;

    this._voter1 = new Voter({
      element: this._element.querySelector('[data-component="voter1"]'),
      props: {
        value: currentValue,
      },
    });

    this._voter1.subscribe('update', (value) => {
      this.setState({
        currentValue: value,
      });
    });
  }

  _initVoter2() {
    const { currentValue } = this._state;

    this._voter2 = new Voter({
      element: this._element.querySelector('[data-component="voter2"]'),
      props: {
        value: currentValue,
      },
    });

    this._voter2.subscribe('update', (value) => {
      this.setState({
        currentValue: value,
      });
    });
  }

  _updateView() {
    const { currentValue } = this._state;

    // I should call this._render() here
    // but it will require me to recreate all the components again
    // we will handle this next week with React
    this._voter1.setProps({ value: currentValue });
    this._voter2.setProps({ value: currentValue });
    this._infoElement.textContent = currentValue;
  }


  _render() {
    const { currentValue } = this._state;

    this._element.innerHTML = `
      <div data-component="voter1"></div>
      <p>
        Current value is
        <span data-element="info">${ currentValue }</span>
      </p>
      <div data-component="voter2"></div>
    `;
  }
}

new Page({
  element: document.querySelector('[data-component="page"]')
});
