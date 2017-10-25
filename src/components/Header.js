import React, { Component } from 'react';
import '../style/App.css';
import logo from '../images/logo.png';

class Header extends Component {
    render() {
      
      return (
        <div className='logoHeader'>
            <img src={logo} alt="Vy över Umeå" />
        </div>
      );
    }
  }

  
  
  export default Header;
  