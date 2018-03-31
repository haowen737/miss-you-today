import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BlogTheme } from './../../Hero.service'
import { themeChange, checkUser } from './../../actions'
import LoadingBall from './../../widgets/loadingBall/LoadingBall'

import TalkHeader from './TalkHeader'

import './index.css'

class ThirdPartyComment extends Component {
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    this.props.themeChange(BlogTheme)
    const PAGE_URL = 'https://www.withyoufriends.com/talk-with-me-please'
    const PAGE_IDENTIFIER = 'withyoufriends/talk-with-me-please'
    const disqus_config = function () {
      this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    // (function () { // DON'T EDIT BELOW THIS LINE
    //   const d = document, s = d.createElement('script');
    //   s.src = 'https://www-withyoufriends-com.disqus.com/embed.js';
    //   s.setAttribute('data-timestamp', +new Date());
    //   (d.head || d.body).appendChild(s);
    //   console.log(this)
    // })();
    const d = document, s = d.createElement('script');
    s.src = 'https://www-withyoufriends-com.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }
  render() {
    const { loading } = this.state
    return (
      <React.Fragment>
        <TalkHeader></TalkHeader>
        {
          loading && (
            <div className="talk-loading-wrap">
              <LoadingBall color="#666"></LoadingBall>
            </div>
          )
        }
        <div className="talk-wrapper">
          <div id="disqus_thread"></div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    themeChange: theme => {
      dispatch(themeChange(theme))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThirdPartyComment)