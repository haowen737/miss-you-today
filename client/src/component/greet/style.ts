import { css } from 'react-emotion'

export default css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  transition: 'all .6s linear',
  '& .greet-content-layout': {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    right: 0,
    width: '50%',
    height: '100%',
  }
})
