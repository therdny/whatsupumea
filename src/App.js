import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth, provider } from './firebase';
import Header from './components/Header';
import './style/App.css';
import * as postActions from './actions';
import { bindActionCreators } from 'redux';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    console.log(this.props.state.posts.posts);
  }

  //Login & Logout via Google
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if(user){
        this.setState({ user });
        // request all posts from action
        this.props.actions.posts.posts();
      }
    });
  }

/*   updateLikes(e){
    e.preventDefault();
    let ref = this.refs
    let data = {
      likes: ref.likes.value
    }
    if (data) {
      data.likes++;
    }
    return data;
  }; */



   handleSubmit(e){
    e.preventDefault();
    let ref = this.refs;
    let data = {
      name: ref.username.value,
      title: ref.title.value,
      date: ref.date.value,
      time: ref.time.value,
      where: ref.where.value,
      what: ref.what.value
    }
    this.props.actions.posts.addNewEvent(data);
    e.currentTarget.reset();
  }

  render() {
    return (
      <div className="app">
       <Header />
        <div className="wrapper">
         <div className="login">
            {this.state.user ?
              <button onClick={this.logout}>Logga ut</button>
              :
              <button onClick={this.login}>Logga in</button>
            }
          </div>
        </div>
        {this.state.user ?
          <div>
            <div className="container">
              <section className="add-item">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" name="username" defaultValue={this.state.user.displayName} ref="username"/>
                <input type="text" name="title" placeholder="Rubrik" ref="title"/>
                <input type="date" name="date" placeholder="Vilket datum?" ref="date"/>
                <input type="time" name="time" placeholder="Vilken tid?" ref="time"/>
                <input type="text" name="where" placeholder="Vart?" ref="where"/>
                <textarea name="what" height="40" placeholder="Vad?" ref="what"/>
                <button>Lägg till event!</button>
              </form>
          </section>
          <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {Object.keys(this.props.state.posts.posts).map((key, index) => {
                    let add = this.props.state.posts.posts[key];
                    if(add){
                      return (
                        <li key={index}>
                          <h3>{add.title} {add.name === this.state.user.displayName || add.user === this.state.user.email ?
                          <button className="removeAdd" onClick={() => this.props.actions.posts.removeAdd(key)}>Ta bort annons!</button> : null}</h3>
                          <p>Namn: {add.name}</p>
                          <p>Vart: {add.where}</p>
                          <p>När: {add.date} - {add.time}</p>
                          <p>{add.what}</p>
                          <p>{add.likes} gillar detta event.</p>
                          <button className="likeAdd" onClick={() => this.props.actions.posts.updateLikes(this.refs.likes.attributes['data-id'].value)}>Gilla Eventet!</button>
                        </li>
                      )
                    }
                    return null;
                  })}
                </ul>
              </div>
          </section>
          </div>
          </div>
          :
          <div className="wrapper">
            <div className="login-alert">
            <h2>Välkommen!</h2>
            <h3>För att kunna se vad som händer i Umeå, för att lägga till ett event eller för att visa ditt intresse för ett, måste du vara inloggad.</h3>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    state: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: {
      posts: bindActionCreators(postActions, dispatch)
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
