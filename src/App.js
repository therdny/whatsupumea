import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase, { auth, provider } from './firebase';
import Header from './components/Header';
import './style/App.css';
import { decrementCounter, incrementCounter, updateLikes, handleSubmit, handleChange } from './actions';

class App extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      title: '',
      date: '',
      time: '',
      where: '',
      what: '',
      likes: '',
      adds: [],
      user: null
      
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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
      if (user) {
        this.setState({ user });
      }

     }); 


    const addsRef = firebase.database().ref('adds');
    addsRef.on('value', (snapshot) => {
      let adds = snapshot.val();
      let newState = [];
      for (let add in adds) {
        newState.push({
          id: add,
          name: adds[add].name,
          title: adds[add].title,
          likes: adds[add].likes,
          date: adds[add].date,
          time: adds[add].time,
          where: adds[add].where,
          what: adds[add].what
        });
      }
      this.setState({
        adds: newState
      });
    });
  }
  removeAdd(addId) {
    const addRef = firebase.database().ref(`/adds/${addId}`);
    addRef.remove();
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
              <form onSubmit={handleSubmit.bind(this)}>
                <input type="text" name="username" defaultValue={this.state.user.displayName}/>
                <input type="text" name="title" placeholder="Rubrik" onChange={handleChange.bind(this)} value={this.state.title}/>
                <input type="date" name="date" placeholder="Vilket datum?" onChange={handleChange.bind(this)} value={this.state.date}/>
                <input type="time" name="time" placeholder="Vilken tid?" onChange={handleChange.bind(this)} value={this.state.time}/>
                <input type="text" name="where" placeholder="Vart?" onChange={handleChange.bind(this)} value={this.state.where}/>
                <textarea name="what" height="40" placeholder="Vad?" onChange={handleChange.bind(this)} value={this.state.what}/>
                <button>Lägg till event!</button>
              </form>
          </section>
          <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.adds.map((add) => {
                    return (
                      <li key={add.id}>
                        <h3>{add.title} {add.name === this.state.user.displayName || add.user === this.state.user.email ?
                        <button className="removeAdd" onClick={() => this.removeAdd(add.id)}>Ta bort annons!</button> : null}</h3>
                        <p>Namn: {add.name}</p>
                        <p>Vart: {add.where}</p>
                        <p>När: {add.date} - {add.time}</p>
                        <p>{add.what}</p>
                        <p>{add.likes} gillar detta event.</p>
                        <button className="likeAdd" onClick={updateLikes.bind(this)} data-id={add.id}>Gilla Eventet!</button>
                      </li>
                    )
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
            <button onClick={this.props.increment} >
                  Increment
            </button>
            <button onClick={this.props.decrement} >
                  Decrement
            </button>
            <h2> {this.props.counter} </h2>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    counter: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    increment: () => dispatch(incrementCounter()),
    decrement: () => dispatch(decrementCounter())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);