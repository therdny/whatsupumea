import React, { Component } from 'react';
import '../style/App.css';
import { auth, provider } from '../firebase';

//Login & Logout via Google

this.login = this.login.bind(this);
this.logout = this.logout.bind(this);

export let login = function() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  export let logout = function() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }



 class Login extends Component {
    render() {
      return (
        <div className="login">
            {this.state.user ?
              <button onClick={this.logout}>Logga ut</button>                
              :
              <button onClick={this.login}>Logga in</button>              
            }
          </div>
      );
    }
  }

  
  
   export default Login;