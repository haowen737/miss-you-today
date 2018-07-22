export interface Theme {
  name: string,
  theme?: string,
  color: string,
  btnTheme?: string,
  btnColor?: string,
  headerTheme?: string,
  musicPlayerBg?: string,
  musicPlayerColor?: string,
  poem?: string[]
}

export interface StoreState {
  theme: Theme,
  apis?: any
}
