import React, { Component, Fragment } from 'react';
import PostList from "./posts/PostList";

class Home extends Component {
  render() {
    return (
      <Fragment>
          <PostList />
      </Fragment>
    );
  }
}

export default Home;
