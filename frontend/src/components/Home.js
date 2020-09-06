import React, { Component, Fragment } from 'react';
import PostList from "./posts/PostList";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <Fragment>
          <PostList />
      </Fragment>
    );
  }
}

export default connect()(Home);
