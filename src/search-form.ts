import {dateFormatter, renderBlock} from './lib.js'


export interface SearchFormData {
  city: string,
  startDate: Date,
  endDate: Date,
  amount: number
}

const getValueSearchForm = () => {
  event.preventDefault();
  const city = ((<HTMLInputElement>document.getElementById("city")).value) as string;
  const startDate = new Date((<HTMLInputElement>document.getElementById("check-in-date")).value);
  const endDate = new Date((<HTMLInputElement>document.getElementById("check-out-date")).value);
  const amount = +((<HTMLInputElement>document.getElementById("max-price")).value) as number;
  const searchData: SearchFormData = {
    city: city,
    startDate: startDate,
    endDate: endDate,
    amount: amount
  }
  search(searchData);

}
const search = (searchData: SearchFormData) => {
  console.log(searchData)
}

export function renderSearchFormBlock(arrivalDate: Date, departureDate: Date) {
  const today = new Date();
  const calMaxDate = new Date(today.getFullYear(), today.getMonth() + 2, 1);


  renderBlock(
      'search-form-block',
      `
    <form id="search">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>-->
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" 
            value="${dateFormatter(arrivalDate)}" 
            min="${dateFormatter(today)}" 
            max="${dateFormatter(calMaxDate)}" 
            name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" 
            value="${dateFormatter(departureDate)}" 
            min="${dateFormatter(today)}" 
            max="${dateFormatter(calMaxDate)}" 
            name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="btn-search">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
  const buttonSearch = document.getElementById("search");
  if (buttonSearch != null) {
    buttonSearch.onclick = function () {
      getValueSearchForm();
    }
  }
}
