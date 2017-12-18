/*
 * action 类型
 */
export const THEME_CHANGE = 'THEME_CHANGE'

export const UPDATE_USER = 'UPDATE_USER'

/*
 * action 创建函数
 */

export function themeChange (theme) {
  return { type: THEME_CHANGE, theme }
}

export function updateUser (user) {
  return { type: UPDATE_USER, user }
}
