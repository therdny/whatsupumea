import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Provider } from 'react-redux';
import firebase from './firebase';
import Header from './components/Header';
import './style/App.css';
// import counter from './reducer';
import { incrementCounter } from './actions';
// import { removeAdd } from './actions';


class App extends Component {

  state = {
    counter: 0
  }

  constructor() {
    super();
    this.state = {
      name: '',
      date: '',
      time: '',
      where: '',
      what: '',
      adds: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const addsRef = firebase.database().ref('adds');
    addsRef.on('value', (snapshot) => {
      let adds = snapshot.val();
      let newState = [];
      for (let add in adds) {
        newState.push({
          id: add,
          name: adds[add].name,
          date: adds[add].date,
          time: adds[add].time,
          where: adds[add].where,
          what: adds[add].what
        });

        console.log(adds)

      }
      this.setState({
        adds: newState
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const addsRef = firebase.database().ref('adds');
    const add = {
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      where: this.state.where,
      what: this.state.what
    }
    addsRef.push(add);
    this.setState({
      name: '',
      date: '',
      time: '',
      where: '',
      what: ''
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // remove = (add) => {
  //   this.props.removeAdd(add);
  // }

  removeAdd(addId) {
    const addRef = firebase.database().ref(`/adds/${.key}`);
    addRef.remove();
  }

  render() {
    return (
      <div className='app'>
        <Header />
        <div className="wrapper">
        
          <div className='login'>
            {this.state.user ? 
              <button onClick={this.logout}>Logga ut</button>
              :
              <button onClick={this.login}>Logga in</button>  
            }
          </div>

        </div>
        
        
        <div className='container'>
          <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="Namn?" onChange={this.handleChange} value={this.state.name} />
                <input type="date" name="date" placeholder="Vilket datum?" onChange={this.handleChange} value={this.state.date} />
                <input type="time" name="time" placeholder="Vilke tid?" onChange={this.handleChange} value={this.state.time} />
                <input type="text" name="where" placeholder="Vart?" onChange={this.handleChange} value={this.state.where} />
                <textarea name="what" height="40" placeholder="Vad?" onChange={this.handleChange} value={this.state.what} />
                <button>Lägg till event!</button>
                </form>
          </section>
          <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.adds.map((add) => {
                    return (
                      <li key={add.id}>
                        <h3>Namn: {add.name}</h3>
                        <p>Vart: {add.where}</p>
                        <p>När: {add.date} - {add.time}</p>
                        <p>Vad: {add.what}</p>
                        <p><button onClick={this.props.increment} > Intresserad? </button>  { this.props.counter } kommer. </p>
                        <p><button onClick={() => this.removeAdd(add.id)}>Ta bort annons!</button></p>
                      </li>
                    )
                  })}
                </ul>
              </div>
          </section>
        </div>
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
  return{
    increment: () => dispatch(incrementCounter()),
    // remove: () => dispatch(removeAdd()),
    
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
