import {renderBlock} from './lib.js'

export class UserInfo {
  username: string
  avatarUrl: string

  constructor(username: string, avatarUrl: string) {
    this.username = username
    this.avatarUrl = avatarUrl
  }
}

export class Favorites {
  favoritesCount: number

  constructor(favoritesCount: number) {
    this.favoritesCount = favoritesCount
  }
}

class User implements UserInfo, Favorites {
  username: string;
  avatarUrl: string;
  favoritesCount: number;

  constructor(username: string, avatarUrl: string, favoritesCount?: number) {
    this.username = username
    this.avatarUrl = avatarUrl
    this.favoritesCount = favoritesCount ? favoritesCount : 0
  }
}

export const setUserData = (id: number, user: UserInfo, favoritesCount: Favorites): void => {
  const userData = new User(user?.username, user?.avatarUrl, favoritesCount.favoritesCount);
  localStorage.setItem(id.toString(), JSON.stringify(userData));
}

export const getLocalStorageData = (id: number): unknown => {
  const data: string | null = localStorage.getItem(id.toString());
  if (data)
    return JSON.parse(data)
  return
}

export const getUserData = (data: unknown): UserInfo | null => {
  if (data instanceof UserInfo) {
    return {
      username: data.username,
      avatarUrl: data.avatarUrl
    }
  }
  return null

}
export const getFavoritesAmount = (data: unknown): Favorites => {
  if (data instanceof Favorites) {
    const user = data as Favorites
    return {
      favoritesCount: user.favoritesCount
    }
  }
  return {favoritesCount: 0}
}

export function renderUserBlock(userinfo: UserInfo, favorites: Favorites = {favoritesCount: 0}) {
    if (userinfo)
        renderBlock(
            'user-block',
            `
    <div class="header-container">
      <img class="avatar" src="${userinfo.avatarUrl}" alt="${userinfo.avatarUrl}" />
      <div class="info">
          <p class="name">${userinfo.username}</p>
          <p class="fav">
            <i class="heart-icon${favorites.favoritesCount >= 1 ? ' active' : ''}"></i>
            ${favorites.favoritesCount < 1 ? 'ничего нет' : favorites.favoritesCount}
          </p>
      </div>
    </div>
    `
        )
    else
        renderBlock('user-block', `<div class = "header-container"> Неизвестный пользователь </div>`)
}
