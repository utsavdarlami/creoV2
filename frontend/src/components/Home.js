import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PostList from "./posts/PostList/PostList";

import Spinner from './layout/Spinner';

class Home extends Component {
  render() {
      if (this.props.postLoading) {
          return <Spinner/> 
              //(<Spinner/>
      }
      return (
          <Fragment>
              <PostList />
          </Fragment>
      );
  }
}

const mapStateToProps = (state) => ({
  postLoading : state.posts.isLoading,
});

export default connect(mapStateToProps)(Home);
