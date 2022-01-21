import {renderBlock} from './lib.js'

export interface UserInfo {
    username: string
    avatarUrl: string
}

export interface Favorites {
    favoritesCount: number
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
    const userData = new User(user.username, user.avatarUrl, favoritesCount.favoritesCount);
    localStorage.setItem(id.toString(), JSON.stringify(userData));
}

export const getLocalStorageData = (id: number): unknown => {
    return JSON.parse(localStorage.getItem(id.toString()))
}

export const getUserData = (data: unknown): UserInfo => {
    if (!data) {
        return null
    }
    if (data.hasOwnProperty('username') && data.hasOwnProperty('avatarUrl')) {
        const user = data as UserInfo
        return {
            username: user.username,
            avatarUrl: user.avatarUrl
        }
    }

}
export const getFavoritesAmount = (data: unknown): Favorites => {
    if (!data) {
        return null
    }
    if (data.hasOwnProperty('favoritesCount')) {
        const user = data as Favorites
        return {
            favoritesCount: user.favoritesCount
        }
    }
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
