/*
 * action 类型
 */
export const THEME_CHANGE = 'THEME_CHANGE'

export const CHECK_USER = 'CHECK_USER'

/*
 * action 创建函数
 */

export function themeChange (theme) {
  return { type: THEME_CHANGE, theme }
}

export function checkUser (user) {
  return { type: CHECK_USER, user }
}
