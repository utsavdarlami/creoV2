import React, { Component, Fragment } from 'react';
import PostList from "./posts/PostList/PostList";

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
