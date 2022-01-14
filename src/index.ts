import {renderSearchFormBlock} from './search-form.js'
import {renderSearchStubBlock} from './search-results.js'
import {renderUserBlock} from './user.js'
import {calculateTime} from './lib.js'

window.addEventListener('DOMContentLoaded', () => {

  const today = new Date();
  const arrivalDate = calculateTime(today, 1);
  const departureDate = calculateTime(arrivalDate, 2);
  renderUserBlock('Wade Warren', '/img/avatar.png', 2);
  renderSearchFormBlock(arrivalDate, departureDate);
  renderSearchStubBlock()
  /*  renderToast(
      {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
      {
        name: 'Понял', handler: () => {
          console.log('Уведомление закрыто')
        }
      }
    )*/
})
