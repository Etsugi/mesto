export default class UserInfo {
  constructor ({profileName, profileDescription}) {
    this._name = profileName;
    this._description = profileDescription;
  }

  setUserInfo (data) {
    event.preventDefault();
    this._name.textContent = data.name;
    this._description.textContent = data.description;
  }

  getUserInfo () {
    const data = {
      name: this._name.textContent,
      description: this._description.textContent
    };
    return data;
  }
}
