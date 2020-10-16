export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._сontainer = containerSelector;
  }

  renderItems (data) {
    data.forEach(element => {
      const card = {
        name: element.name,
        link: element.link,
        likes: element.likes,
        _ownerId: element.owner._id,
        _id: element._id
      };
      this._renderer(card);
    })
  }

  addItem (domElement) {
    this._сontainer.prepend(domElement);
  }
}
