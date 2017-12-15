import React, { Component } from 'react';
import '../style/App.css';
import { handleSubmit, handleChange } from '../actions';

class Form extends Component {
    render() {
      return (
        <form onSubmit={handleSubmit.bind(this)}>
                <input type="text" name="username" defaultValue={this.state.user.displayName}/>
                <input type="text" name="title" placeholder="Rubrik" onChange={handleChange.bind(this)} value={this.state.title}/>
                <input type="date" name="date" placeholder="Vilket datum?" onChange={handleChange.bind(this)} value={this.state.date}/>
                <input type="time" name="time" placeholder="Vilken tid?" onChange={handleChange.bind(this)} value={this.state.time}/>
                <input type="text" name="where" placeholder="Vart?" onChange={handleChange.bind(this)} value={this.state.where}/>
                <textarea name="what" height="40" placeholder="Vad?" onChange={handleChange.bind(this)} value={this.state.what}/>
                <button>Lägg till event!</button>
              </form>
      );
    }
  }

  export default Form;
