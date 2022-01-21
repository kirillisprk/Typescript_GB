import {renderSearchFormBlock} from './search-form.js'
import {renderSearchStubBlock} from './search-results.js'
import {
  getUserData,
  UserInfo,
  Favorites,
  getLocalStorageData,
  setUserData,
  renderUserBlock,
  getFavoritesAmount
} from './user.js'
import {calculateTime} from './lib.js'

window.addEventListener('DOMContentLoaded', () => {

  const today = new Date();
  const arrivalDate = calculateTime(today, 1);
  const departureDate = calculateTime(arrivalDate, 2);
  const idUser = 1;
  const userInfo: UserInfo = {
    username: 'Wade Warren',
    avatarUrl: '/img/avatar.png'
  }
  const favorites: Favorites = {
    favoritesCount: 1

  }

  setUserData(idUser, userInfo, favorites);
  const data = getLocalStorageData(1);
  const userInfoData: UserInfo = getUserData(data);
  const favoritesAmount: Favorites = getFavoritesAmount(data);
  renderUserBlock(userInfoData, favoritesAmount);
  renderSearchFormBlock(arrivalDate, departureDate);
  renderSearchStubBlock();

  /*  renderToast(
      {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
      {
        name: 'Понял', handler: () => {
          console.log('Уведомление закрыто')
        }
      }
    )*/
})
