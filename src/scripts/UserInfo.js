export default class UserInfo {
    constructor( profileNameSelector, profileAboutSelector) {
      this._profileNameElement = document.querySelector(profileNameSelector);
      this._profileDescriptionElement = document.querySelector(profileAboutSelector);
    }

    // берем данные профиля в popup
    getUserInfo() {    
      this._userInfo = {
        name: this._profileNameElement.textContent,
        description: this._profileDescriptionElement.textContent
        
    };
    console.log(this._userInfo.description)
        return this._userInfo;}

 //  заполненные поля в popup вставляем в профиль
    setUserInfo(userInfo) {
      this._profileNameElement.textContent = userInfo.name;
      this._profileDescriptionElement.textContent = userInfo.description;
      
      console.log(userInfo.description)
    };
}
