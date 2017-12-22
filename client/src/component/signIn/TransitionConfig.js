export const defaultStyle = {
  position: 'absolute',
  transition: `all 500ms ease`,
  transform: `translate3d(-50%, -50%, 0)`,
  opacity: 0
}

export const transitionStyles = {
  entering: { opacity: 0, transform: `translate3d(-50%, -80%, 0)` },
  entered: { opacity: 1, transform: `translate3d(-50%, -50%, 0)` },
  exiting: { opacity: 1, transform: `translate3d(-50%, -50%, 0)` },
  exited: { opacity: 0, transform: `translate3d(-50%, -20%, 0)` }
}
