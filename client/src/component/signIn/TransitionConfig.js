export const defaultStyle = {
  transition: `all 500ms ease`,
  transform: `translate3d(0, -30%, 0)`,
  opacity: 0
}

export const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(0, -30%, 0)` },
  entered: { opacity: 1, transform: `translate3d(0, 0, 0)` }
}
