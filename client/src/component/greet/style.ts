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
    '@media (max-width:1100px)': {
      width: '100%'
    }
  },
  '& .greet-flower-layout': {
    position: 'absolute',
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    '@media (max-width:1100px)': {
      display: 'none'
    }
  },
  '& .sociallink-list-container': {
    position: 'fixed',
    padding: '1rem 10rem',
    right: 0,
    bottom: '10%',
    width: '100%',
    textAlign: 'right',
    '@media (max-width: 1100px)': {
      padding: '10px 0',
      bottom: '5%',
      textAlign: 'center',
    }
  },
  '& .iconfont': {
    display: 'inline-block',
    fontFamily: "iconfont",
    fontSize: 32,
    fontStyle: 'normal',
    '-webkit-font-smoothing': 'antialiased',
    '-webkit-text-stroke-width': '0.2',
    '-moz-osx-font-smoothing': 'grayscale',
    padding: '0 10px',
    transition: 'all .6s linear',
  },
  '& .sociallink-list-container i': {
    animationName: 'iconfont-animation',
    transition: 'all .3s linear',
    cursor: 'pointer',
  },
  '& .sociallink-list-container i:hover': {
    transform: 'scale(1.2) translateY(-10%)',
  },
  '@keyframes iconfont-animation': {
    '0%': {
      opacity: 0,
      transform: 'translate3d(30px, 0, 0)',
    },
    '100%': {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)'
    }
  }
})
