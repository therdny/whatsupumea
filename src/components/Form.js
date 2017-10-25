import React, { Component } from 'react';
import firebase from './firebase';

class Form extends Component {

componentWillMount() {
    const messagesRef = firebase.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      const message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }

  addMessage(e){
    e.preventDefault();

    firebase.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = '';
  }
}

render() {

    return (
        <form onSubmit={this.addMessage.bind(this)}>
        <input className="textField1" type="text" ref={ el => this.inputEl = el }/>
        <input className="button" type="submit"/>
  
    { this.state.messages.map( message => <p key={message.id}>{message.text}</p> ) }
  
</form>
)
}

export default Form;