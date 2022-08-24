export default class UserInfo {
      constructor({ profileNameSelector, profileAboutSelector, profileAvatarSelector }) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileDescription = document.querySelector(profileAboutSelector);
        this._profileAvatar = document.querySelector(profileAvatarSelector);
      }
    
      getUserInfo() {
        return {
          userName: this._profileName.textContent,
          userDescription: this._profileDescription.textContent
        }
      }
    
      setUserInfo({ userName, userDescription }) {
        this._profileName.textContent = userName;
        this._profileDescription.textContent = userDescription;
      }
    
      setUserAvatar({ userAvatarLink }) {
        this._profileAvatar.src = userAvatarLink;
      }
    
      saveUserId(userId) {
        this._userId = userId;
      }
    
      getUserId() {
        return this._userId;
      }
    }