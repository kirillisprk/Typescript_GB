import {renderSearchFormBlock} from './search-form.js'
import {renderSearchStubBlock} from './search-results.js'
import {FlatRentSdk, addDays, cloneDate} from './flat-rent-sdk.js'
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
import {getTodosByCount} from "./Todos.js";

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
  getTodosByCount(101).then(data => {
    console.log(data)
  })
  /*  renderToast(
      {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
      {
        name: 'Понял', handler: () => {
          console.log('Уведомление закрыто')
        }
      }
    )*/
})


const sdk = new FlatRentSdk()
const today = new Date()

sdk.get('mvm32l')
  .then((flat) => {
    console.log('flat by id', flat)
  })

sdk.search({city: 'Самара'})
  .catch((result) => {
    console.error('serach incorrect city', result)
  })

sdk.search({city: 'Санкт-Петербург'})
  .catch((result) => {
    console.error('serach without dates', result)
  })

sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: new Date(2021, 6, 26)
})
  .catch((result) => {
    console.error('serach with only check-in date', result)
  })

sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: addDays(cloneDate(today), -1),
  checkOutDate: addDays(cloneDate(today), -6)
})
  .catch((result) => {
    console.error('serach with check-in in the past', result)
  })

sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: cloneDate(today),
  checkOutDate: addDays(cloneDate(today), -6)
})
  .catch((result) => {
    console.error('serach with check-out date less than check-in', result)
  })

sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: cloneDate(today),
  checkOutDate: addDays(cloneDate(today), 1)
})
  .then((result) => {
    console.log('serach for one night', result)
  })

sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: cloneDate(today),
  checkOutDate: addDays(cloneDate(today), 2)
})
  .then((result) => {
    console.log('serach for two nights', result)
  })

sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: cloneDate(today),
  checkOutDate: addDays(cloneDate(today), 1),
  priceLimit: 4500
})
  .then((result) => {
    console.log('serach with price limit', result)
  })

sdk.book('ab2e2', cloneDate(today), addDays(cloneDate(today), 2))
  .then((result) => {
    console.log('book flat', result)

    sdk.search({
      city: 'Санкт-Петербург',
      checkInDate: cloneDate(today),
      checkOutDate: addDays(cloneDate(today), 3)
    })
      .then((result) => {
        console.log('serach after booking', result, result.length)
      })
  })

sdk.book('vnd331', addDays(cloneDate(today), 5), addDays(cloneDate(today), 6))
  .then((result) => {
    console.log('book flat', result)
  })


