import {renderBlock} from './lib.js'

export function renderUserBlock(userName: string, linkAvatar: string, countFavorites: number) {
  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${linkAvatar}" alt="${userName}" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${countFavorites > 1 ? ' active' : ''}"></i>
            ${countFavorites < 1 ? 'ничего нет' : countFavorites}
          </p>
      </div>
    </div>
    `
  )
}
