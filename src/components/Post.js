import React, { Component } from 'react';
import '../style/App.css';
import firebase from '../firebase';

class Post extends Component {
    state ={
        value: ""
    }
    
    render() {
        const postList = this.props.post.map(todo)
        return (
          <div className="App">
            <Header />
          </div>
        );
      }
}

export default Post;