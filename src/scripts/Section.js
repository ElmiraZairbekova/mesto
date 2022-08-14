  export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._containerElement = document.querySelector(containerSelector);
      this._renderer = renderer;
    }

    renderItems() {
      this._renderedItems.forEach((item) => {
        this._renderer(item);
      });
    };
  
    addItem(element) {
      this._containerElement.prepend(element);
    }
  }
