export default class Component {
  constructor({ element }) {
    this._element = element;
    this._callbackMap = {};
    this._state = {};
    this._props = {};
  }

  _updateView() {
    console.log('_updateView method should be implemented in you component');
  }

  setState(newState) {
    this._state = {
      ...this._state,
      ...newState,
    };

    this._updateView();
  }

  setProps(newProps) {
    this._props = {
      ...this._props,
      ...newProps,
    };

    this._updateView();
  }

  hide() {
    this._element.hidden = true;
  }

  show() {
    this._element.hidden = false;
  }

  on(eventName, elementName, callback) {
    this._element.addEventListener(eventName, (event) => {
      const delegateTarget = event.target.closest(`[data-element="${ elementName }"]`);

      if (!delegateTarget || !this._element.contains(delegateTarget)) {
        return;
      }

      callback(event);
    });
  }

  subscribe(eventName, callback) {
    if (!this._callbackMap[eventName]) {
      this._callbackMap[eventName] = [];
    }

    this._callbackMap[eventName].push(callback);
  }

  emit(eventName, data) {
    const eventCallbacks = this._callbackMap[eventName];

    if (!eventCallbacks) {
      return;
    }

    eventCallbacks.forEach((callback) => {
      callback(data);
    });
  }
}
