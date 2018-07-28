import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BlogTheme } from '../../Hero.service'
import { themeChange } from '../../actions'

import './index.css'

class BlogTPComment extends Component {
  componentDidMount() {
    this.props.themeChange(BlogTheme)
    this.loadDisqus()
  }
  loadDisqus() {
    const { articleId } = this.props
    window.PAGE_URL = `https://www.withyoufriends.com`
    window.PAGE_IDENTIFIER = `/blog/article?id=${articleId}`
    window.disqus_config = function () {
      this.page.url = window.PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = window.PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    (function () { // DON'T EDIT BELOW THIS LINE
      const d = document, s = d.createElement('script');
      s.src = 'https://www-withyoufriends-com.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }
  render() {
    return (
      <div className="article-comment-wrapper">
        <div id="disqus_thread"></div>
      </div>
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
)(BlogTPComment)