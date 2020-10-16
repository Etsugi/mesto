export default class UserInfo {
  constructor ({profileName, profileAbout, profileAvatar}) {
    this._name = profileName;
    this._about = profileAbout;
    this._avatar = profileAvatar;
  }

  setUserInfo (data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setUserAvatar (data) {
    this._avatar.src = data.avatar;
  }

  getUserInfo () {
    const data = {
      name: this._name.textContent,
      about: this._about.textContent
    };
    return data;
  }
}
