export default class Section {
  constructor({items, renderer}, cardContainer) {
    this._items = items;
    this._renderer = renderer;
    this._сontainer = cardContainer;
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
