/*
 * action 类型
 */
export const THEME_CHANGE = 'THEME_CHANGE'

/*
 * action 创建函数
 */

export function themeChange (theme) {
  return { type: THEME_CHANGE, theme }
}
