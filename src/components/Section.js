export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._сontainer = containerSelector;
  }

  renderItems () {
    this._items.forEach(element => {
      this._renderer(element);
    })
  }

  addItem (domElement) {
    this._сontainer.prepend(domElement);
  }
}
