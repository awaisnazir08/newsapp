import './App.css';

import React, { Component } from 'react'
import News from './components/News';
import NavBar from './components/NavBar';

export default class App extends Component {
  render() {
    return (
      <>
      <div>
        <NavBar/>
        <News/>
      </div>
      </>
    )
  }
}

