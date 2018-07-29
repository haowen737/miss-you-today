import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { themeChange, WithYouAction } from '../../actions'
import { Theme, StoreState } from '@types'

import Greet from './component/Greet'

const mapStateToProps = (state: StoreState) => ({
  theme: state.theme,
  apis: state.apis
})

const mapDispatchToProps = (dispatch: Dispatch<WithYouAction>) => ({
  themeChange: (theme: Theme) => dispatch(themeChange(theme))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greet)